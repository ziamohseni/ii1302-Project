import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../services/firebaseConfig";
import { ref, get } from "firebase/database";

// Create User Context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        // Fetch user profile from Realtime Database
        const userProfileRef = ref(database, "users/" + user.uid);
        get(userProfileRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.val());
            } else {
              setProfile(null);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setProfile(null);
          });
      } else {
        // User is signed out
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
