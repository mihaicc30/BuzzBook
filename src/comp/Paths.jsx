import React, { useContext, useState } from "react"
import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebaseConfig"

import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import Navbar from "./Navbar"
import Account from "../pages/Account"
import TableDataModal from "./TableDataModal"
import { AppContext } from "../App"
import ModalUpdateDetails from "./ModalUpdateDetails"
import CreateBooking from "../pages/CreateBooking"

const Paths = () => {
  const { venueLayout, venueID, date, updateContext, contextBookings, contextCovers, modalData, modalUpdateDetails } = useContext(AppContext)
  const [user, loading, error] = useAuthState(auth)
  const loc = useLocation()
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={`h-[100svh] flex flex-col overflow-hidden`}>
            {modalData && <TableDataModal data={modalData} />}
            {modalUpdateDetails && <ModalUpdateDetails />}
            
            {loc.pathname !== "/create-booking" && <Navbar />}
            <div className={` relative flex flex-col ${loc.pathname === "/" ? "basis-[100%]" : "basis-[95%]"} overflow-hidden`}>
              <Outlet />
            </div>
          </div>
        }
      >
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create-booking/:venue/:venueid" element={<CreateBooking />} />
        {/* <Route
          path="/activity"
          element={<RiderActivity />}
        />
        <Route
          path="/services"
          element={<RiderServices />}
        />
        <Route
          path="/map"
          element={<RiderMap />}
        />
        <Route
          path="/account"
          element={<RiderAccount />}
        /> */}
        <Route path="*" element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default Paths
