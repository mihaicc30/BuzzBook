import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth"

import { useCollectionData } from "react-firebase-hooks/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
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
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

const logInWithEmailAndPassword = async () => {
  await signInWithEmailAndPassword(auth, "test@user.com", "test@user.com")
}

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user

    // Check if user exists in Firestore
    const q = query(collection(db, "users"), where("email", "==", user.email))
    const docs = await getDocs(q)
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
      })
      console.log("User does not exists in Firestore. New user added with ID: ", user.uid)
    } else {
      console.log("User already exists in Firestore. No updates needed.")
    }
    console.log("Popup is successfull. Proceeding...")
  } catch (error) {
    if (error == "FirebaseError: Firebase: Error (auth/popup-closed-by-user).") console.log("User closed login popup.")
  }
}

const logOut = () => {
  signOut(auth)
}

const addSomeData = () => {
  let x = {
    venueNdate: `testVenueID ${new Date().toLocaleDateString("en-GB")}`,
    bookings: [
      {
        status: {
          status: "Expected",
          reason: "",
        },
        id: "someRandomID3",
        made: "By Phone",
        startTime: "7:15",
        date: new Date().toLocaleDateString("en-GB"),
        bookedSlots: "5",
        bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
        name: "Mihai",
        email: "someemail@com",
        phone: "1123412341",
        cardConfirmed: false,
        message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
        pax: 4,
        assignedSlot: {
          Restaurant: {
            T3: {
              startTime: "7:15",
              bookedSlots: "5",
              bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
            },
          },
        },
      },
      {
        status: {
          status: "Expected",
          reason: "",
        },
        id: "someRandomID4",
        startTime: "9:15",
        made: "By Phone",
        date: new Date().toLocaleDateString("en-GB"),
        bookedSlots: "5",
        bookedTimes: ["9:15", "9:30", "9:45", "10:00", "10:15", "10:30"],
        name: "Mihai",
        email: "someemail@com",
        phone: "1123412341",
        cardConfirmed: false,
        message: "",
        pax: 3,
        assignedSlot: {
          Restaurant: {
            T1: {
              startTime: "9:15",
              bookedSlots: "5",
              bookedTimes: ["9:15", "9:30", "9:45", "10:00", "10:15", "10:30"],
            },
          },
        },
      },
      {
        status: {
          status: "Expected",
          reason: "",
        },
        id: "someRandomID1",
        startTime: "7:15",
        made: "By Phone",
        date: new Date().toLocaleDateString("en-GB"),
        bookedSlots: "5",
        bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
        name: "Mihai",
        email: "someemail@com",
        phone: "1123412341",
        cardConfirmed: false,
        message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
        pax: 4,
        assignedSlot: {
          Bar: {
            T10: {
              startTime: "7:15",
              bookedSlots: "5",
              bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
            },
          },
        },
      },
      {
        status: {
          status: "Expected",
          reason: "",
        },
        id: "someRandomID2",
        startTime: "9:15",
        made: "Online",
        date: new Date().toLocaleDateString("en-GB"),
        bookedSlots: "5",
        bookedTimes: ["9:15", "9:30", "9:45", "10:00", "10:15", "10:30"],
        name: "Mihai",
        email: "someemail@com",
        phone: "1123412341",
        cardConfirmed: false,
        message: "",
        pax: 3,
        assignedSlot: {
          Bar: {
            T10: {
              startTime: "9:15",
              bookedSlots: "5",
              bookedTimes: ["9:15", "9:30", "9:45", "10:00", "10:15", "10:30"],
            },
          },
        },
      },
    ],
  }
  addDoc(collection(db, "bookings"), x)
}

// addSomeData()
export { db, app, auth, signInWithGoogle, logOut, logInWithEmailAndPassword }
