import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function CreateBookingStep1({ progOneValues, setProgOneValues, timeOptions, daysInMonth, handleMonthDateChange }) {
  const [modal, setModal] = useState(false);

  const dateIsInThePast = (theDay) => {
    let currentlyLookedUpDate = `${formatDate(progOneValues.dateValue, String(theDay).padStart(2, "0"))}`;

    const inputDate = new Date(currentlyLookedUpDate);
    const currentDate = new Date();
    inputDate.setHours(currentDate.getHours() + 1);
    inputDate.setMinutes(currentDate.getMinutes());
    inputDate.setSeconds(currentDate.getSeconds());
    return inputDate >= currentDate;
  };

  useEffect(() => {
    setProgOneValues((prev) => ({ ...prev, timeSlot: timeOptions[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOptions[0]]);

  return (
    <>
      <div className="relative w-full grid grid-cols-1">
        <p className="text-lg font-[600]">Covers</p>
        <select className="text-center text-xl border-[1px] rounded" name="partySize" id="partySize" value={progOneValues.partySize} onChange={(e) => setProgOneValues((prev) => ({ ...progOneValues, partySize: e.target.value }))}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={`option-${index + 1}`} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <p className="text-sm">For larger parties please call.</p>
      </div>

      <div className="relative w-full grid grid-cols-1">
        <p className="text-lg font-[600]">Time</p>
        <select className={`text-center text-xl border-[1px] ${timeOptions.length < 1 ? "text-gray-300" : ""} rounded`} name="partySize" id="partySize" value={progOneValues.timeSlot} onChange={(e) => setProgOneValues((prev) => ({ ...progOneValues, timeSlot: e.target.value }))}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
          {timeOptions.length < 1 && (
            <option value="" disabled>
              -No slots available-
            </option>
          )}
        </select>
      </div>

      <div className="relative w-full flex flex-nowrap justify-center items-center gap-x-1">
        <div className="flex justify-center items-center basis-[8%] min-h-[48px] min-w-[48px] text-xl transition cursor-pointer active:bg-gray-50 rounded-lg" onClick={() => handleMonthDateChange(-1)}>
          <FaAngleLeft className="text-xl" />
        </div>

        <p className="px-2 text-center text-lg font-[600]">{new Date(progOneValues.dateValue).toLocaleString("en-GB", { month: "long", year: "numeric" })}</p>

        <div className="flex justify-center items-center asis-[8%] min-h-[48px] min-w-[48px] text-xl transition cursor-pointer active:bg-gray-50 rounded-lg" onClick={() => handleMonthDateChange(1)}>
          <FaAngleRight className="text-xl" />
        </div>
      </div>

      <div className="relative w-full grid grid-cols-7">
        <div className="grid grid-cols-7 col-span-full border-b-2 mb-4 pb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <span key={crypto.randomUUID()} className="dayName text-center max-sm:text-sm max-[500px]:text-xs">
              {day}
            </span>
          ))}
        </div>
        {daysInMonth.map((day, indexz) => {
          if (day < 32)
        //   if (!progOneValues.dayQuery && day !== 0 &&
        //  progOneValues.availability[`day${day}`].available &&
        //   dateIsInThePast(day)) setProgOneValues((prev) => ({ ...progOneValues, dayQuery: day })) 
            // dateIsInThePast(day);
            return (
              <span
     
                onClick={() => {
                  if (day !== 0 && progOneValues.availability[`day${day}`].available && dateIsInThePast(day)) setProgOneValues((prev) => ({ ...progOneValues, dayQuery: day }));
                }}
                key={crypto.randomUUID()}
                className={`relative ${day === 0 ? "" : "day text-center p-1"} ${progOneValues.availability[`day${day}`]?.available ? (progOneValues.dayQuery == day && dateIsInThePast(day) ? "bg-blue-400 font-bold" : day === 0 ? "" : !dateIsInThePast(day) ? "opacity-20" : "border-[1px] ") : "opacity-20"}`}>
                {day === 0 ? "" : day}
                {day !== 0 && (!progOneValues.availability[`day${day}`]?.available || !dateIsInThePast(day)) && <span className="noAvailability"></span>}
              </span>
            );
        })}
      </div>

      <div className="px-1" onClick={() => setModal(!modal)}>
        You accept and commit to following our <span className="underline text-orange-400 cursor-pointer">Terms & Conditions</span> by using this service.
      </div>

      {modal && (
        <div onClick={() => setModal(!modal)} className="absolute animate-fadeIN bg-black/40 inset-0 overflow-hidden px-4 cursor-pointer">
          <ol className="overflow-y-auto overflow-x-hidden bg-white absolute inset-2 p-2 flex flex-col gap-4">
            <li>
              <strong>Card Details for Larger Groups:</strong> For tables with more than four covers, we require credit/debit card details. No charges will be made if booking terms are met.
            </li>
            <li>
              <strong>No-Show Fee:</strong> If you do not honor your booking, a no-show fee of £10 per person will be charged.
            </li>
            <li>
              <strong>Changes in Party Numbers:</strong> If there are changes in party numbers, we require 24 hours notice. Changes made before 24 hours have no charge. A £10 per person charge applies if terms are not met.
            </li>
            <li>
              <strong>Management Discretion:</strong> Management reserves the right to waive fees at their discretion.
            </li>
            <li>
              <strong>Late Arrivals:</strong> If you&apos;re running late, please call the restaurant directly. Tables more than 15 minutes late during busy periods will be treated as a no-show unless you contact us.
            </li>
            <li>
              <strong>Cancellation:</strong> If you need to cancel your booking, please call us.
            </li>
          </ol>
        </div>
      )}
    </>
  );
}

const formatDate = (dateString, day) => {
  const [year, month] = dateString.split("-");
  return `${year}-${month}-${day}`;
};
