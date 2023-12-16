// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfZewfeUB7N2ReDRVXfmrlcJFuspvUTys",
  authDomain: "socialmediaapp-afe4a.firebaseapp.com",
  projectId: "socialmediaapp-afe4a",
  storageBucket: "socialmediaapp-afe4a.appspot.com",
  messagingSenderId: "1037201435303",
  appId: "1:1037201435303:web:a5dd3e51bdc993985a0982",
  measurementId: "G-4VY0KDQYDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)

