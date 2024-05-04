import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ref,
  update,
  serverTimestamp,
  onValue,
  off,
  set,
} from "firebase/database";
import { signOut } from "firebase/auth";
import { database, auth } from "../services/firebaseConfig";
import { useUser } from "./UserContext";

// Create Raspberry Hubs Context
const RaspberryHubsContext = createContext();

// Provider component
export const RaspberryHubsProvider = ({ children }) => {
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
      let hubIds = profile?.hubs_owned || profile?.hubs_accessible;
      let isAdmin = !!profile?.hubs_owned;

      if (hubIds && hubIds.length > 0) {
        setLoading(true);
        hubIds.forEach((hubId) => {
          const hubRef = ref(database, "raspberry_hubs/" + hubId);
          hubRefs.push(hubRef);
          onValue(hubRef, (snapshot) => {
            const hubData = snapshot.val();
            if (hubData) {
              const updatedHub = {
                id: hubId,
                ...hubData,
                role: isAdmin ? "admin" : "sub-user",
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
      // Locally update the states to reflect the change immediately
      setSystemStatus(newStatus);
      setIsSystemArmed(newStatus === "armed");
    }
  };

  const toggleDeviceStatus = async(deviceId) =>{
    if (selectedHub && selectedHub.sensors && selectedHub.sensors[deviceId]) {
      const sensor = selectedHub.sensors[deviceId];
      const newStatus = sensor.status === "active" ? "inactive" : "active";
      const updates = {
        status: newStatus,
      };
      await update(ref(database, `raspberry_hubs/${selectedHub.id}/sensors/${deviceId}`), updates);
    }
    else{
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
