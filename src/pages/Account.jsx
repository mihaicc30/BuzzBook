import React, { useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppContext } from "../App";

export default function Account() {
  const { venueLayout, venueID, venueName, date, updateContext, contextBookings, contextCovers, modalData, modalUpdateDetails } = useContext(AppContext);
  const nav = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getID() {
      if (user && !loading) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docx = await getDocs(q);
        let tempUserData = docx.docs[0].data();
        if (userData && userData.uid !== tempUserData.uid) setUserData(tempUserData);
      }
    }
    getID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, venueID, userData]);

  useEffect(() => {
    if (!user && !loading) nav("/");
  }, [user, nav, loading]);

  return <div>Account</div>;
}
