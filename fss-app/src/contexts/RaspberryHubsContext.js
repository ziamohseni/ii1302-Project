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
  const { expoPushToken } = useNotifications();
  const { user, profile } = useUser();
  const [hubs, setHubs] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
  const [systemStatus, setSystemStatus] = useState("unarmed");
  const [isSystemArmed, setIsSystemArmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noHubsFound, setNoHubsFound] = useState(false);
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);
  const [isAlarmSilent, setIsAlarmSilent] = useState(false);
  const [triggeredHubs, setTriggeredHubs] = useState([]);

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

  // Check if user's hubs has pushTokens array, if not, add pushTokens attribute to the hub as an array
  useEffect(() => {
    if (profile && expoPushToken && hubs) {
      hubs.forEach((hub) => {
        const hubRef = ref(database, "raspberry_hubs/" + hub.id);
        if (
          hub.push_tokens &&
          !hub.push_tokens.includes(expoPushToken) &&
          !expoPushToken.includes("Error")
        ) {
          // If push_tokens exist and the current token isn't included, update the array
          const updates = {
            push_tokens: [...hub.push_tokens, expoPushToken],
          };
          update(hubRef, updates).catch((error) =>
            console.error("Error updating hub data:", error)
          );
        } else if (!hub.push_tokens && !expoPushToken.includes("Error")) {
          // If push_tokens do not exist, initialize with the current token
          const updates = {
            push_tokens: [expoPushToken],
          };
          update(hubRef, updates).catch((error) =>
            console.error("Error initializing hub data:", error)
          );
        }
      });
    }
  }, [hubs]);

  // Filter all hubs with triggered alarms on hubs update
  useEffect(() => {
    const triggeredHubsFound = hubs?.filter((hub) => {
      if (hub.system_status === "armed" && hub.sensors) {
        return Object.entries(hub.sensors).some(([sensorId, sensor]) => {
          return sensor.status === "active" && sensor.triggered;
        });
      }
      return false;
    });
    setTriggeredHubs(triggeredHubsFound);
  }, [hubs]);

  // Handle triggered alarm
  const handleTriggeredAlarm = (hub) => {
    if (hub.system_status === "armed" && hub.sensors) {
      Object.entries(hub.sensors).forEach(([sensorId, sensor]) => {
        if (sensor.status === "active" && sensor.triggered) {
          // Set alarm triggered status to true
          if (hub.system_triggered) {
            setIsAlarmTriggered(true);
          } else {
            setIsAlarmTriggered(false);
          }
          // Play alarm sound
          if (hub.system_is_silent === false && hub.system_triggered) {
            audioPlayer.playSound("https://codewithzia.com/alarm-sound.wav");
            setIsAlarmSilent(false);
          } else {
            audioPlayer.stopSound();
            setIsAlarmSilent(true);
          }
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
        system_is_silent: false,
        system_status_changed_by: profile?.first_name || "User",
        system_triggered: false,
      };
      await update(ref(database, `raspberry_hubs/${selectedHub.id}`), updates);
      // Update triggered status of all sensors to false.
      handleUpdateSensorTriggeredStatus(selectedHub.id, false);

      // Locally update the states to reflect the change immediately
      setSystemStatus(newStatus);
      setIsSystemArmed(newStatus === "armed");
      setIsAlarmSilent(false);

      // Check if triggeredHubs is the last armed hub and set isAlarmTriggered to false
      if (triggeredHubs.length < 2) {
        setIsAlarmTriggered(false);
      }

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

  // Toggle system is silent status
  const toggleSystemIsSilentStatus = async (hub) => {
    if (hub) {
      const newStatus = !hub.system_is_silent;
      const updates = {
        system_is_silent: newStatus,
      };
      await update(ref(database, `raspberry_hubs/${hub.id}`), updates);
      setIsAlarmSilent(newStatus);
      if (newStatus) {
        audioPlayer.stopSound();
      }
    }
  };

  // Function to toggle sensor triggered status to false
  const changeSensorTriggeredStatusToFalse = async (hub) => {
    // Update local state
    setIsAlarmTriggered(false);
    audioPlayer.stopSound();
    // Update system_triggered status of the hub to false.
    if (hub) {
      const updates = {
        system_triggered: false,
        system_is_silent: false,
      };
      await update(ref(database, `raspberry_hubs/${hub.id}`), updates);
    }
    // Update triggered status of all sensors to false.
    if (hub && hub.sensors) {
      const sensorIds = Object.keys(hub.sensors);
      sensorIds.forEach(async (sensorId) => {
        const updates = {
          triggered: false,
        };
        await update(
          ref(database, `raspberry_hubs/${hub.id}/sensors/${sensorId}`),
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
          system_triggered: false,
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
        isAlarmTriggered,
        isAlarmSilent,
        triggeredHubs,
        toggleSystemIsSilentStatus,
        changeSensorTriggeredStatusToFalse,
      }}
    >
      {children}
    </RaspberryHubsContext.Provider>
  );
};

// Custom hook to use the RaspberryHubsContext
export const useRaspberryHubs = () => useContext(RaspberryHubsContext);
