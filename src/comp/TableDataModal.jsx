import React, { useContext, useRef } from "react"
import { AppContext } from "../App"

import { FaAngleLeft } from "react-icons/fa6"
import { MdDeleteSweep } from "react-icons/md"
import { RxLapTimer } from "react-icons/rx"
import { PiIdentificationBadgeDuotone } from "react-icons/pi"
import { MdOutlineDateRange } from "react-icons/md"
import { PiWatchLight } from "react-icons/pi"
import { MdTableBar } from "react-icons/md"
import { CiWavePulse1 } from "react-icons/ci"
import { IoPeopleSharp } from "react-icons/io5"
import { FaMapLocation } from "react-icons/fa6"
import { RiAccountPinBoxFill } from "react-icons/ri"
import { GrTransaction } from "react-icons/gr"
import { TiMessages } from "react-icons/ti"
import { GiRotaryPhone } from "react-icons/gi"
import { FaRegCreditCard } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { useState } from "react"

export default function TableDataModal({ data }) {
  const [fadeOut, setFadeOut] = useState(false)
  const { updateContext } = useContext(AppContext)
  const mainModalRef = useRef(null)

  const handleUpdate = (whatToUpdate) => {
    updateContext({ modalUpdateDetails: [whatToUpdate, data] })
    // switch (whatToUpdate) {
    //     case "userDetails":
    //         // name,phone,email,message
    //         updateContext({modalUpdateDetails: [whatToUpdate, data]})
    //     break
    //   case "bookingDetails":
    //     // status, arival time, date
    //     updateContext({modalUpdateDetails: [whatToUpdate, data]})
    //     break
    //   case "assignedSlot":
    //     //section, table, pax
    //     updateContext({modalUpdateDetails: [whatToUpdate, data]})
    //     break

    //   default:
    //     break
    // }
  }

  if (!data) return
  return (
    <div
      onClick={(e) => {
        if (e.target.className === mainModalRef.current.className) {
          setFadeOut(true)
          setTimeout(() => {
            updateContext({ modalData: false })
          }, 400)
        }
      }}
      ref={mainModalRef}
      className={`absolute flex justify-end items-center  bg-black/60 h-[100svh]  w-[100svw] z-20 overflow-hidden transition ${fadeOut ? "animate-fadeOUT" : "animate-fadeIN"}`}
    >
      <div className={`relative flex flex-col h-[100svh] w-[50svw] max-sm:w-[80svw] min-w-[280px] z-30 bg-white overflow-y-auto overflow-x-hidden transition ${fadeOut ? "animate-fadeLeftToRight" : "animate-fadeRightToLeft"} `}>
        <div className="flex flex-nowrap gap-x-2 items-center justify-between overflow-x-hidden min-h-[46px]">
          <div
            onClick={() => {
              setFadeOut(true)
              setTimeout(() => {
                updateContext({ modalData: false })
              }, 400)
            }}
            className="flex flex-nowrap gap-x-2 items-center p-2 active:scale-[.9] transition cursor-pointer"
          >
            <span>
              <FaAngleLeft className="text-3xl" />
            </span>
            <span className="text-lg font-[600]">Dashboard</span>
          </div>

          <div className="flex flex-nowrap gap-x-2 items-center p-2 active:scale-[.9] transition cursor-pointer rounded-xl m-1 bg-red-400">
            <span>
              <MdDeleteSweep className="text-3xl" />
            </span>
            <span className="text-lg font-[600]">Delete</span>
          </div>
        </div>

        <span className="h-[2px] w-[96%] min-h-[2px] mx-auto bg-black rounded-full my-8"></span>
        <div className="grid grid-cols-2 px-4 gap-x-4 relative">
          <span onClick={() => handleUpdate("userDetails")} className="absolute right-6 font-[600] rounded-xl text-sm px-4 py-2 top-[-50px] bg-orange-400 ">
            Update
          </span>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize break-all">
            <CiWavePulse1 /> Guest User
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize break-all">
            <GiRotaryPhone /> {data.phone}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize break-all">
            <RiAccountPinBoxFill />
            {data.name}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize break-all">
            <MdEmail />
            {data.email}
          </div>
          <div className={`flex flex-nowarp items-center gap-x-2 capitalize break-all ${data.cardConfirmed ? "" : "opacity-[0.2]"} `}>
            <FaRegCreditCard className={`fill-green-400`} />
            {data.cardConfirmed ? "Confirmed" : "Not confirmed"}
          </div>
          <div className={`flex flex-nowarp items-center gap-x-2 capitalize break-all ${data.message ? "" : "opacity-[0.2]"} `}>
            <TiMessages />
            {data.message ? "Left message" : "No message"}
          </div>
        </div>

        <span className="h-[2px] w-[96%] min-h-[2px] mx-auto bg-black rounded-full my-8"></span>
        <div className="grid grid-cols-2 px-4 gap-x-4 relative">
          <span onClick={() => handleUpdate("bookingDetails")} className="absolute right-6 font-[600] rounded-xl text-sm px-4 py-2 top-[-50px] bg-orange-400 ">
            Update
          </span>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <RxLapTimer /> {data.status.status}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize break-all">
            <PiIdentificationBadgeDuotone /> #{data.id}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <PiWatchLight />
            {data.assignedSlot[Object.keys(data.assignedSlot)[0]][Object.keys(Object.values(data.assignedSlot)[0])[0]].startTime} - {generateTimeList(data.assignedSlot[Object.keys(data.assignedSlot)[0]][Object.keys(Object.values(data.assignedSlot)[0])[0]].bookedSlots, data.assignedSlot[Object.keys(data.assignedSlot)[0]][Object.keys(Object.values(data.assignedSlot)[0])[0]].startTime).at(-1)}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <MdOutlineDateRange />
            {data.date}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <MdTableBar />
            {Object.keys(data.assignedSlot[Object.keys(data.assignedSlot)[0]])[0]}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <IoPeopleSharp />
            {data.pax}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <FaMapLocation />
            {Object.keys(data.assignedSlot)[0]}
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize">
            <GrTransaction />
            {data.made}
          </div>
        </div>

        <span className="h-[2px] w-[96%] min-h-[2px] mx-auto bg-black rounded-full my-8"></span>
        <div className="grid grid-cols-1 px-4">
          <div className="flex flex-nowarp items-center gap-x-2 capitalize font-[600] text-xl whitespace-nowrap">
            <TiMessages />
            Message
          </div>
          <div className="flex flex-nowarp items-center gap-x-2 capitalize tracking-wide text-xl">{data.message ? data.message : "-No message-"}</div>
        </div>

        {data.status.status !== "Expected" && (
          <>
           <span className="h-[2px] w-[96%] min-h-[2px] mx-auto bg-black rounded-full my-8"></span>
           <div className="grid grid-cols-1 px-4">
             <div className="flex flex-nowarp items-center gap-x-2 capitalize font-[600] text-xl whitespace-nowrap">
               <TiMessages />
               {data.status.status}
             </div>
             <div className="flex flex-nowarp items-center gap-x-2 capitalize tracking-wide text-xl">{data.status.message ? data.status.message :'No reason provided.'}</div>
           </div>
          </>
        )}
      </div>
    </div>
  )
}

// *******************//
// utility functions  //
// *******************//

function generateTimeList(slots, startTime) {
  const timeList = []
  const [startHour, startMinute] = startTime.split(":").map(Number)

  for (let i = 0; i < parseInt(slots) + 1; i++) {
    const hour = Math.floor((startMinute + i * 15) / 60) + startHour
    const minute = (startMinute + i * 15) % 60

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    timeList.push(formattedTime)
  }

  return timeList
}
