import React from "react"
import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebaseConfig"

import Auth from "../pages/Auth"
import Dashboard from "../pages/Dashboard"
import Navbar from "./Navbar"

const Paths = () => {
  const [user, loading, error] = useAuthState(auth)
  const loc = useLocation()
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={`h-[100svh] flex flex-col overflow-hidden`}>
            <Navbar />
            <div className={`relative flex flex-col ${loc.pathname === "/" ? "basis-[100%]" : "basis-[95%]"} overflow-hidden`}>
              <Outlet />
            </div>
          </div>
        }
      >
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
