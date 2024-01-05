import { Fragment, useContext, useEffect, useState } from "react";
import Datepicker from "../comp/Datepicker";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AppContext } from "../App";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { GridData } from "../comp/GridData";
import { ListData } from "../comp/ListData";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UnseatedData } from "../comp/UnseatedData";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const [user, loading] = useAuthState(auth);
  const { venueLayout, venueID, venueName, date, updateContext, contextBookings, contextCovers, modalData, modalUpdateDetails, unassignedBookings } = useContext(AppContext);

  useEffect(() => {
    if (!user && !loading) nav("/");
  }, [user, nav, loading]);

  const [viewState, setViewState] = useState("grid");

  const {
    isPending,
    error,
    data: venueData,
  } = useSuspenseQuery({
    queryKey: ["venues", venueID],
    queryFn: async () => {
      const venueData = await query(collection(db, "venues"), where("id", "==", venueID));
      const result = await getDocs(venueData);
      const data = result.docs.map((element) => element.data());
      if (data.length > 0) {
        return data[0];
      } else return [];
    },
  });

  const [values] = useCollectionData(query(collection(db, "bookings"), where("venueNdate", "==", `${venueID} ${date}`)));

  useEffect(() => {
    if (!values) return;
    const bookings = values ? values[0]?.bookings || [] : [];
    if (bookings) {
      const unassignedB = bookings.filter((booking) => !booking.assignedSlot).length;
      const expectedBookings = bookings.filter((booking) => booking.status?.status === "Expected" && booking.assignedSlot);
      const coversSum = expectedBookings.reduce((sum, booking) => sum + (parseInt(booking.pax) || 0), 0);
      if (contextBookings !== expectedBookings.length) updateContext({ contextBookings: expectedBookings.filter((data) => data.assignedSlot).length });
      if (contextCovers !== coversSum) {
        updateContext({ contextCovers: coversSum });
      }
      if (unassignedBookings !== unassignedB) {
        updateContext({ unassignedBookings: unassignedB });
      }
    }

    if (venueLayout !== venueData.layout) updateContext({ venueLayout: venueData.layout });
    // if adding updateContext in dependency it will provoke an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextBookings, contextCovers, values]);

  if (isPending || error) return;

  const sections = Object.keys(venueData?.layout || venueLayout);
  // temp code _ operational hours 7:00 -> 23:45
  const hours = Array.from({ length: 17 }, (_, i) => 7 + i);

  const numCols = hours.length * (sections.length + 1);
  const colWidth = 40;
  const totalGridWidth = numCols * colWidth + colWidth;

  return (
    <>
      <div className={`flex gap-x-2 justify-between`}>
        {/*  */}
        {/* <div className="absolute top-0 left-0 h-[50vh] w-[50vw] bg-gray-200 z-[200] flex flex-col">
          <iframe sandbox="allow-same-origin allow-scripts" src="http://localhost:5173/create-booking" className="flex-1 bg-white"></iframe>
        </div> */}
        {/*  */}

        <div>
          <button onClick={() => setViewState("grid")} className={`px-4 text-sm tracking-wide transition ${viewState === "grid" ? "font-[700] border-b-2 border-b-blue-400" : ""}`}>
            Grid
          </button>
          <button onClick={() => setViewState("list")} className={`px-4 text-sm tracking-wide transition ${viewState === "list" ? "font-[700] border-b-2 border-b-blue-400" : ""}`}>
            List
          </button>
          <button onClick={() => setViewState("unseated")} className={`px-4 text-sm tracking-wide transition ${viewState === "unseated" ? "font-[700] border-b-2 border-b-blue-400" : ""}`}>
            Unseated ({unassignedBookings})
          </button>
        </div>
        <a href={`/create-booking/${venueData.venue}/${venueData.id}`} className={`px-4 text-sm tracking-wide font-[700] border-b-2 border-b-orange-400`}>
          +Booking
        </a>
      </div>
      {viewState === "unseated" && venueData && (
        <>
          <div className="dashboardContent overflow-auto h-full">
            <div className="grid grid-cols-1 auto-rows-max">
              <UnseatedData key={crypto.randomUUID()} venueData={values || []} />
            </div>
          </div>
        </>
      )}

      {viewState === "list" && venueData && (
        <div className="dashboardContent overflow-auto h-full">
          <div className="grid grid-cols-1 auto-rows-max">
            <ListData key={crypto.randomUUID()} venueData={values || []} />
          </div>
        </div>
      )}
      {viewState === "grid" && venueData && (
        <div className="dashboardContent overflow-auto h-full w-full">
          <div className="grid grid-cols-1 auto-rows-max" style={{ width: `${totalGridWidth}px` }}>
            <GetWorkingHoursAndCovers hours={hours} totalGridWidth={totalGridWidth} values={values} />
            {Object.keys(venueData?.layout || venueLayout)
              .sort()
              .map((section, index) => {
                return (
                  <Fragment key={index}>
                    <div className="grid grid-flow-col auto-cols-[40px] h-8 items-center border-b-2 z-[1] border-b-black/[2%] bg-gray-100 " style={{ width: `${totalGridWidth}px` }}>
                      <span className="sectionName sticky left-0 z-[4] whitespace-nowrap font-[600]">{section}</span>
                    </div>
                    <GridData venueData={values} hours={hours} section={section} tables={Object.keys(venueData?.layout[section] || venueLayout[section]).sort()} />
                  </Fragment>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

const GetWorkingHoursAndCovers = ({ totalGridWidth, hours, values }) => {
  // Function to determine whether to show the border or not
  const showBorder = (CT, minTime, maxTime) => {
    const [currentHour, currentMinute] = CT.split(":").map(Number);
    const [minHour, minMinute] = minTime.split(":").map(Number);
    const [maxHour, maxMinute] = maxTime.split(":").map(Number);

    return (currentHour > minHour || (currentHour === minHour && currentMinute >= minMinute)) && (currentHour < maxHour || (currentHour === maxHour && currentMinute < maxMinute));
  };

  // Get the current hour
  const currentTime = new Date().toTimeString().slice(0, 5);

  const { venueID, date, updateContext, contextBookings, contextCovers } = useContext(AppContext);

  if (!values) return;
  const bookings = values ? values[0]?.bookings || [] : [];

  return (
    <div className="grid grid-flow-col sticky top-0 z-[2] bg-white auto-cols-[40px] h-12 items-center border-b-2 border-b-black/[2%]" style={{ width: `${totalGridWidth}px` }}>
      <span></span>
      {hours.map((hour) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            <div className={`flex flex-col font-bold sticky top-0 w-[20px] whitespace-nowrap`}>
              <span>
                {hour}
                <span className="text-[10px] font-normal">:00</span>
              </span>
              <span className="text-[10px] font-normal text-center whitespace-nowrap">( {calculateCovers(hour, "00", bookings)} )</span>
              {showBorder(currentTime, `${hour}:00`, `${hour}:15`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}
            </div>

            <div className="flex flex-col font-thin sticky top-0 w-[20px]">
              {showBorder(currentTime, `${hour}:15`, `${hour}:30`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}
              <span>:15</span>
              <span className="text-[10px] font-normal text-center whitespace-nowrap">( {calculateCovers(hour, "15", bookings)} )</span>
            </div>
            <div className="flex flex-col font-thin sticky top-0 w-[20px]">
              {showBorder(currentTime, `${hour}:30`, `${hour}:45`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}
              <span>:30</span>
              <span className="text-[10px] font-normal text-center whitespace-nowrap">( {calculateCovers(hour, "30", bookings)} )</span>
            </div>
            <div className="flex flex-col font-thin sticky top-0 w-[20px]">
              {showBorder(currentTime, `${hour}:45`, `${hour}:59`) && <span className="absolute bg-red-400/30 w-1 h-[100vh] z-[2]"></span>}
              <span>:45</span>
              <span className="text-[10px] font-normal text-center whitespace-nowrap">( {calculateCovers(hour, "45", bookings)} )</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

// *******************//
// utility functions  //
// *******************//

const calculateCovers = (hour, minute, bookings) => {
  const sum = bookings
    .filter((bookz) => bookz.assignedSlot)
    .reduce((sum, booking) => {
      const timeFrame = `${String(hour).padStart(2, "0")}:${minute}`;
      const assignedSlot = booking.assignedSlot;
      if (!assignedSlot) return sum || 0;
      const slotKeys = Object.keys(assignedSlot);

      const BT = assignedSlot[slotKeys[0]][Object.keys(assignedSlot[slotKeys[0]])[0]]?.bookedTimes || [];
      const status = booking.status?.status === "Expected";

      if (BT && BT.includes(String(timeFrame)) && status) {
        sum += parseInt(booking.pax, 10);
      }

      return sum;
    }, 0);

  return sum;
};
