import React, { Fragment, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

export default function Dashboard() {
  const [value, onChange] = useState(new Date());
  const hours = generateHoursArray();
  const sections = ["Section1", "Section2", "Section3", "Section4", "Section5"];
  const numCols = hours.length * sections.length;
  const colWidth = 40; // Adjust based on your layout
  const totalGridWidth = numCols * colWidth + colWidth;

  // Helper function to generate hours array
  function generateHoursArray() {
    return Array.from({ length: 17 }, (_, i) => 7 + i);
  }

  // each section has a set of tables
  const tables = ["T1", "T2", "T3", "T4", "T5"];

  return (
    <>
      <div className="flex justify-center flex-col mx-auto">
        <DatePicker
          onChange={onChange}
          value={value}
        />
        <div>
          <span>Total Bookings XX</span> - <span>Total Covers: XX</span>
        </div>
      </div>

      <div className="overflow-auto">
        <div
          className="grid grid-cols-1"
          style={{ width: `${totalGridWidth}px` }}
        >
          <GetWorkingHours totalGridWidth={totalGridWidth} />

          {sections.map((section, index) => {
            return (
              <Fragment key={index}>
                <div className="grid grid-flow-col auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]">
                  <span className="sectionName sticky left-0 z-1 bg-white whitespace-nowrap font-[600]">{section}</span>
                  {generateHoursArray().map((_) => (
                    <Fragment key={crypto.randomUUID()}>
                      <span className="tableNullPlaceholder"></span>
                      <span className="tableNullPlaceholder"></span>
                      <span className="tableNullPlaceholder"></span>
                      <span className="tableNullPlaceholder"></span>
                    </Fragment>
                  ))}
                </div>
                <GetTableData tables={tables} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

const GetTableData = ({ tables }) => {
  const generateHoursArray = () => {
    const hours = [];
    for (let hour = 7; hour <= 23; hour++) {
      hours.push(hour);
    }
    return hours;
  };

  // each hour has 4 data entries

  return (
    <>
      {tables.map((tn) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            <div className="grid grid-flow-col auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]">
              <span className="tableName sticky left-0 z-1 whitespace-nowrap bg-white">{tn}</span>
              {generateHoursArray().map((_) => (
                <Fragment key={crypto.randomUUID()}>
                  <span className="tableData text-xs">(data1)</span>
                  <span className="tableData text-xs">(data2)</span>
                  <span className="tableData text-xs">(data3)</span>
                  <span className="tableData text-xs">(data4)</span>
                </Fragment>
              ))}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

const GetWorkingHours = ({ totalGridWidth }) => {
  const generateHoursArray = () => {
    const hours = [];
    for (let hour = 7; hour <= 23; hour++) {
      hours.push(hour);
    }
    return hours;
  };

  return (
    <div
      className="grid grid-flow-col sticky top-0 z-[2] bg-white auto-cols-[50px] h-12 items-center border-b-2 border-b-black/[2%]"
      style={{ width: `${totalGridWidth}px` }}
    >
      <span></span>
      {generateHoursArray().map((hour) => (
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
  );
};
