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

const addSomeData = () => {
  let x = {
    venueNdate: `testVenueID ${new Date().toLocaleDateString("en-GB")}`,
    bookings: [
      {
        startTime: "7:15",
        message: "Some message Some message Some message Some message Some message ! Hope you got it!",
        made: "By Phone",
        cardConfirmed: false,
        id: crypto.randomUUID(),
        desiredStartTime: "7:15",
        status: {
          status: "Expected",
          reason: "",
        },
        date: "02/01/2024",
        name: "Daniel Jackson",
        phone: "1123412341",
        pax: 4,
        email: "someemail@com",
      },
      {
        name: "Samantha Carter",
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
        date: "02/01/2024",
      },
      {
        date: "02/01/2024",
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
        name: "Jack ONeill",
        status: {
          status: "Expected",
          reason: "",
        },
        made: "By Phone",
        pax: 4,
        message: "Some message Some mes ! Hope you got it!",
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
        date: "02/01/2024",
        name: "George Hammond",
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
    ],
  };
  addDoc(collection(db, "bookings"), x);
};

// addSomeData()

const addNewBooking = async (venue, data) => {
  try {
    const q = await query(collection(db, "bookings"), where("venueNdate", "==", venue));
    const docx = await getDocs(q);
    console.log("🚀 ~ file: firebaseConfig.jsx:173 ~ addNewBooking ~ docx:", docx);
    if (!docx.docs[0]) {
      
      await addDoc(collection(db, "bookings"), {
        venueNdate: venue,
        bookings: [data]
      });
      return "success. added new.";
    } else {
      const docRef = doc(db, "bookings", docx.docs[0].id);
      console.log("🚀 ~ file: firebaseConfig.jsx:175 ~ addNewBooking ~ docRef:", docRef);
      let updatedData = docx.docs[0].data();
      console.log("🚀 ~ file: firebaseConfig.jsx:177 ~ addNewBooking ~ updatedData:", updatedData);
      updatedData.bookings.push(data);
      await updateDoc(docRef, updatedData, { merge: true });
      return "success. updated existing.";
    }
  } catch (error) {
    return error.message;
  }
};

export { db, app, auth, signInWithGoogle, logOut, logInWithEmailAndPassword, addNewBooking };
