import React, { useState } from "react";
import { addNewBooking } from "../firebaseConfig";

export default function CreateBookingStep4({ progOneValues, progTwoValues, progThreeValues, progFourValues, setProgFourValues }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setLoading(!loading);
    setProgFourValues({ loading: true });

    try {
      await new Promise((resolve, reject) => {
        setTimeout(async () => {
          let bookedVenue = `${progOneValues.venueData.id} ${String(progOneValues.dayQuery).padStart(2, "0") + "/" + progOneValues.dateValue.split("-")[1] + "/" + progOneValues.dateValue.split("-")[0]}`;
          let newBooking = {
            message: progTwoValues.message || "",
            made: "Booked Online",
            cardConfirmed: parseInt(progOneValues.partySize) > 3 && progThreeValues.cn ? true : false,
            id: crypto.randomUUID(),
            desiredStartTime: progOneValues.timeSlot,
            status: {
              status: "Expected",
              reason: "",
            },
            date: `${progOneValues.dateValue.split("-")[0] + "/" + progOneValues.dateValue.split("-")[1] + "/" + String(progOneValues.dayQuery).padStart(2, "0")}`,
            name: progTwoValues.name || "",
            phone: progTwoValues.tel || "",
            pax: parseInt(progOneValues.partySize),
            email: progTwoValues.email || "",
          };
          const query = await addNewBooking(bookedVenue, newBooking);
          console.log("🚀 ~ file: CreateBookingStep4.jsx:32 ~ setTimeout ~ query:", query);
          if (!String(query).startsWith("success")) setError(query);
          resolve(setSubmitted(true));
        }, 4000);
      });
    } catch (error) {
      setLoading(false);
      setProgFourValues({ loading: false });
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      {submitted && !error && (
        <>
          <p className="text-center font-[600]">Thank You for using Buzz Book!</p>

          <p className="my-4">Thank you for choosing our services. Your booking has been successfully processed and is currently being forwarded for confirmation. If you have selected email confirmation, kindly anticipate receiving it shortly. We appreciate your business and look forward to serving you.</p>
        </>
      )}
      {!submitted && !error && (
        <>
          <div>
            <p className="text-lg font-[600]">To sum up</p>

            {/* <p className="col-span-full ">{`Party of: ${progOneValues.partySize} at ${progOneValues.timeSlot} on ${progOneValues.dayQuery} ${new Date(progOneValues.dateValue).toLocaleString("en-GB", { month: "long", year: "numeric" })} under the name ${progTwoValues.name}.`}</p>  */}

            <div className="grid grid-cols-2 w-fit mx-auto">
              <span className="h-[1px] bg-black/20 rounded-full col-span-full my-2"></span>
              <span className="">Party</span>
              <span className="px-2"> {progOneValues.partySize}</span>
              <span>Time</span>
              <span className="px-2"> {progOneValues.timeSlot}</span>
              <span>Date</span>
              <span className="px-2"> {`${String(progOneValues.dayQuery).padStart(2, "0")}-${formatDate(progOneValues.dateValue)}`}</span>
              <span className="h-[1px] bg-black/20 rounded-full col-span-full my-2"></span>

              <span className="">Name</span>
              <span className="px-2"> {progTwoValues.name}</span>
              <span>Email</span>
              <span className="px-2"> {progTwoValues.email}</span>
              <span>Phone</span>
              <span className="px-2"> {progTwoValues.tel}</span>
              <span className="h-[1px] bg-black/20 rounded-full col-span-full my-2"></span>

              <span className="">Comments</span>
              <span className="px-2"> {progTwoValues.message ? progTwoValues.message : "-"}</span>
              <span className="h-[1px] bg-black/20 rounded-full col-span-full my-2"></span>

              {progOneValues.partySize > 3 && (
                <>
                  <span className="">Card</span>
                  <span className="px-2">Validated</span>
                  <span className="h-[1px] bg-black/20 rounded-full col-span-full my-2"></span>
                </>
              )}

              <button onClick={handleSubmit} className={`col-span-full px-4 py-2 mt-4 border-y-2 transition duration-500 ${loading ? "" : " border-orange-500"} w-fit mx-auto rounded-xl transition`}>
                {loading && (
                  <>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".1s" }}>
                      L
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".2s" }}>
                      o
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".3s" }}>
                      a
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".4s" }}>
                      d
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".5s" }}>
                      i
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".6s" }}>
                      n
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".7s" }}>
                      g
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".8s" }}>
                      .
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: ".9s" }}>
                      .
                    </span>
                    <span className="animate-fadeINinfinite " style={{ animationDelay: "1s" }}>
                      .
                    </span>
                  </>
                )}
                {!loading && "Submit"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${month}-${year}`;
};
