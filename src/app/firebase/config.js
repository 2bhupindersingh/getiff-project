import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyU5fLqXwOexu4dgUTGTcGJvSAXPQlnC4",
  authDomain: "getiff-app.firebaseapp.com",
  projectId: "getiff-app",
  storageBucket: "getiff-app.firebasestorage.app",
  messagingSenderId: "612340946569",
  appId: "1:612340946569:web:e664d5ee15233d582ad858"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Named exports
export { app, auth, sendSignInLinkToEmail };


// Function to send the sign-in link
export const sendSignInLink = async (email) => {
  const actionCodeSettings = {
    url: 'https://mail.google.com/mail/u/2/#inbox', // Adjust to your redirect URL
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email); // Save email for later sign-in verification
    alert("Verification email sent! Please check your inbox.");
  } catch (error) {
    console.error("Error sending email link", error);
  }
};