import React, { useContext, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import { AppContext } from "../App";
import { IoMdSearch } from "react-icons/io";
import { IoCloudOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ModalUpdateDetails() {
  const { venueID, venueLayout, date, updateContext, contextBookings, contextCovers, modalData, modalUpdateDetails } = useContext(AppContext);

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

  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const mainModalRef = useRef(null);
  const waitTimer = useRef(null);

  if (!modalUpdateDetails) return;

  const handleChange = (param, value) => {
    // todo - tempContext object to refactor. temporary use case
    // for now will do so that the AppContext does not need an extra rendering
    try {
      setLoading(true);
      let tempContext = modalUpdateDetails;
      // bookedSlots
      if (param === "bookedSlots") {
        let tempSection = Object.keys(modalUpdateDetails[1].assignedSlot)[0];

        let tempTable = Object.keys(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0];

        let tempTimes = tempContext[1].assignedSlot[tempSection][tempTable];

        tempTimes.bookedSlots = value;
        tempTimes.bookedTimes = generateTimeList(value, tempTimes.startTime);

        tempContext[1].assignedSlot[tempSection][tempTable] = tempTimes;
        modalUpdateDetails[1].assignedSlot[tempSection][tempTable] = tempTimes;
      } else if (param === "startTime") {
        let tempSection = Object.keys(modalUpdateDetails[1].assignedSlot)[0];

        let tempTable = Object.keys(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0];

        let tempTimes = tempContext[1].assignedSlot[tempSection][tempTable];

        tempTimes.startTime = value;
        tempTimes.bookedTimes = generateTimeList(tempTimes.bookedSlots, value);

        tempContext[1].assignedSlot[tempSection][tempTable] = tempTimes;
        modalUpdateDetails[1].assignedSlot[tempSection][tempTable] = tempTimes;
      } else if (param === "section") {
        if (modalUpdateDetails[0] === "unassignedSlot") {
          let tempAssignedSlot = {
            [value]: {
              [Object.values(Object.keys(venueLayout[value]))[0]]: {
                startTime: modalUpdateDetails[1].desiredStartTime,
                bookedSlots: "5",
                bookedTimes: generateTimeList("5", modalUpdateDetails[1].desiredStartTime),
              },
            },
          };
          updateContext({
            modalUpdateDetails: [
              modalUpdateDetails[0],
              {
                ...modalUpdateDetails[1],
                assignedSlot: {
                  ...tempAssignedSlot,
                },
              },
            ],
          });
          tempContext = [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              assignedSlot: {
                ...tempAssignedSlot,
              },
            },
          ];
        } else {
          let tempTimes = Object.values(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0];
          let tempTableAvailableSelection = venueData.layout[value];
          let tempAS = {
            [value]: {
              [Object.keys(tempTableAvailableSelection)[0]]: {
                ...tempTimes,
              },
            },
          };

          updateContext({
            modalUpdateDetails: [
              modalUpdateDetails[0],
              {
                ...modalUpdateDetails[1],
                assignedSlot: {
                  ...tempAS,
                },
              },
            ],
          });
          tempContext = [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              assignedSlot: {
                ...tempAS,
              },
            },
          ];
        }
      } else if (param === "table") {
        let tempTimes = Object.values(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0];
        let tempSection = Object.keys(modalUpdateDetails[1].assignedSlot)[0];
        let tableChangedTo = {
          [value]: { ...tempTimes },
        };
        let tempAS = {
          [tempSection]: { ...tableChangedTo },
        };

        updateContext({
          modalUpdateDetails: [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              assignedSlot: tempAS,
            },
          ],
        });
        tempContext = [
          modalUpdateDetails[0],
          {
            ...modalUpdateDetails[1],
            assignedSlot: {
              ...tempAS,
            },
          },
        ];
      } else if (param === "status") {
        updateContext({
          modalUpdateDetails: [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              status: {
                ...modalUpdateDetails[1].status,
                [param]: value,
              },
            },
          ],
        });
        tempContext = [
          modalUpdateDetails[0],
          {
            ...modalUpdateDetails[1],
            status: {
              ...modalUpdateDetails[1].status,
              [param]: value,
            },
          },
        ];
      } else if (param === "messageDelete") {
        updateContext({
          modalUpdateDetails: [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              [param]: "",
            },
          ],
        });
        tempContext = [
          modalUpdateDetails[0],
          {
            ...modalUpdateDetails[1],
            [param]: "",
          },
        ];
      } else {
        updateContext({
          modalUpdateDetails: [
            modalUpdateDetails[0],
            {
              ...modalUpdateDetails[1],
              [param]: value,
            },
          ],
        });

        tempContext = [
          modalUpdateDetails[0],
          {
            ...modalData,
            [param]: value,
          },
        ];
      }

      clearTimeout(waitTimer.current);
      waitTimer.current = setTimeout(async () => {
        const entryID = modalUpdateDetails[1].id;
        const q = await query(collection(db, "bookings"), where("venueNdate", "==", `${venueID} ${date}`));

        const docx = await getDocs(q);
        const docRef = doc(db, "bookings", docx.docs[0].id);
        let updatedData = docx.docs[0].data();

        const updatedBookingIndex = updatedData.bookings.findIndex((booking) => booking.id === entryID);
        if (updatedBookingIndex !== -1) {
          updateContext({
            modalData: {
              ...updatedData.bookings[updatedBookingIndex],
              ...tempContext[1],
            },
          });
          updatedData.bookings[updatedBookingIndex] = {
            ...updatedData.bookings[updatedBookingIndex],
            ...tempContext[1],
          };
        }
        await updateDoc(docRef, updatedData, { merge: true });
        clearTimeout(waitTimer.current);
        setLoading(false);
      }, 1500);
    } catch (error) {
      clearTimeout(waitTimer.current);
      setLoading(false);
      alert(error.message);
      console.log(error.message);
    }
  };

  const timeOptions = formatTimeForSelect();

  return (
    <div
      onClick={(e) => {
        if (e.target.className === mainModalRef.current.className) {
          setFadeOut(true);
          setTimeout(() => {
            updateContext({ modalUpdateDetails: false });
          }, 400);
        }
      }}
      ref={mainModalRef}
      className={`absolute flex justify-end items-center  h-[100svh] w-[100svw] z-20 overflow-hidden transition ${fadeOut ? "animate-fadeOUT" : "animate-fadeIN"}`}>
      <div className={`relative flex flex-col h-[100svh] w-[50svw] max-sm:w-[80svw] min-w-[280px] z-30 bg-white overflow-y-auto overflow-x-hidden transition ${fadeOut ? "animate-fadeLeftToRight" : "animate-fadeRightToLeft"} `}>
        <div className="flex flex-nowrap gap-x-2 items-center justify-between overflow-hidden min-h-[46px]">
          <div
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => {
                updateContext({ modalUpdateDetails: false });
              }, 400);
            }}
            className="flex flex-nowrap items-center p-2 active:scale-[.9] transition cursor-pointer">
            <span>
              <FaAngleLeft className="text-3xl" />
            </span>
            <span>
              <FaAngleLeft className="text-3xl" />
            </span>
            <span className="text-lg font-[600]">Booking Overview</span>
          </div>
          <div>
            {loading && (
              <div className="flex flex-col flex-nowrap whitespace-nowrap gap-x-2 p-1">
                <div className="flex items-center ">
                  <IoCloudOutline />
                  Saving...
                </div>
                <span className="bg-gradient-to-r from-red-400 to-blue-400 w-full h-2  rounded-full transition animate-hueRotate"></span>
              </div>
            )}
          </div>
        </div>
        {modalUpdateDetails[0] === "userDetails" && (
          <div className="grid grid-cols-1 px-4 gap-8 relative pb-[20svh]">
            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempName">
                Name
              </label>
              <input type="text" id="modalTempName" value={modalUpdateDetails[1].name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="flex flex-col gap-x-2 capitalize break-all">
              <label className="border-b-2" htmlFor="modalTempPhone">
                Phone
              </label>
              <input type="text" id="modalTempPhone" value={modalUpdateDetails[1].phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempEmail">
                Email
              </label>
              <input type="text" id="modalTempEmail" value={modalUpdateDetails[1].email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempMessage">
                Message
              </label>
              <div className="flex flex-nowrap w-[100%] relative">
                <IoMdSearch className="absolute top-1/2 -translate-y-1/2 left-[10px]" />
                <input className="py-2 px-10 w-[100%] mx-auto my-2 bg-white" type="text" id="modalTempMessage" value={modalUpdateDetails[1].message} onChange={(e) => handleChange("message", e.target.value)} />
                <TiDelete onClick={(e) => handleChange("messageDelete")} className="absolute top-1/2 -translate-y-1/2 right-[10px] p-2 text-4xl cursor-pointer active:scale-[.9] transition" />
              </div>
            </div>
          </div>
        )}

        {modalUpdateDetails[0] === "bookingDetails" && (
          <div className="grid grid-cols-1 px-4 gap-8 relative pb-[20svh]">
            <div className="flex flex-col gap-x-2 capitalize bg-gray-200 text-gray-400">
              <label className="border-b-2" htmlFor="modalTempDate">
                Date
              </label>
              <p>{modalUpdateDetails[1].date}</p>
              {/* <input type="date" id="modalTempDate" value={formatDate(modalUpdateDetails[1].date)} onChange={(e) => handleChange("date", e.target.value)} /> */}
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempStatus">
                Status
              </label>
              <select id="modalTempStatus" value={modalUpdateDetails[1].status.status} onChange={(e) => handleChange("status", e.target.value)}>
                <option value="Expected">Expected</option>
                <option value="Canceled">Canceled</option>
                <option value="No Show">No Show</option>
              </select>
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempCovers">
                Covers
              </label>
              <input type="number" id="modalTempCovers" value={modalUpdateDetails[1].pax} onChange={(e) => handleChange("pax", e.target.value)} />
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempSection">
                Section
              </label>
              <select id="modalTempSection" defaultValue={null} onChange={(e) => handleChange("section", e.target.value)}>
                {( Object.keys(venueData?.layout).length > 0 || Object.keys(venueLayout).length > 0) &&
                  Object.keys(venueData.layout)
                    .sort()
                    .map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
              </select>
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempTable">
                Table
              </label>
              <select id="modalTempTable" defaultValue={null} onChange={(e) => handleChange("table", e.target.value)}>
                {Object.keys(modalUpdateDetails[1].assignedSlot)[0] &&
                  Object.keys(venueData?.layout[Object.keys(modalUpdateDetails[1].assignedSlot)[0]])
                    .sort()
                    .map((tableKey) => (
                      <option key={tableKey} value={tableKey}>
                        {tableKey}
                      </option>
                    ))}
              </select>
            </div>
            <div className="flex flex-col gap-x-2 capitalize break-all">
              <label className="border-b-2" htmlFor="modalTempStartTime">
                Arrival
              </label>

              <select id="modalTempStartTime" value={modalUpdateDetails[1].assignedSlot[Object.keys(modalUpdateDetails[1].assignedSlot)[0]][Object.keys(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0]].startTime} onChange={(e) => handleChange("startTime", e.target.value)}>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-x-2 capitalize break-all">
              <label className="border-b-2" htmlFor="modalTempbookedSlots">
                Allocated time
              </label>

              <select id="modalTempbookedSlots" value={modalUpdateDetails[1].assignedSlot[Object.keys(modalUpdateDetails[1].assignedSlot)[0]][Object.keys(Object.values(modalUpdateDetails[1].assignedSlot)[0])[0]].bookedSlots} onChange={(e) => handleChange("bookedSlots", e.target.value)}>
                <option value={1}>15min</option>
                <option value={2}>30min</option>
                <option value={3}>45min</option>
                <option value={4}>1h</option>
                <option value={5}>1h 15min</option>
                <option value={6}>1h 30min</option>
                <option value={7}>1h 45min</option>
                <option value={8}>2h</option>
                <option value={9}>2h 15min</option>
                <option value={10}>2h 30min</option>
                <option value={11}>2h 45min</option>
                <option value={12}>3h</option>
              </select>
            </div>
          </div>
        )}

        {modalUpdateDetails[0] === "unassignedSlot" && (
          <div className="grid grid-cols-1 px-4 gap-8 relative pb-[20svh]">
            <div className="flex flex-nowarp items-center gap-x-2 capitalize col-span-full mt-2">
              <p className="italic text-sm font-[600]">
                {modalUpdateDetails[1].name} looking to book at {modalUpdateDetails[1].desiredStartTime}
              </p>
            </div>
            <div className="flex flex-nowarp items-center gap-x-2 capitalize col-span-full ">
              <p className="italic text-sm ">{modalUpdateDetails[1].message}</p>
            </div>

            <div className="flex flex-col gap-x-2 capitalize bg-gray-200 text-gray-400">
              <label className="border-b-2" htmlFor="modalTempDate">
                Date
              </label>
              <p>{modalUpdateDetails[1].date}</p>
              {/* <input type="date" id="modalTempDate" value={formatDate(modalUpdateDetails[1].date)} onChange={(e) => handleChange("date", e.target.value)} /> */}
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempStatus">
                Status
              </label>
              <select id="modalTempStatus" value={modalUpdateDetails[1].status.status} onChange={(e) => handleChange("status", e.target.value)}>
                <option value="Expected">Expected</option>
                <option value="Canceled">Canceled</option>
                <option value="No Show">No Show</option>
              </select>
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempCovers">
                Covers
              </label>
              <input type="number" id="modalTempCovers" value={modalUpdateDetails[1].pax} onChange={(e) => handleChange("pax", e.target.value)} />
            </div>

            <div className="flex flex-col gap-x-2 capitalize">
              <label className="border-b-2" htmlFor="modalTempSection">
                Section
              </label>
              <select id="modalTempSection" defaultValue={""} onChange={(e) => handleChange("section", e.target.value)}>
                <option className="text-gray-300" value={""} disabled>
                  -Select an option-
                </option>
                {Object.keys(venueLayout)
                  .sort()
                  .map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
              </select>
            </div>

            {modalUpdateDetails[1].assignedSlot && (
              <div className="flex flex-col gap-x-2 capitalize">
                <label className="border-b-2" htmlFor="modalTempTable">
                  Table
                </label>
                <select id="modalTempTable" defaultValue={""} onChange={(e) => handleChange("table", e.target.value)}>
                  <option className="text-gray-300" value={""} disabled>
                    -Select an option-
                  </option>
                  {Object.keys(venueLayout[Object.keys(modalUpdateDetails[1].assignedSlot)[0]])
                    .sort()
                    .map((tableKey) => (
                      <option key={tableKey} value={tableKey}>
                        {tableKey}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className="flex flex-col gap-x-2 capitalize break-all">
              <label className="border-b-2" htmlFor="modalTempStartTime">
                Arrival
              </label>

              <select id="modalTempStartTime" defaultValue={modalUpdateDetails[1].desiredStartTime} onChange={(e) => handleChange("startTime", e.target.value)}>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-x-2 capitalize break-all">
              <label className="border-b-2" htmlFor="modalTempbookedSlots">
                Allocated time
              </label>

              <select id="modalTempbookedSlots" defaultValue={5} onChange={(e) => handleChange("bookedSlots", e.target.value)}>
                <option value={1}>15min</option>
                <option value={2}>30min</option>
                <option value={3}>45min</option>
                <option value={4}>1h</option>
                <option value={5}>1h 15min</option>
                <option value={6}>1h 30min</option>
                <option value={7}>1h 45min</option>
                <option value={8}>2h</option>
                <option value={9}>2h 15min</option>
                <option value={10}>2h 30min</option>
                <option value={11}>2h 45min</option>
                <option value={12}>3h</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// *******************//
// utility functions  //
// *******************//

const formatDate = (inputDate) => {
  const [day, month, year] = inputDate.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const formatTime = (inputTime) => {
  const [hours, minutes] = inputTime.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

function formatTimeForSelect(hours, minutes) {
  const timeOptions = [];
  for (let h = 7; h <= 23; h++) {
    for (let m = 0; m < 60; m += 15) {
      const formattedTime = `${String(h)}:${String(m).padStart(2, "0")}`;
      timeOptions.push(formattedTime);
    }
  }
  return timeOptions;
}

function generateTimeList(slots, startTime) {
  const timeList = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);

  for (let i = 0; i < parseInt(slots); i++) {
    const hour = Math.floor((startMinute + i * 15) / 60) + startHour;
    const minute = (startMinute + i * 15) % 60;

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    timeList.push(formattedTime);
  }

  return timeList;
}
