import { useSuspenseQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Fragment, Suspense, useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebaseConfig";
import { AppContext } from "../App";
import { MdEmail, MdTableBar } from "react-icons/md";
import { FaMapLocation, FaRegCreditCard } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { IoEyeSharp } from "react-icons/io5";
import { PiWatchLight } from "react-icons/pi";
import { BiSolidUpArrow } from "react-icons/bi";

export const ListData = ({ venueData }) => {
  const { updateContext } = useContext(AppContext);
  const filterNameRef = useRef(null);
  const filterPhoneRef = useRef(null);

  const [sortingValues, setSortingValues] = useState({
    startTime: "asc",
    status: false,
    cardConfirmation: false,
    messageExists: false,
    pax: false,
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [filteringValues, setFilteringValues] = useState({
    startTime: "",
    status: "",
    cardConfirmation: "",
    messageExists: "",
    pax: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const sortByThis = (a, b) => {
    const getSortingField = () => {
      for (const key in sortingValues) {
        if (sortingValues[key] !== false) {
          return key;
        }
      }
    };
    const sortingField = getSortingField();

    switch (sortingField) {
      case "startTime":
        return sortingValues[sortingField] === "asc" ? convertTimeToMinutes(a.assignedSlot[Object.keys(a.assignedSlot)[0]][Object.keys(Object.values(a.assignedSlot)[0])[0]].startTime) > convertTimeToMinutes(b.assignedSlot[Object.keys(b.assignedSlot)[0]][Object.keys(Object.values(b.assignedSlot)[0])[0]].startTime) : convertTimeToMinutes(a.assignedSlot[Object.keys(a.assignedSlot)[0]][Object.keys(Object.values(a.assignedSlot)[0])[0]].startTime) < convertTimeToMinutes(b.assignedSlot[Object.keys(b.assignedSlot)[0]][Object.keys(Object.values(b.assignedSlot)[0])[0]].startTime);

      case "status":
        return sortingValues[sortingField] === "asc" ? a.status.status > b.status.status : a.status.status < b.status.status;

      case "messageExists":
        return sortingValues[sortingField] === "asc" ? a.message : b.message;

      case "pax":
        return sortingValues[sortingField] === "asc" ? parseInt(a[sortingField]) > parseInt(b[sortingField]) : parseInt(a[sortingField]) < parseInt(b[sortingField]);

      case "name":
        return sortingValues[sortingField] === "asc" ? a[sortingField] > b[sortingField] : a[sortingField] < b[sortingField];

      default:
        return sortingValues[sortingField] === "asc" ? a[sortingField] > b[sortingField] : a[sortingField] < b[sortingField];
        break;
    }
  };

  const arangeByThis = (field) => {
    let initialState = {
      startTime: false,
      status: false,
      cardConfirmation: false,
      messageExists: false,
      pax: false,
      name: false,
      phone: false,
      email: false,
      message: false,
    };
    setSortingValues((prevValues) => ({
      ...initialState,
      [field]: prevValues[field] === "asc" ? "desc" : prevValues[field] === "desc" ? false : "asc",
    }));
  };

  const bookings = venueData[0]?.bookings?.filter((data, index) => data.assignedSlot).sort((a, b) => (sortByThis(a, b) ? 1 : -1));

  const getSortingArrows = (type) => {
    return (
      <>
        <BiSolidUpArrow className={`text-xs ${!sortingValues[type] ? "opacity-10" : sortingValues[type] === "asc" ? "" : "opacity-10"}`} />
        <BiSolidUpArrow className={`rotate-180 text-xs  ${!sortingValues[type] ? "opacity-10" : sortingValues[type] === "desc" ? "" : "opacity-10"}`} />
      </>
    );
  };

  const handleFilterChange = (field, value) => {
    setFilteringValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const filteredBookings = (booking) => {
    if (!String(booking.startTime).toLowerCase().includes(String(filteringValues.startTime).toLowerCase())) return false;
    if (!String(booking.status).toLowerCase().includes(String(filteringValues.status).toLowerCase())) return false;
    if (!String(booking.cardConfirmation).toLowerCase().includes(String(filteringValues.startTime).toLowerCase())) return false;
    if (!String(booking.messageExists).toLowerCase().includes(String(filteringValues.startTime).toLowerCase())) return false;
    if (!String(booking.name).toLowerCase().includes(String(filteringValues.name).toLowerCase())) return false;
    if (!String(booking.phone).toLowerCase().includes(String(filteringValues.phone).toLowerCase())) return false;
    if (!String(booking.email).toLowerCase().includes(String(filteringValues.email).toLowerCase())) return false;
    if (!String(booking.message).toLowerCase().includes(String(filteringValues.message).toLowerCase())) return false;

    return true;
  };

  return (
    <Suspense>
      <div key={crypto.randomUUID()} className={`sectionContainer grid grid-cols-1 auto-rows-max overflow-auto min-w-[1450px] pb-[10vh]`}>
        <div className={`grid bg-gray-200 h-[60px] grid-cols-[80px_50px_80px_50px_50px_60px_60px_100px_200px_70px_63px_550px] items-start border-b-2 border-b-black/[2%] font-[600]`}>
          <div></div>

          <div className={`flex flex-col justify-between h-full`}>
            <div onClick={() => arangeByThis("startTime")} className="py-1 px-2 flex flex-nowrap items-center">
              <PiWatchLight />
              {getSortingArrows("startTime")}
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div onClick={() => arangeByThis("status")} className=" pb-1 px-2 flex flex-nowrap items-center">
              Status
              {getSortingArrows("status")}
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div onClick={() => arangeByThis("messageExists")} className="py-1 px-2 flex flex-nowrap items-center">
              <TiMessages />
              {getSortingArrows("messageExists")}
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className="py-1 px-2 flex flex-nowrap items-center justify-center">
              <FaRegCreditCard />
              {/* {getSortingArrows("cardConfirmation")}  for some reason i cant get this to work for now based on a boolean value :/  */}
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div onClick={() => arangeByThis("pax")} className="pb-1 px-2 flex flex-nowrap items-center ">
              Covers
              {getSortingArrows("pax")}
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className="py-1 px-2 flex flex-nowrap items-center justify-center">
              <MdTableBar />
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className="py-1 px-2 flex flex-nowrap items-center justify-center">
              <FaMapLocation />
            </div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div onClick={() => arangeByThis("name")} className="pb-1 px-2 flex flex-nowrap items-center ">
              Name
              {getSortingArrows("name")}
            </div>
            <input
              ref={filterNameRef}
              type="text"
              value={filteringValues.name}
              onChange={(e) => {
                handleFilterChange("name", e.target.value);
                setTimeout(() => {
                  filterNameRef.current.focus();
                }, 111);
              }}
              className="bg-white mx-2 px-2 py-1 font-normal text-xs mt-auto rounded"
              placeholder="Name filter..."
            />
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className=" pb-1 px-2 flex flex-nowrap items-center ">Phone</div>
            <input
              ref={filterPhoneRef}
              type="text"
              value={filteringValues.phone}
              onChange={(e) => {
                handleFilterChange("phone", e.target.value);
                setTimeout(() => {
                  filterPhoneRef.current.focus();
                }, 111);
              }}
              className="bg-white mx-2 px-2 py-1 font-normal text-xs mt-auto rounded"
              placeholder="Phone filter..."
            />
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className=" pb-1 px-2 flex flex-nowrap items-center ">Email</div>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <div className="pb-1 px-2 flex flex-nowrap items-center ">Message</div>
          </div>
        </div>

        {bookings &&
          bookings.length > 0 &&
          bookings
            .filter((booking) => filteredBookings(booking))
            .map((booking, indx) => {
              // if (filteredBookings(booking, filteringValues))
              return (
                <div key={crypto.randomUUID()} className={`grid pt-1 ${indx % 2 == 0 ? "bg-white" : "bg-gray-100"} ${booking.status.status === "Expected" ? "" : "opacity-40"} grid-cols-[80px_50px_80px_50px_50px_60px_60px_100px_200px_70px_63px_550px] items-start border-b-2 border-b-black/[2%]`}>
                  <button className="bg-orange-400 p-1 mx-1 rounded-xl text-sm font-bold" onClick={() => updateContext({ modalData: booking })}>
                    Update
                  </button>
                  <p className="text-center">{booking.assignedSlot[Object.keys(booking.assignedSlot)[0]][Object.keys(Object.values(booking.assignedSlot)[0])[0]].startTime}</p>
                  <p className={`text-sm mx-auto pt-[2px] tracking-tighter ${booking.status.status === "Expected" ? "" : "text-red-500 font-[600]"}`}>{booking.status.status}</p>
                  <p className="text-sm mx-auto">{booking.message ? "✅" : "⛔"}</p>
                  <p className="text-sm mx-auto">{booking.cardConfirmed ? "✅" : "⛔"}</p>
                  <p className="mx-auto">{booking.pax}</p>
                  <p className="mx-auto">{Object.keys(booking.assignedSlot[Object.keys(booking.assignedSlot)[0]])[0]}</p>
                  <p className="mx-auto tracking-tighter">{Object.keys(booking.assignedSlot)[0]}</p>
                  <p className="pl-2">{booking.name}</p>
                  <div className="relative group group-active:bg-blue-400 p-2">
                    <IoEyeSharp className="group-active:hidden m-auto" />
                    <span className="hidden group-active:block absolute left-1/2 -translate-x-1/2 top-[-300%] bg-white p-2 z-50 border-2">{booking.phone}</span>
                  </div>
                  <div className="relative group group-active:bg-blue-400 p-2">
                    <IoEyeSharp className="group-active:hidden m-auto" />
                    <span className="hidden group-active:block absolute left-1/2 -translate-x-1/2 top-[-300%] bg-white p-2 z-50 border-2">{booking.email}</span>
                  </div>
                  <p className="pl-2">{booking.message}</p>
                </div>
              );
            })}
      </div>
    </Suspense>
  );
};

// *******************//
// utility functions  //
// *******************//

const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
};
