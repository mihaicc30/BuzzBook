import { Fragment, useContext, useEffect, useState } from "react"
import Datepicker from "../comp/Datepicker"
import { useSuspenseQuery } from "@tanstack/react-query"
import { AppContext } from "../App"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { TableData } from "../comp/TableData"
import { useCollectionData } from "react-firebase-hooks/firestore"

export default function Dashboard() {
  const { venueID, date, updateContext, contextBookings, contextCovers } = useContext(AppContext)
  //   venueNdate: `testVenueID ${new Date().toLocaleDateString("en-GB")}`

  const {
    isPending,
    error,
    data: venueData,
  } = useSuspenseQuery({
    queryKey: ["venues", venueID],
    queryFn: async () => {
      const venueData = await query(collection(db, "venues"), where("venue", "==", venueID))
      const result = await getDocs(venueData)
      const data = result.docs.map((element) => element.data())
      if (data.length > 0) {
        return data[0]
      } else return []
    },
  })
   

  const [values] = useCollectionData(query(collection(db, "bookings"), where("venueNdate", "==", `${venueID} ${date}`)))

  useEffect(() => {
    if (!values) return
    const bookings = values ? values[0]?.bookings || [] : []
    if (bookings) {
      if (contextBookings !== bookings.length) updateContext({ contextBookings: bookings.length })
      if (contextCovers !== bookings.length) updateContext({ contextCovers: bookings.reduce((sum, booking) => sum + (parseInt(booking.pax) || 0), 0) })
    }
    // if adding updateContext in dependency it will provoke an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextBookings, contextCovers, values])

  if (isPending || error) return

  const sections = Object.keys(venueData.layout)
  // temp code _ operational hours 7:00 -> 23:45
  const hours = Array.from({ length: 17 }, (_, i) => 7 + i)

  const numCols = hours.length * (sections.length + 1)
  const colWidth = 70
  const totalGridWidth = numCols * colWidth + colWidth

  return (
    <>
      {venueData && (
        <div className="dashboardContent overflow-auto">
          <div className="grid grid-cols-1 auto-rows-max" style={{ width: `${totalGridWidth}px` }}>
            <GetWorkingHours hours={hours} totalGridWidth={totalGridWidth} />
            {Object.keys(venueData.layout)
              .sort()
              .map((section, index) => {
                return (
                  <Fragment key={index}>
                    <div className="grid grid-flow-col auto-cols-[70px] h-8 items-center border-b-2 z-[1] border-b-black/[2%] bg-gray-100 " style={{ width: `${totalGridWidth}px` }}>
                      <span className="sectionName sticky left-0 z-[4] whitespace-nowrap font-[600]">{section}</span>
                    </div>
                    <TableData venueData={values} hours={hours} section={section} tables={Object.keys(venueData.layout[section]).sort()} />
                  </Fragment>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

const GetWorkingHours = ({ totalGridWidth, hours }) => {
  // Function to determine whether to show the border or not
  const showBorder = (CT, minTime, maxTime) => {
    const [currentHour, currentMinute] = CT.split(":").map(Number)
    const [minHour, minMinute] = minTime.split(":").map(Number)
    const [maxHour, maxMinute] = maxTime.split(":").map(Number)

    return (currentHour > minHour || (currentHour === minHour && currentMinute >= minMinute)) && (currentHour < maxHour || (currentHour === maxHour && currentMinute < maxMinute))
  }

  // Get the current hour
  const currentTime = new Date().toTimeString().slice(0, 5)
  //   const currentTime = "9:41"

  return (
    <div className="grid grid-flow-col sticky top-0 z-[2] bg-white auto-cols-[70px] h-12 items-center border-b-2 border-b-black/[2%]" style={{ width: `${totalGridWidth}px` }}>
      <span></span>
      {hours.map((hour) => (
        <Fragment key={crypto.randomUUID()}>
          <div className={`font-bold sticky top-0 w-[20px] whitespace-nowrap`}>
            {hour}
            {showBorder(currentTime, `${hour}:00`, `${hour}:15`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}
            <span className="text-[10px] font-normal">:00</span>
          </div>

          <div className="font-thin sticky top-0 w-[20px]">{showBorder(currentTime, `${hour}:15`, `${hour}:30`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}15</div>
          <div className="font-thin sticky top-0 w-[20px]">{showBorder(currentTime, `${hour}:30`, `${hour}:45`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}30</div>
          <div className="font-thin sticky top-0 w-[20px]">{showBorder(currentTime, `${hour}:45`, `${hour}:59`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}45</div>
        </Fragment>
      ))}
    </div>
  )
}
