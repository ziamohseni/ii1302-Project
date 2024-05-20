// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Optionally import the services that you want to use
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  // I have removed my firebaseConfig for security reasons. You can get your firebaseConfig from your firebase project settings.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Intialize firebase/auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Intialize firebase/database
const database = getDatabase(app);

// Intialize firebase/storage
const storage = getStorage(app);

// Export
export { app, auth, database, storage };
