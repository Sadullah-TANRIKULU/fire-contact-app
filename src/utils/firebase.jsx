import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  apiKey: "AIzaSyBi33tBlNEpBN1biTCUHd45GU6RVZi_o5U",
  authDomain: "fire-contact-app-ab3d2.firebaseapp.com",
  databaseURL:
    "https://fire-contact-app-ab3d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fire-contact-app-ab3d2",
  storageBucket: "fire-contact-app-ab3d2.appspot.com",
  messagingSenderId: "313602214898",
  appId: "1:313602214898:web:9fd736011b905c0469796b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

