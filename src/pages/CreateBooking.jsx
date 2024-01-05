import { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import "./CB.css";
import CreateBookingStep1 from "../comp/CreateBookingStep1";
import CreateBookingStep2 from "../comp/CreateBookingStep2";
import CreateBookingStep3 from "../comp/CreateBookingStep3";
import CreateBookingStep4 from "../comp/CreateBookingStep4";
import { phone } from "phone";

import cardValidator from "card-validator-utils";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useSuspenseQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function CreateBooking() {
  const { venue, venueid } = useParams();

  const {
    isPending,
    error,
    data: VID,
  } = useSuspenseQuery({
    queryKey: ["venues", venue, venueid],
    queryFn: async () => {
      const venueData = await query(collection(db, "venues"), where("id", "==", String(venueid)));
      const result = await getDocs(venueData);
      const data = result.docs.map((element) => element.data());
      if (data.length > 0) {
        return data[0];
      } else return [];
    },
  });

  const [progOneValues, setProgOneValues] = useState({
    venueData: VID,
    partySize: 2,
    timeSlot: "",
    dateValue: new Date().toISOString().split("T")[0],
    availability: {
      day1: {
        available: false,
      },
      day2: {
        available: true,
      },
      day3: {
        available: false,
      },
      day4: {
        available: true,
      },
      day5: {
        available: false,
      },
      day6: {
        available: true,
      },
      day7: {
        available: false,
      },
      day8: {
        available: false,
      },
      day9: {
        available: false,
      },
      day10: {
        available: false,
      },
      day11: {
        available: true,
      },
      day12: {
        available: true,
      },
      day13: {
        available: true,
      },
      day14: {
        available: true,
      },
      day15: {
        available: false,
      },
      day16: {
        available: true,
      },
      day17: {
        available: false,
      },
      day18: {
        available: true,
      },
      day19: {
        available: true,
      },
      day20: {
        available: true,
      },
      day21: {
        available: true,
      },
      day22: {
        available: true,
      },
      day23: {
        available: true,
      },
      day24: {
        available: true,
      },
      day25: {
        available: true,
      },
      day26: {
        available: true,
      },
      day27: {
        available: true,
      },
      day28: {
        available: true,
      },
      day29: {
        available: true,
      },
      day30: {
        available: true,
      },
      day31: {
        available: true,
      },
    },
    dayQuery: "",
  });

  const timeOptions = formatTimeForSelect();

  const [progTwoValues, setProgTwoValues] = useState({
    name: "Test User",
    email: "test.user@user.test",
    tel: "+447123123123",
    message: "",
  });

  const [progThreeValues, setProgThreeValues] = useState({
    cn: "4242424242424242",
    expiry: "05/25",
    cvv: "123",
  });
  const [progFourValues, setProgFourValues] = useState({
    loading: false,
  });

  const [progress, setProgress] = useState(1);

  const daysInMonth = getDaysInMonth(getYear(progOneValues), getMonth(progOneValues), getFirstDay(progOneValues.dateValue));

  const handleMonthDateChange = (monthsToAdd) => {
    const currentDate = new Date(progOneValues.dateValue);
    currentDate.setHours(9, 0, 0, 0);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);

    setProgOneValues((prev) => ({ ...progOneValues, dateValue: currentDate.toISOString().split("T")[0] }));
  };

  useEffect(() => {
    setProgOneValues((prev) => ({ ...prev, timeSlot: timeOptions[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const availableDays = Object.keys(progOneValues.availability);

    const firstAvailableDay = availableDays.find((day) => progOneValues.availability[day].available);
    if (firstAvailableDay) {
      setProgOneValues((prev) => ({ ...progOneValues, dayQuery: parseInt(firstAvailableDay.replace("day", "")) }));
    } else {
      setProgOneValues((prev) => ({ ...progOneValues, dayQuery: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progOneValues.dateValue, progOneValues.availability]);

  const isValid = () => {
    switch (progress) {
      case 1:
        return validateProgress1();
      case 2:
        return validateProgress2();
      case 3:
        return validateProgress3();
      case 4:
        return validateProgress4();
      default:
        break;
    }
  };

  const validateProgress1 = () => {
    if (timeOptions.length < 1) return true;

    // disabled == true || false
    return false;
  };

  const validateProgress2 = () => {
    const { name, email, tel, comment } = progTwoValues;

    if (String(name).length < 4) return true;
    if (String(email).length < 4) return true;
    if (String(tel).length < 4) return true;
    // eslint-disable-next-line no-useless-escape
    var testingString = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!testingString.test(email) || String(email).length < 6) return true;

    const testPhone = phone(tel);
    if (!testPhone.isValid) return true;

    // disabled == true || false
    return false;
  };
  const validateProgress3 = () => {
    if (cardValidator.detectCardType(progThreeValues.cn) === "invalid") return true;
    if (!cardValidator.validateCVVORCVCCode(progThreeValues.cvv)) return true;

    // cardValidator.validateExpirationDate is not working as expected
    if (String(progThreeValues.expiry).length <= 3) return true;
    if (String(progThreeValues.expiry).length === 4 && !isDateInFuture(String(progThreeValues.expiry.substring(0, 2) + "/20" + progThreeValues.expiry.substring(2, 4)))) return true;
    if (String(progThreeValues.expiry).length === 5 && !isDateInFuture(String(progThreeValues.expiry.substring(0, 2) + "/20" + progThreeValues.expiry.substring(3, 5)))) return true;

    // disabled == true || false
    return false;
  };
  const validateProgress4 = () => {
    // disabled == true || false
    return true;
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "F9") {
        console.log("progOneValues:", progOneValues);
        console.log("progTwoValues:", progTwoValues);
        console.log("progThreeValues:", progThreeValues);
        console.log("progFourValues:", progFourValues);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [progOneValues, progTwoValues, progThreeValues, progFourValues]);

  const handleNext = () => {
    if (progOneValues.partySize < 4 && progress === 2) {
      setProgress(4);
    } else {
      setProgress((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (progOneValues.partySize < 4 && progress === 4) {
      setProgress(2);
    } else {
      setProgress((prev) => prev - 1);
    }
  };

  function formatTimeForSelect() {
    const timeOptions = [];
    for (let h = 7; h <= 23; h++) {
      for (let m = 0; m < 60; m += 15) {
        const formattedTime = `${String(h)}:${String(m).padStart(2, "0")}`;

        let inputDate = new Date(`${formatDate(progOneValues.dateValue, String(progOneValues.dayQuery).padStart(2, "0"))}`);
        inputDate.setHours(h - 2);
        inputDate.setMinutes(String(m).padStart(2, "0"));
        let currentDate = new Date();

        if (inputDate >= currentDate) {
          timeOptions.push(formattedTime);
        }
      }
    }
    return timeOptions;
  }

  const dateIsInThePast = (theDay) => {
    let currentlyLookedUpDate = `${formatDate(progOneValues.dateValue, String(theDay).padStart(2, "0"))}`;

    const inputDate = new Date(currentlyLookedUpDate);
    const currentDate = new Date();
    inputDate.setHours(currentDate.getHours() + 1);
    inputDate.setMinutes(currentDate.getMinutes());
    inputDate.setSeconds(currentDate.getSeconds());
    return inputDate >= currentDate;
  };

  return (
    <>
      {!progOneValues.venueData.id && (
        <div className="flex flex-col overflow-y-auto px-4 max-w-[700px] mx-auto">
          <p className="text-5xl font-bold text-center mt-[30svh]">Oops...</p>
          <p className="text-center mt-8">Business you are looking to book in is not registred on Buzz Book!</p>
          <p className="text-5xl text-center my-8">😢</p>

          <p className="text-sm text-center mt-20">If you are the developer please get in touch with us.</p>
        </div>
      )}
      {progOneValues.venueData.id && (
        <div className="flex-1 h-[100svh] w-[100svw] mx-auto max-w-[600px] flex flex-col overflow-y-auto gap-y-2 px-1">
          <div className="h-[30px] flex justify-center items-center">
            <img src="../../assets/ic.png" alt="Logo" className="h-auto w-[30px]" />
            <div className="flex flex-col justify-center items-center h-full mt-[8px]">
              <h1 className="text-center text-[1rem] tracking-widest leading-[10px] text-[#181831] ff">Buzz</h1>
              <h1 className="text-center text-[.6rem] tracking-widest leading-[10px] text-[#B74216]">
                <span>-</span>
                <span className="ff">BOOK</span>
                <span>-</span>
              </h1>
            </div>
          </div>
          {progress !== 4 && dateIsInThePast(progOneValues.dayQuery) && <p className="col-span-full italic text-center">{`Looking to book a party of ${progOneValues.partySize} at ${progOneValues.timeSlot} on ${progOneValues.dayQuery} ${new Date(progOneValues.dateValue).toLocaleString("en-GB", { month: "long", year: "numeric" })}.`}</p>}
          {progress === 1 && <CreateBookingStep1 progOneValues={progOneValues} setProgOneValues={setProgOneValues} timeOptions={timeOptions} daysInMonth={daysInMonth} handleMonthDateChange={handleMonthDateChange} />}
          {progress === 2 && <CreateBookingStep2 progTwoValues={progTwoValues} setProgTwoValues={setProgTwoValues} />}
          {progress === 3 && <CreateBookingStep3 progThreeValues={progThreeValues} setProgThreeValues={setProgThreeValues} />}
          {progress === 4 && <CreateBookingStep4 progFourValues={progFourValues} progOneValues={progOneValues} progTwoValues={progTwoValues} progThreeValues={progThreeValues} setProgFourValues={setProgFourValues} />}
          <div className="flex justify-between my-8">
            {!progFourValues.loading && progress !== 1 && (
              <button onClick={handleBack} className={`flex flex-nowrap items-center border-b-2 border-b-orange-400`}>
                <FaAngleLeft className="" />
                Back
              </button>
            )}
            {!progFourValues.loading && progress !== 4 && (
              <button disabled={isValid()} onClick={handleNext} className={`flex flex-nowrap items-center border-b-2 border-b-orange-400 ml-auto  disabled:text-gray-100`}>
                Next <FaAngleRight className="" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const getDaysInMonth = (year, month, dayIndex) => {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: totalDays + dayIndex }, (_, i) => i + 2 - dayIndex);
  return daysArray.map((day) => (day <= 0 ? 0 : day));
};

function getMonth(progOneValues) {
  return new Date(progOneValues.dateValue).getMonth();
}

function getYear(progOneValues) {
  return new Date(progOneValues.dateValue).getFullYear();
}

function isDateInFuture(dateString) {
  const [month, year] = dateString.split("/");
  const inputDate = new Date();
  inputDate.setFullYear(parseInt(year, 10));
  inputDate.setMonth(parseInt(month, 10) - 1);

  // Get the current date
  const currentDate = new Date();
  // Compare the input date with the current date
  return inputDate > currentDate;
}

const getFirstDay = (dateString) => {
  const [year, month] = dateString.split("-");
  // Months in JavaScript are zero-indexed, so we subtract 1 from the month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  return firstDayOfMonth.getDay();
};

const formatDate = (dateString, day) => {
  const [year, month] = dateString.split("-");
  return `${year}-${month}-${day}`;
};
