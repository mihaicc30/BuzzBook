import { useSuspenseQuery } from "@tanstack/react-query"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Fragment, Suspense, useContext, useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import { AppContext } from "../App"

export const TableData = ({ venueData, tables, section, hours }) => {
  const [assignedSlots, setAssignedSlots] = useState(false)

  useEffect(() => {
    if (venueData && venueData.length > 0) {
      setAssignedSlots(venueData[0].bookings)
    } else {
      setAssignedSlots([])
    }
  }, [venueData])

  if (!venueData || !assignedSlots) return

  console.log(assignedSlots)
  return (
    <Suspense fallback={"Loading"}>
      {tables.map((tn) => (
        <Fragment key={crypto.randomUUID()}>
          <div className="grid grid-flow-col auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]">
            <span className="tableName sticky flex justify-center items-center left-0 z-1 whitespace-nowrap bg-white h-full">{tn}</span>

            {hours.map((hour, index) => (
              <Fragment key={crypto.randomUUID()}>
                {assignedSlots.map((entry) => {
                  const bookedTimes = entry.assignedSlot?.[section]?.[tn]?.bookedTimes[0]

                  if (bookedTimes && [`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`].includes(bookedTimes)) {
                    const generateSpan = (minute) => {
                      const time = `${hour}:${minute}`

                      if (bookedTimes.includes(time)) {
                        console.log("time is", time)
                        return (
                          <span key={crypto.randomUUID()} className={`tableData flex items-center h-[30px] w-full text-xs bg-blue-300 border-2`} style={{ gridColumn: `span ${entry.bookedSlots} / span ${entry.bookedSlots}` }} title={`${section} ${tn} ${time}`}>
                            <div className="flex flex-nowrap justify-between px-2">
                              <div className={`flex flex-nowrap gap-x-2 px-[2px]`}>
                                <p>{entry.pax}</p>
                                <p>{entry.name}</p>
                              </div>
                            </div>
                          </span>
                        )
                      } else {
                        return <span key={crypto.randomUUID()}></span>
                      }
                    }

                    return <Fragment key={crypto.randomUUID()}>{["00", "15", "30", "45"].map((minute) => generateSpan(minute))}</Fragment>
                  }

                  return null // If no bookedTimes match
                })}
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </Suspense>
  )
}
