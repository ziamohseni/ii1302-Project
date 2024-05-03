import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../services/firebaseConfig";
import { ref, get, set } from "firebase/database";

// Create User Context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedInAndVerified, setIsUserLoggedInAndVerified] =
    useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setIsUserLoggedInAndVerified(user && user.emailVerified);
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
        setIsUserLoggedInAndVerified(false);
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
      setIsUserLoggedInAndVerified(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isUserLoggedInAndVerified,
        handleSignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
