import React, { useRef, useState } from "react"
import { RxDashboard } from "react-icons/rx"
import { MdOutlineMenuOpen } from "react-icons/md"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebaseConfig"
import Datepicker from "./Datepicker"

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname !== "/" && (
        <div className="flex basis-[5%] justify-between px-2 border-b-2 max-[460px]:flex-col">
          <div className="h-full flex justify-center items-center my-auto">
            <img src="./assets/ic.png" alt="Logo" className="h-auto w-[60px]" />
            <div className="flex flex-col justify-center items-center h-full mt-[8px]">
              <h1 className="text-center text-[1.8rem] tracking-widest leading-[18px] text-[#181831] ff">Buzz</h1>
              <h1 className="text-center text-[1rem] tracking-widest leading-[18px] text-[#B74216]">
                <span>-</span>
                <span className="ff">BOOK</span>
                <span>-</span>
              </h1>
            </div>
            <div className="justify-center items-center hidden max-[460px]:flex">
              <SideMenu cln="border-2 rounded-lg shadow-md m-1 text-3xl p-1" />
            </div>
          </div>

          <Datepicker />

          <div className="flex justify-center items-center max-[460px]:hidden">
            <SideMenu cln="border-2 rounded-lg shadow-md m-1 text-4xl p-1" />
          </div>
        </div>
      )}
    </>
  )
}

function SideMenu({ cln }) {
  const [signOut, loading, error] = useSignOut(auth)
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [modal, setModal] = useState(false)
  const mainModalRef = useRef(null)

  const handleLogout = async () => {
    const success = await signOut()
    if (success) {
      nav("/")
    }
  }
  return (
    <>
      <button className={`${cln}`} onClick={() => setModal(!modal)}>
        <MdOutlineMenuOpen />
      </button>
      {modal && (
        <div
          ref={mainModalRef}
          onClick={(e) => {
            if (pathname !== "/" && String(e.target.className)?.startsWith("mainModal") && !String(mainModalRef.current.className).includes("fadeOUT")) {
              mainModalRef.current.className = String(mainModalRef.current.className).replace("fadeIN", "fadeOUT")
              setTimeout(() => {
                setModal(!modal)
              }, 500)
            }
          }}
          className={`mainModal absolute inset-0 flex flex-col bg-gray-800/50 z-[19] animate-fadeIN  transition overflow-hidden`}
        >
          <div className={`secModal overflow-y-auto absolute top-0 bot-0 right-0 flex flex-col bg-gray-50 z-20 h-[100svh] ${modal ? "w-[250px]" : "w-[0px]"} transition`} style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%, 8% 77%)" }}>
            <div className="flex flex-col justify-center items-center mt-[8px] pb-12 border-b-2">
              <h1 className="text-center text-[1.8rem] tracking-widest leading-[18px] text-[#181831] ff">Buzz</h1>
              <h1 className="text-center text-[1rem] tracking-widest leading-[18px] text-[#B74216]">
                <span>-</span>
                <span className="ff">BOOK</span>
                <span>-</span>
              </h1>
            </div>

            <NavLink
              onClick={(e) => {
                mainModalRef.current.className = String(mainModalRef.current.className).replace("fadeIN", "fadeOUT")
                setTimeout(() => {
                  setModal(!modal)
                }, 500)
              }}
              to="/dashboard"
              className={({ isActive, isPending }) => (isPending ? "pending text-center text-blue-500 transition flex flex-col justify-center items-center" : isActive ? "active text-center text-blue-500 transition flex flex-col justify-center items-center" : "text-center transition opacity-10 flex flex-col justify-center items-center ")}
            >
              <span className="text-xl leading-10 my-4">Dash</span>
              <span className=" border-b-2 border-b-blue-500 h-1 w-full"></span>
            </NavLink>

            <NavLink
              onClick={(e) => {
                mainModalRef.current.className = String(mainModalRef.current.className).replace("fadeIN", "fadeOUT")
                setTimeout(() => {
                  setModal(!modal)
                }, 500)
              }}
              to="/account"
              className={({ isActive, isPending }) => (isPending ? "pending text-center text-blue-500 transition flex flex-col justify-center items-center" : isActive ? "active text-center text-blue-500 transition flex flex-col justify-center items-center" : "text-center transition opacity-10 flex flex-col justify-center items-center ")}
            >
              <span className="text-xl leading-10 my-4">Account</span>
              <span className=" border-b-2 border-b-blue-500 h-1 w-full"></span>
            </NavLink>

            
            <NavLink
              onClick={async (e) => {
                e.preventDefault()
                handleLogout()
              }}
              className={({ isActive, isPending }) => (isPending ? "pending text-center text-blue-500 transition flex flex-col justify-center items-center" : isActive ? "active text-center text-blue-500 transition flex flex-col justify-center items-center" : "text-center transition opacity-10 flex flex-col justify-center items-center ")}
              to="/"
            >
              <span className="text-xl leading-10 my-4">Logout</span>
              <span className=" border-b-2 border-b-blue-500 h-1 w-full"></span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  )
}
