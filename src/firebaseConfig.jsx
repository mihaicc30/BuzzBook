import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

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

const addSomeData = () => [
  {
    startTime: "7:15",
    message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    made: "By Phone",
    cardConfirmed: false,
    id: crypto.randomUUID(),
    desiredStartTime: "7:15",
    status: {
      status: "Expected",
      reason: "",
    },
    date: "01/01/2024",
    name: "Jim Raynor",
    phone: "1123412341",
    pax: 4,
    email: "someemail@com",
  },
  {
    name: "Aiur Talandar",
    desiredStartTime: "9:15",
    startTime: "9:15",
    pax: 3,
    phone: "1123412341",
    made: "By Phone",
    message: "",
    cardConfirmed: true,
    id: crypto.randomUUID(),
    status: {
      status: "Expected",
      reason: "",
    },
    email: "someemail@com",
    assignedSlot: {
      Restaurant: {
        T1: {
          startTime: "8:15",
          bookedTimes: ["08:15", "08:30", "08:45", "09:00", "09:15"],
          bookedSlots: "5",
        },
      },
    },
    date: "01/01/2024",
  },
  {
    date: "01/01/2024",
    startTime: "7:15",
    desiredStartTime: "7:15",
    assignedSlot: {
      Bar: {
        T10: {
          bookedTimes: ["07:00", "07:15", "07:30", "07:45", "08:00"],
          bookedSlots: "5",
          startTime: "7:00",
        },
      },
    },
    email: "someemail@com",
    cardConfirmed: false,
    name: "Artanis Ashredar",
    status: {
      status: "Expected",
      reason: "",
    },
    made: "By Phone",
    pax: 4,
    message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    phone: "1123412341",
    id: crypto.randomUUID(),
  },
  {
    assignedSlot: {
      Bar: {
        T10: {
          startTime: "9:00",
          bookedSlots: "5",
          bookedTimes: ["09:00", "09:15", "09:30", "09:45", "10:00"],
        },
      },
    },
    made: "Online",
    date: "01/01/2024",
    name: "High Executor Selendis",
    pax: 3,
    message: "Some short message",
    status: {
      reason: "",
      status: "Expected",
    },
    phone: "1123412341",
    id: crypto.randomUUID(),
    desiredStartTime: "9:15",
    cardConfirmed: true,
    email: "someemail@com",
  },
];

// addSomeData()
export { db, app, auth, signInWithGoogle, logOut, logInWithEmailAndPassword };
