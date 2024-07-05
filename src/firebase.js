// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC0NfBynDbjbD79IhVS4kVT6uHDmuIHP8",
  authDomain: "color-palette-crud.firebaseapp.com",
  projectId: "color-palette-crud",
  storageBucket: "color-palette-crud.appspot.com",
  messagingSenderId: "162213559544",
  appId: "1:162213559544:web:7e8b7a19c1d5676c304f0d",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Rename functions
const db = getFirestore(app)
// Export functions
export { db }
