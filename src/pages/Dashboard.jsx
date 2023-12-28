import { Fragment, useContext, useEffect, useState } from "react"
import Datepicker from "../comp/Datepicker"
import { useSuspenseQuery } from "@tanstack/react-query"
import { AppContext } from "../App"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { TableData } from "../comp/TableData"
import { useCollectionData } from "react-firebase-hooks/firestore"

export default function Dashboard() {
  const { venueID, date, updateContext } = useContext(AppContext)
  //   venueNdate: `testVenueID ${new Date().toLocaleDateString("en-GB")}`

  const {
    isPending,
    error,
    data: venueData
  } = useSuspenseQuery({
    queryKey: ["venues", venueID],
    queryFn: async () => {
      const venueData = await query(collection(db, "venues"), where("venue", "==", venueID))
      const result = await getDocs(venueData)
      const data = result.docs.map((element) => element.data())
      if (data.length > 0) {
        return data[0]
      } else return []
    }
  })

  const [values] = useCollectionData(query(collection(db, "bookings"), where("venueNdate", "==", `${venueID} ${date}`)))

  if (isPending || error ) return;



  const sections = Object.keys(venueData.layout)
  // temp code _ operational hours 7:00 -> 23:45
  const hours = Array.from({ length: 17 }, (_, i) => 7 + i)

  const numCols = hours.length * (sections.length + 1)
  const colWidth = 50
  const totalGridWidth = numCols * colWidth * 2 + colWidth

  return (
    <>
      <Datepicker />
      {venueData && (
        <div className="overflow-auto">
          <div className="grid grid-cols-1" style={{ width: `${totalGridWidth}px` }}>
            <GetWorkingHours hours={hours} totalGridWidth={totalGridWidth} />
            {
              Object.keys(venueData.layout)
                .sort()
                .map((section, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="grid grid-flow-col auto-cols-[50px] h-8 items-center border-b-2 border-b-black/[2%] bg-gray-100 "  style={{ width: `${totalGridWidth}px` }}>
                        <span className="sectionName sticky left-0 z-1 whitespace-nowrap font-[600]">{section}</span>
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
  return (
    <div className="grid grid-flow-col sticky top-0 z-[2] bg-white auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]" style={{ width: `${totalGridWidth}px` }}>
      <span></span>
      {hours.map((hour) => (
        <Fragment key={hour}>
          <div className="font-bold sticky top-0 w-[20px] whitespace-nowrap">
            {hour}
            <span className="text-[10px] font-normal">:00</span>
          </div>
          <span className="font-thin sticky top-0 w-[20px]">15</span>
          <span className="font-thin sticky top-0 w-[20px]">30</span>
          <span className="font-thin sticky top-0 w-[20px]">45</span>
        </Fragment>
      ))}
    </div>
  )
}
