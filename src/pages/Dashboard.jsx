import { Fragment, useState } from "react"
import Datepicker from "../comp/Datepicker"

export default function Dashboard() {
  const sections = ["Section1", "Section2", "Section3", "Section4", "Section5"]
  const tables = ["T1", "T2", "T3", "T4", "T5"]

  // operational hours 7:00 -> 23:45
  const hours = Array.from({ length: 17 }, (_, i) => 7 + i)

  const numCols = hours.length * sections.length
  const colWidth = 40
  const totalGridWidth = numCols * colWidth + colWidth

  return (
    <>
      <Datepicker />

      <div className="overflow-auto">
        <div className="grid grid-cols-1" style={{ width: `${totalGridWidth}px` }}>
          <GetWorkingHours hours={hours} totalGridWidth={totalGridWidth} />

          {sections.map((section, index) => {
            return (
              <Fragment key={index}>
                <div className="grid grid-flow-col auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]">
                  <span className="sectionName sticky left-0 z-1 bg-white whitespace-nowrap font-[600]">{section}</span>
                </div>
                <GetTableData hours={hours} section={section} tables={tables} />
              </Fragment>
            )
          })}
        </div>
      </div>
    </>
  )
}

const GetTableData = ({ tables, section, hours }) => {
  return (
    <>
      {tables.map((tn) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            <div className="grid grid-flow-col auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]">
              <span className="tableName sticky left-0 z-1 whitespace-nowrap bg-white">{tn}</span>
              {hours.map((hour, index) => (
                <Fragment key={crypto.randomUUID()}>
                  <span className="tableData text-xs" title={`${section} ${tn} ${hour}:00`}>
                    (data1)
                  </span>
                  <span className="tableData text-xs" title={`${section} ${tn} ${hour}:15`}>
                    (data2)
                  </span>
                  <span className="tableData text-xs" title={`${section} ${tn} ${hour}:30`}>
                    (data3)
                  </span>
                  <span className="tableData text-xs" title={`${section} ${tn} ${hour}:45`}>
                    (data4)
                  </span>
                </Fragment>
              ))}
            </div>
          </Fragment>
        )
      })}
    </>
  )
}

const GetWorkingHours = ({ totalGridWidth, hours }) => {
  return (
    <div className="grid grid-flow-col sticky top-0 z-[2] bg-white auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]" style={{ width: `${totalGridWidth}px` }}>
      <span></span>
      {hours.map((hour) => (
        <Fragment key={hour}>
          <span className="font-bold sticky top-0 w-[20px] whitespace-nowrap">
            {hour}
            <span className="text-[10px] font-normal">:00</span>
          </span>
          <span className="font-thin sticky top-0 w-[20px]">15</span>
          <span className="font-thin sticky top-0 w-[20px]">30</span>
          <span className="font-thin sticky top-0 w-[20px]">45</span>
        </Fragment>
      ))}
    </div>
  )
}
