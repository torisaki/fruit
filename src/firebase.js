// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD96SgCMGW_V2UXtU0kobPt9itDIBCCwlU",
  authDomain: "prime-chess-387805.firebaseapp.com",
  projectId: "prime-chess-387805",
  storageBucket: "prime-chess-387805.appspot.com",
  messagingSenderId: "791066501848",
  appId: "1:791066501848:web:175e8e6993a85a76aa2dad",
  measurementId: "G-FD59Y2183N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
