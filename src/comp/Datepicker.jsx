import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import DatePicker from "react-date-picker"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { AppContext } from "../App"

export default function Datepicker() {
  const { date, updateContext } = useContext(AppContext)
  const [value, onChange] = useState(new Date())

  useEffect(() => {
    // console.log("Is the date in the context different from the date picker?", String(date) === String(new Date(value).toLocaleDateString("en-GB")), date, new Date(value).toLocaleDateString("en-GB"));
    if (String(date) !== String(new Date(value).toLocaleDateString("en-GB"))) {
      updateContext({ date: new Date(value).toLocaleDateString("en-GB") });
    }
  }, [updateContext, date, value]);

  return (
    <div className="flex justify-center flex-col mx-auto z-[3]">
      <DatePicker onChange={onChange} value={value} />
      <div>
        <span>Total Bookings XX</span> - <span>Total Covers: XX</span>
      </div>
    </div>
  )
}
