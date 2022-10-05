import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIK8S31AT2iZfk1Oy_5qgqaEXCK5-Me0Y",
  authDomain: "signinglightfreelance-a4aad.firebaseapp.com",
  projectId: "signinglightfreelance-a4aad",
  storageBucket: "signinglightfreelance-a4aad.appspot.com",
  messagingSenderId: "54187287590",
  appId: "1:54187287590:web:192768cf7308d31c1ab2e7",
  measurementId: "G-DGCYSBEPC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://signinglightfreelance-a4aad.appspot.com")

export default storage;