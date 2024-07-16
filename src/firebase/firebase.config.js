import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkqNDJJLfRB_PW4Y4x3krLQBDyVzlGP-c",
  authDomain: "new-simple-firebase-46d54.firebaseapp.com",
  projectId: "new-simple-firebase-46d54",
  storageBucket: "new-simple-firebase-46d54.appspot.com",
  messagingSenderId: "108148808880",
  appId: "1:108148808880:web:6b7273176aea81d67a6f75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;