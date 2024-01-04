import React from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function CreateBookingStep2({ progTwoValues, setProgTwoValues }) {
  return (
    <>
      <p className="text-lg font-[600]">Contact Details</p>

      <div className="relative w-full grid grid-cols-1">
        <p>First and Last Name</p>
        <input value={progTwoValues.name} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, name: e.target.value }))} className="rounded border-2 px-2 py-1" type="text" name="fullname" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Email</p>
        <input value={progTwoValues.email} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, email: e.target.value }))} className="rounded border-2 px-2 py-1" type="email" name="email" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Phone</p>
        <PhoneInput className="px-2 py-1 border-2" defaultCountry="GB" placeholder="Enter phone number" value={progTwoValues.tel} onChange={(value) => setProgTwoValues((prev) => ({ ...prev, tel: value }))} />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Comments</p>
        <input value={progTwoValues.message} onChange={(e) => setProgTwoValues((prev) => ({ ...prev, message: e.target.value }))} className="rounded border-2 px-2 py-1" type="text" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>I would like to receive news and offers by</p>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> Email</span>
        </div>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> SMS</span>
        </div>
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>I would like to receive a booking confirmation by</p>
        <div>
          <input className="rounded border-2 px-2 py-1" type="checkbox" defaultChecked={true} />
          <span> Email</span>
        </div>
      </div>
    </>
  );
}
