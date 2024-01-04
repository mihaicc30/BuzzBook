import { createContext, useEffect, useState } from "react"
import Paths from "./comp/Paths"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient()
export const AppContext = createContext()

export default function App() {
  const [contextValues, setContextValues] = useState({
    venueID: "z8HO7t6ro8gcRoA9mfUH",
    // date: new Date().toLocaleDateString("en-GB"),
    // modalData: {
    //   name: "Silvester Stalone",
    //   phone: "1123412341",
    //   message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    //   pax: 4,
    //   date: "30/12/2023",
    //   made: "By Phone",
    //   startTime: "7:15",
    //   bookedSlots: "5",
    //   email: "someemail@com",
    //   assignedSlot: {
    //     Bar: {
    //       T10: {
    //         bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //         startTime: "7:15",
    //         bookedSlots: "5",
    //       },
    //     },
    //   },
    //   bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //   cardConfirmed: false,
    //   status: {
    //     status: "Expected",
    //     reason: "",
    //   },
    //   id: "someRandomID1",
    //   modalData: {
    //     cardConfirmed: false,
    //     email: "someemail@com",
    //     id: "someRandomID1",
    //     bookedSlots: "5",
    //     message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    //     name: "Silvester Stalone1",
    //     status: {
    //       status: "Expected",
    //       reason: "",
    //     },
    //     startTime: "7:15",
    //     assignedSlot: {
    //       Bar: {
    //         T10: {
    //           bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //           bookedSlots: "5",
    //           startTime: "7:15",
    //         },
    //       },
    //     },
    //     date: "30/12/2023",
    //     phone: "1123412341",
    //     made: "By Phone",
    //     bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //     pax: 4,
    //   },
    // },
    // modalUpdateDetails: [
    //   "bookingDetails",
    //   {
    //     name: "Silvester Stalone",
    //     phone: "1123412341",
    //     message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    //     pax: 4,
    //     date: "30/12/2023",
    //     made: "By Phone",
    //     startTime: "7:15",
    //     bookedSlots: "5",
    //     email: "someemail@com",
    //     assignedSlot: {
    //       Bar: {
    //         T10: {
    //           bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //           startTime: "7:15",
    //           bookedSlots: "5",
    //         },
    //       },
    //     },
    //     bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //     cardConfirmed: false,
    //     status: {
    //       status: "Expected",
    //       reason: "",
    //     },
    //     id: "someRandomID1",
    //     modalData: {
    //       cardConfirmed: false,
    //       email: "someemail@com",
    //       id: "someRandomID1",
    //       bookedSlots: "5",
    //       message: "Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message Some message ! Hope you got it!",
    //       name: "Silvester Stalone1",
    //       status: {
    //         status: "Expected",
    //         reason: "",
    //       },
    //       startTime: "7:15",
    //       assignedSlot: {
    //         Bar: {
    //           T10: {
    //             bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //             bookedSlots: "5",
    //             startTime: "7:15",
    //           },
    //         },
    //       },
    //       date: "30/12/2023",
    //       phone: "1123412341",
    //       made: "By Phone",
    //       bookedTimes: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30"],
    //       pax: 4,
    //     },
    //   },
    // ],

  })

  const updateContext = (newValues) => {
    setContextValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }))
  }

  // useEffect(() => {
  //   console.log(">>>> ", contextValues)
  // }, [contextValues])

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ ...contextValues, updateContext }}>
        <Paths />
      </AppContext.Provider>
    </QueryClientProvider>
  )
}

// const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth);

// const isZooming = () => {
//   const newPixelRatio = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
//   if (newPixelRatio !== pixelRatio) {
//     setPixelRatio(newPixelRatio);
//     console.log('Zooming');
//   } else {
//     console.log('Just resizing');
//   }
// };

// useEffect(() => {
//   const handleResize = () => isZooming();
//   const handleOrientationChange = () => isZooming();

//   window.addEventListener('resize', handleResize);
//   window.addEventListener('orientationchange', handleOrientationChange);

//   return () => {
//     window.removeEventListener('resize', handleResize);
//     window.removeEventListener('orientationchange', handleOrientationChange);
//   };
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [pixelRatio]);
