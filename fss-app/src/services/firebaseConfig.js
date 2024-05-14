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
  apiKey: "AIzaSyB4I3wplJvc_VJ_P8iWKL3FTp9LHc8maeI",
  authDomain: "ii1302-5sense.firebaseapp.com",
  databaseURL:
    "https://ii1302-5sense-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ii1302-5sense",
  storageBucket: "ii1302-5sense.appspot.com",
  messagingSenderId: "515915135675",
  appId: "1:515915135675:web:597f05fff474ec60fd879e",
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
