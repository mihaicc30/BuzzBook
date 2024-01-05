import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Datepicker() {
  const loc = useLocation();
  const { date, updateContext, unassignedBookings, contextBookings, contextCovers } = useContext(AppContext);
  const [dateValue, setDateValue] = useState(new Date().toISOString().split("T")[0]);
  // || loc.pathname !== "/account"
  useEffect(() => {
    if (String(date) !== String(new Date(dateValue).toLocaleDateString("en-GB"))) {
      updateContext({ date: new Date(dateValue).toLocaleDateString("en-GB") });
    }
  }, [updateContext, date, dateValue]);

  const handleDateChange = (daysToAdd) => {
    const currentDate = new Date(dateValue);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    setDateValue(currentDate.toISOString().split("T")[0]);
  };

  return (
    <>
      {loc.pathname !== "/account" && (
        <div className="flex justify-center flex-col mx-auto z-[10] py-2">
          <div className="relative w-[220px] flex flex-nowrap items-center gap-x-1">
            <div className="p-2 text-xl active:scale-[.5] focus:scale-[.5] transition cursor-pointer" onClick={() => handleDateChange(-1)}>
              <FaAngleLeft />
            </div>
            <div className="relative">
              <input type="date" className={`px-2 border-[1px] rounded-lg text-center w-full border-y-orange-600`} value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
            </div>
            <div className="p-2 text-xl active:scale-[.5] focus:scale-[.5] transition cursor-pointer" onClick={() => handleDateChange(1)}>
              <FaAngleRight />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-2 text-sm">
            <span>
              Bookings {contextBookings || 0}
              {unassignedBookings > 0 && `/${unassignedBookings + contextBookings}`}
            </span>{" "}
            - <span>Covers: {contextCovers || 0}</span>
          </div>
        </div>
      )}
    </>
  );
}
