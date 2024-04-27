import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../services/firebaseConfig";
import { useUser } from "./UserContext";

// Create Raspberry Hubs Context
const RaspberryHubsContext = createContext();

// Provider component
export const RaspberryHubsProvider = ({ children }) => {
  const { user, profile } = useUser();
  const [hubs, setHubs] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch hubs from database
  useEffect(() => {
    const fetchHubs = async () => {
      let hubIds = profile?.hubs_owned || profile?.hubs_accessible;
      let isAdmin = !!profile?.hubs_owned;

      if (hubIds && hubIds.length > 0) {
        setLoading(true);
        const hubPromises = hubIds.map((hubId) =>
          get(ref(database, "raspberry_hubs/" + hubId))
        );
        const hubSnapshots = await Promise.all(hubPromises);
        const loadedHubs = hubSnapshots.map((snapshot, index) => ({
          id: hubIds[index],
          ...snapshot.val(),
          role: isAdmin ? "admin" : "sub-user",
        }));
        setHubs(loadedHubs);
        setSelectedHub(loadedHubs[0]);
        setLoading(false);
      } else {
        setHubs([]);
        setLoading(false);
      }
    };

    if (user) {
      fetchHubs();
    }
  }, [user, profile]);

  // Function to select a hub
  const selectHub = (hubId) => {
    const hub = hubs.find((h) => h.id === hubId);
    setSelectedHub(hub);
  };

  return (
    <RaspberryHubsContext.Provider
      value={{ hubs, selectedHub, selectHub, loading }}
    >
      {children}
    </RaspberryHubsContext.Provider>
  );
};

// Custom hook to use the RaspberryHubsContext
export const useRaspberryHubs = () => useContext(RaspberryHubsContext);
