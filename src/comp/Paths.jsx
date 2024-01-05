import React, { Suspense, useContext, useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Navbar from "./Navbar";
import Account from "../pages/Account";
import TableDataModal from "./TableDataModal";
import { AppContext } from "../App";
import ModalUpdateDetails from "./ModalUpdateDetails";
import CreateBooking from "../pages/CreateBooking";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

const Paths = () => {
  const { venueLayout, venueID, venueName, date, updateContext, contextBookings, contextCovers, modalData, modalUpdateDetails } = useContext(AppContext);
  const [user, loading, error] = useAuthState(auth);
  const loc = useLocation();

  useEffect(() => {
    async function getID() {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docx = await getDocs(q);
        let VID = docx.docs[0].data().venueID;
        let VIN = docx.docs[0].data().venueName;
        if (venueID !== VID) {
          updateContext({ venueID: VID, venueName: VIN });
        }
      }
    }
    getID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, venueID]);

  useEffect(() => {
    if (loc.pathname !== "/dashboard" && modalData) updateContext({ modalData: false });
    if (loc.pathname !== "/dashboard" && modalUpdateDetails) updateContext({ modalUpdateDetails: false });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, modalData, modalUpdateDetails]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <div className={`h-[100svh] flex flex-col overflow-hidden`}>
              {modalData && <TableDataModal data={modalData} />}
              {modalUpdateDetails && <ModalUpdateDetails />}

              {loc.pathname !== "/create-booking" && <Navbar />}
              <div className={` relative flex flex-col ${loc.pathname === "/" ? "basis-[100%]" : "basis-[95%]"} overflow-hidden`}>
                <Outlet />
              </div>
            </div>
          </Suspense>
        }>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create-booking/:venue/:venueid" element={<CreateBooking />} />

        <Route path="*" element={<Auth />} />
      </Route>
    </Routes>
  );
};

export default Paths;
