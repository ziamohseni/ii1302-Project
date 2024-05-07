import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ref,
  update,
  serverTimestamp,
  onValue,
  off,
  set,
} from "firebase/database";
import { database } from "../services/firebaseConfig";
import { useUser } from "./UserContext";
import { useNotifications } from "./NotificationsContext";
import audioPlayer from "../utils/AudioPlayerUtil";

// Create Raspberry Hubs Context
const RaspberryHubsContext = createContext();

// Provider component
export const RaspberryHubsProvider = ({ children }) => {
  const { expoPushToken, sendPushNotification } = useNotifications();
  const { user, profile } = useUser();
  const [hubs, setHubs] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
  const [systemStatus, setSystemStatus] = useState("unarmed");
  const [isSystemArmed, setIsSystemArmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noHubsFound, setNoHubsFound] = useState(false);

  // Fetch hubs from database
  useEffect(() => {
    const hubRefs = [];
    const fetchHubs = async () => {
      let ownedAndAccessibleHubs = [
        ...(profile?.hubs_owned || []),
        ...(profile?.hubs_accessible || []),
      ];

      if (ownedAndAccessibleHubs && ownedAndAccessibleHubs.length > 0) {
        setLoading(true);
        ownedAndAccessibleHubs.forEach((hubId) => {
          const hubRef = ref(database, "raspberry_hubs/" + hubId);
          hubRefs.push(hubRef);
          onValue(hubRef, (snapshot) => {
            const hubData = snapshot.val();
            if (hubData) {
              const updatedHub = {
                id: hubId,
                ...hubData,
                role: profile?.hubs_owned?.includes(hubId)
                  ? "Admin"
                  : "Subuser",
              };
              setHubs((prevHubs) => {
                const index = prevHubs.findIndex((h) => h.id === hubId);
                if (index > -1) {
                  const newHubs = [...prevHubs];
                  newHubs[index] = updatedHub;
                  return newHubs;
                } else {
                  return [...prevHubs, updatedHub];
                }
              });
              if (!selectedHub || selectedHub.id === hubId) {
                setSelectedHub(updatedHub);
                setSystemStatus(updatedHub.system_status);
                setIsSystemArmed(updatedHub.system_status === "armed");
              }
              // Send notification if the system is armed and a sensor is triggered
              handleTriggeredAlarm(updatedHub);
            } else {
              setNoHubsFound(true);
            }
          });
        });
        setLoading(false);
      } else {
        setHubs([]);
        setLoading(false);
      }
    };

    if (user) {
      fetchHubs();
    }

    // Clean up listeners when the component unmounts or user changes
    return () => {
      hubRefs.forEach((hubRef) => {
        off(hubRef);
      });
      setHubs([]);
      setSelectedHub(null);
      setSystemStatus("unarmed");
      setIsSystemArmed(false);
      setLoading(true);
      setNoHubsFound(false);
    };
  }, [user, profile]);

  // Go through hubs and check if any sensor is triggered when the system is armed after 20 seconds
  useEffect(() => {
    // Set an interval to check the hubs every 20 seconds
    const intervalId = setInterval(() => {
      const armedHubs = hubs.filter((hub) => hub.system_status === "armed");
      if (armedHubs.length > 0) {
        armedHubs.forEach((hub) => {
          handleTriggeredAlarm(hub);
        });
      } else {
        clearInterval(intervalId);
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [hubs]);

  // Handle triggered alarm
  const handleTriggeredAlarm = (hub) => {
    if (hub.system_status === "armed" && hub.sensors) {
      Object.entries(hub.sensors).forEach(([sensorId, sensor]) => {
        if (sensor.status === "active" && sensor.triggered) {
          // Play alarm sound
          audioPlayer.playSound("https://codewithzia.com/alarm-sound.wav");
        }
      });
    }
  };

  // Function to select a hub
  const selectHub = (hubId) => {
    const hub = hubs.find((h) => h.id === hubId);
    setSelectedHub(hub);
    setSystemStatus(hub.system_status);
    setIsSystemArmed(hub.system_status === "armed");
  };

  // Toggle system status of the selected hub
  const toggleSystemStatus = async () => {
    if (selectedHub) {
      const newStatus =
        selectedHub.system_status === "armed" ? "unarmed" : "armed";
      const updates = {
        system_status: newStatus,
        last_armed: serverTimestamp(),
      };
      await update(ref(database, `raspberry_hubs/${selectedHub.id}`), updates);
      // Update triggered status of all sensors to false.
      handleUpdateSensorTriggeredStatus(selectedHub.id, false);

      // Locally update the states to reflect the change immediately
      setSystemStatus(newStatus);
      setIsSystemArmed(newStatus === "armed");

      // Stop the alarm sound if the system is disarmed
      if (newStatus === "unarmed") {
        audioPlayer.stopSound();
      }
    }
  };

  // Function to update the triggered status of all sensors
  const handleUpdateSensorTriggeredStatus = async (hubId, triggered) => {
    if (selectedHub && selectedHub.sensors) {
      const sensorIds = Object.keys(selectedHub.sensors);
      sensorIds.forEach(async (sensorId) => {
        const updates = {
          triggered: triggered,
        };
        await update(
          ref(database, `raspberry_hubs/${hubId}/sensors/${sensorId}`),
          updates
        );
      });
    }
  };

  // Function to toggle the status of a device
  const toggleDeviceStatus = async (deviceId) => {
    if (selectedHub && selectedHub.sensors && selectedHub.sensors[deviceId]) {
      const sensor = selectedHub.sensors[deviceId];
      const newStatus = sensor.status === "active" ? "inactive" : "active";
      let updates;
      if (newStatus === "inactive") {
        updates = {
          status: newStatus,
          last_active: serverTimestamp(),
        };
      } else {
        updates = {
          status: newStatus,
        };
      }

      await update(
        ref(database, `raspberry_hubs/${selectedHub.id}/sensors/${deviceId}`),
        updates
      );
    } else {
      console.log("cannot find sensor!");
    }
  };

  return (
    <RaspberryHubsContext.Provider
      value={{
        hubs,
        selectedHub,
        selectHub,
        loading,
        systemStatus,
        isSystemArmed,
        toggleSystemStatus,
        noHubsFound,
        toggleDeviceStatus,
      }}
    >
      {children}
    </RaspberryHubsContext.Provider>
  );
};

// Custom hook to use the RaspberryHubsContext
export const useRaspberryHubs = () => useContext(RaspberryHubsContext);
