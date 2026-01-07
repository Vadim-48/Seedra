// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3fUSBL_wJHigqi7oBx7YVxW1FN-3nLco",
    authDomain: "seedra-1eed8.firebaseapp.com",
    projectId: "seedra-1eed8",
    storageBucket: "seedra-1eed8.firebasestorage.app",
    messagingSenderId: "596646247008",
    appId: "1:596646247008:web:f63e961271699eaeaf2105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
const db = getFirestore(app);

export { app, db };