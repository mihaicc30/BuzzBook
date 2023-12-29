import { useEffect, useState } from "react"
import { useContext } from "react"
import { AppContext } from "../App"

export default function Datepicker() {
  const { date, updateContext, contextBookings, contextCovers } = useContext(AppContext)
  // const [value, onChange] = useState(new Date())
  const [dateValue, setDateValue] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    if (String(date) !== String(new Date(dateValue).toLocaleDateString("en-GB"))) {
      updateContext({ date: new Date(dateValue).toLocaleDateString("en-GB") })
    }
  }, [updateContext, date, dateValue])

  return (
    <div className="flex justify-center flex-col mx-auto z-[10] py-2">
      <div className="relative w-[220px]">
        <input type="date" className={`px-2 border-2 rounded-lg text-center w-full`} defaultValue={dateValue} onChange={(e) => setDateValue(e.target.value)} />
      </div>
      <div className="flex flex-nowrap justify-center gap-x-2 text-sm">
        <span>Bookings {contextBookings || 0}</span> - <span>Covers: {contextCovers || 0}</span>
      </div>
    </div>
  )
}
