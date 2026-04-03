// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQN6b_oT7J5NBWW_moEUag3U0lzpriwH0",
    authDomain: "wolf-motor-hub.firebaseapp.com",
    projectId: "wolf-motor-hub",
    storageBucket: "wolf-motor-hub.firebasestorage.app",
    messagingSenderId: "739455283806",
    appId: "1:739455283806:web:c51fc3bf28bd0dfdf3facf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportamos 'auth' para usarlo en el registro y login
//import { getAuth } from "firebase/auth";

export const auth = getAuth(app);