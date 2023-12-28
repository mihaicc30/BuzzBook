import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const logInWithEmailAndPassword = async () => {
  await signInWithEmailAndPassword(auth, "test@user.com", "test@user.com");
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // Check if user exists in Firestore
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length < 1) {
      // Add user to Firestore if not already exists
      const newUserRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        accountType: "host",
        displayName: auth.currentUser.displayName,
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        avatar: auth.currentUser.photoURL || "",
        date: new Date().getTime(),
      });
      console.log("User does not exists in Firestore. New user added with ID: ", user.uid);
    } else {
      console.log("User already exists in Firestore. No updates needed.");
    }
    console.log("Popup is successfull. Proceeding...");
  } catch (error) {
    if (error == "FirebaseError: Firebase: Error (auth/popup-closed-by-user).") console.log("User closed login popup.");
  }
};

const logOut = () => {
  signOut(auth);
};

export { app, auth, signInWithGoogle, logOut, logInWithEmailAndPassword };