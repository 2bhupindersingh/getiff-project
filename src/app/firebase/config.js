import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCyU5fLqXwOexu4dgUTGTcGJvSAXPQlnC4",
  authDomain: "getiff-app.firebaseapp.com",
  databaseURL: "https://getiff-app-default-rtdb.firebaseio.com",
  projectId: "getiff-app",
  storageBucket: "getiff-app.appspot.com",
  messagingSenderId: "612340946569",
  appId: "1:612340946569:web:e664d5ee15233d582ad858"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Named exports
export { app, auth, db, sendSignInLinkToEmail };

// Function to send the sign-in link
export const sendSignInLink = async (email) => {
  const actionCodeSettings = {
    url: 'https://mail.google.com/mail/u/2/#inbox',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    alert("Verification email sent! Please check your inbox.");
  } catch (error) {
    console.error("Error sending email link", error);
  }
};