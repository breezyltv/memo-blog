import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWGnSYTl7s7POjj2BuN6ABm69q-l2W1gQ",
  authDomain: "memo-blog-bf51e.firebaseapp.com",
  projectId: "memo-blog-bf51e",
  storageBucket: "memo-blog-bf51e.appspot.com",
  messagingSenderId: "173697864374",
  appId: "1:173697864374:web:423b1340fd1fe40ea30c17",
  measurementId: "G-9SKTVX42Q0"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
