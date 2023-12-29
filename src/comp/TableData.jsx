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

  return (
    <Suspense fallback={"Loading"}>
      {tables.map((tn, indx) => (
        <Fragment key={crypto.randomUUID()}>
          <div className={`grid grid-flow-col auto-cols-[70px] h-12 items-center border-b-2 border-b-black/[2%] z-[1] ${indx % 2 == 0 ? "bg-white" : "bg-gray-50"} `}>
            <span className={`tableName   sticky flex items-center left-0 z-[4] whitespace-nowrap h-full`}>
              
              <span className={`pl-2 h-full flex items-center ${indx % 2 == 0 ? "bg-white" : "bg-gray-50"}`}>{tn}</span>
            </span>

            {hours.map((hour, index) => (
              <Fragment key={crypto.randomUUID()}>
                {assignedSlots.map((entry) => {
                  const bookedTimes = entry.assignedSlot?.[section]?.[tn]?.bookedTimes[0]

                  if (bookedTimes && [`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`].includes(bookedTimes)) {
                    const generateSpan = (minute) => {
                      const time = `${hour}:${minute}`

                      if (bookedTimes.includes(time)) {
                        return (
                          <span key={crypto.randomUUID()} className={`tableData flex items-center h-[40px] w-full text-xs bg-blue-200 rounded z-[3]`} style={{ gridColumn: `span ${entry.bookedSlots} / span ${entry.bookedSlots}` }} title={`${section} ${tn} ${time}`}>
                            <div className="flex flex-nowrap justify-between items-center w-full">
                              <div className={`flex flex-nowrap items-center gap-x-2  h-full`}>
                                <div className="flex items-baseline h-full">
                                  <span className="text-lg h-full mx-[2px] px-1 font-[600]">x{entry.pax}</span>
                                  <span className="text-ellipsis line-clamp-1 font-[600] ml-[2px] text-[16px] leading-8 tracking-tighter h-full" title={entry.name}>
                                    {entry.name}
                                  </span>
                                </div>
                              </div>
                              <div className={`flex flex-nowrap items-center`}>
                                <div className={`${entry.cardConfirmed ? "" : "opacity-[0.2]"} text-lg`} title={`Card Confirmation: ${entry.cardConfirmed}`}>
                                  💳
                                </div>
                                <div className={`${entry.message ? "" : "opacity-[0.2]"} text-lg`} title={`Message: ${entry.message ? entry.message : "-"}`}>
                                  ✉
                                </div>
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
