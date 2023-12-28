import React from "react";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export default function Navbar() {
  const [signOut, loading, error] = useSignOut(auth);
  const nav = useNavigate();

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      nav("/");
    }
  };

  return (
    <div className="flex basis-[5%] justify-between px-2  border-b-2">
      <p className="my-auto">LOGO</p>
      <div className="flex gap-2">
        <NavLink
          className={({ isActive, isPending }) => (isPending ? "pending text-center text-blue-500 transition flex flex-col justify-center items-center" : isActive ? "active text-center text-blue-500 transition flex flex-col justify-center items-center" : "text-center transition opacity-10 flex flex-col justify-center items-center")}
          to="/dashboard"
        >
          <RxDashboard className="text-[2rem] max-w-[70px]" />
          <span className="text-xs">Dash</span>
        </NavLink>
        <NavLink
          onClick={async (e) => {
            e.preventDefault();
            handleLogout();
          }}
          className={({ isActive, isPending }) => (isPending ? "pending text-center text-blue-500 transition flex flex-col justify-center items-center" : isActive ? "active text-center text-blue-500 transition flex flex-col justify-center items-center" : "text-center transition opacity-10 flex flex-col justify-center items-center")}
          to="/"
        >
          <RxDashboard className="text-[2rem] max-w-[70px]" />
          <span className="text-xs">Logout</span>
        </NavLink>
      </div>
    </div>
  );
}
