import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import DatePicker from "react-date-picker"
import { useState } from "react"

export default function Datepicker() {
  const [value, onChange] = useState(new Date())



  return (
    <div className="flex justify-center flex-col mx-auto z-[3]">
      <DatePicker onChange={onChange} value={value} />
      <div>
        <span>Total Bookings XX</span> - <span>Total Covers: XX</span>
      </div>
    </div>
  )
}
