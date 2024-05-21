import { initializeApp, } from 'firebase/app';
// Optionally import the services that you want to use
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyDd21JyNmqbixlZTLuXp-dnIUJElaNh41Q",
    authDomain: "mind-app-8cc35.firebaseapp.com",
    projectId: "mind-app-8cc35",
    storageBucket: "mind-app-8cc35.appspot.com",
    messagingSenderId: "381370740742",
    appId: "1:381370740742:web:741175c2381d4bfc3ed387",
    measurementId: "G-T32H4MG0YC"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getDatabase(app);
export const firestore = getFirestore(app);
// export const functions = getFunctions(app);
// export const storage = getStorage(app);

export default app;



// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
