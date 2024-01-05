import React, { useContext } from "react";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { AppContext } from "../App";

export default function CreateBookingStep2({ progTwoValues, setProgTwoValues }) {
  const { venueName } = useContext(AppContext);
  return (
    <>
      <p className="text-lg font-[600]">Contact Details</p>

      <div className="relative w-full grid grid-cols-1">
        <p>First and Last Name</p>
        <input value={progTwoValues.name} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, name: e.target.value }))} className={`rounded border-2 px-2 py-1 ${progTwoValues.name.length > 4 ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"} `} type="text" name="fullname" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Email</p>
        {/* eslint-disable-next-line no-useless-escape */}
        <input value={progTwoValues.email} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, email: e.target.value }))} className={`rounded border-2 px-2 py-1 ${/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(progTwoValues.email) ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"}`} type="email" name="email" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Phone</p>
        <PhoneInput className={`px-2 py-1 border-2 ${isValidPhoneNumber(String(progTwoValues.tel)) ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"}`} defaultCountry="GB" placeholder="Enter phone number" value={progTwoValues.tel} onChange={(value) => setProgTwoValues((prev) => ({ ...prev, tel: value }))} />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Comments</p>
        <input value={progTwoValues.message} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, message: e.target.value }))} className="rounded border-2 px-2 py-1" type="text" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1 text-sm">
        <p>I would like to receive news and offers from {venueName} by</p>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> Email</span>
        </div>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> SMS</span>
        </div>
      </div>
      <div className="relative w-full grid grid-cols-1 text-sm mb-4">
        <p>I would like to receive a booking confirmation by</p>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> Email</span>
        </div>
      </div>
    </>
  );
}
