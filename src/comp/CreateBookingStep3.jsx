import { useState } from "react";
import cardValidator from "card-validator-utils";

export default function CreateBookingStep3({ progThreeValues, setProgThreeValues }) {
  const [modal, setModal] = useState(false);

  const validDate = () => {
    if (String(progThreeValues.expiry).length <= 3) return false;
    if (String(progThreeValues.expiry).length === 4 && !isDateInFuture(String(progThreeValues.expiry.substring(0, 2) + "/20" + progThreeValues.expiry.substring(2, 4)))) return false;
    if (String(progThreeValues.expiry).length === 5 && !isDateInFuture(String(progThreeValues.expiry.substring(0, 2) + "/20" + progThreeValues.expiry.substring(3, 5)))) return false;
    return true;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="ml-auto px-2 py-1 border-2 rounded-lg border-b-orange-400 w-fit active:scale-[.9] transition" onClick={() => setProgThreeValues((prev) => ({ cn: "", expiry: "", cvv: "" }))}>
        Clear form
      </div>
      <p className="text-lg font-[600] mb-4">Card confirmation</p>
      {/* stop looking. obviously i wouldnt just let the card details in plain text...lol. whould have crypted the data or better again, set a stripe card validation so no payment data can be leaked 😉 */}
      <div className="relative w-full grid grid-cols-1">
        <p>Card Number</p>
        <input value={progThreeValues.cn} onChange={(e) => setProgThreeValues((prev) => ({ ...prev, cn: e.target.value }))} className={`rounded border-2 px-2 py-1 ${cardValidator.detectCardType(progThreeValues.cn) !== "invalid" ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"}`} name="credit-number" type="tel" pattern="\d*" maxLength="19" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>Expiry</p>
        <input value={progThreeValues.expiry} onChange={(e) => setProgThreeValues((prev) => ({ ...prev, expiry: e.target.value }))} className={`rounded border-2 px-2 py-1 ${validDate() ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"}`} name="credit-expires" type="tel" pattern="\d*" maxLength="5" placeholder="..." />
      </div>
      <div className="relative w-full grid grid-cols-1">
        <p>CVV</p>
        <input value={progThreeValues.cvv} onChange={(e) => setProgThreeValues((prev) => ({ ...prev, cvv: e.target.value }))} className={`rounded border-2 px-2 py-1 ${cardValidator.validateCVVORCVCCode(progThreeValues.cvv) ? "border-green-400 outline-green-400" : "border-red-400 outline-red-400"}`} name="credit-cvc" type="tel" pattern="\d*" maxLength="4" placeholder="..." />
      </div>
      <div className="my-2 px-1" onClick={() => setModal(!modal)}>
        You accept and commit to following our <span className="underline text-orange-400 cursor-pointer">Terms & Conditions</span> by using this service.
      </div>
      {modal && (
        <div onClick={() => setModal(!modal)} className="absolute animate-fadeIN bg-black/40 inset-0 overflow-hidden px-4 cursor-pointer">
          <ol className="overflow-y-auto overflow-x-hidden bg-white absolute inset-2 p-2 flex flex-col gap-4">
            <li>
              <strong>Card Details for Larger Groups:</strong> For tables with more than four covers, we require credit/debit card details. No charges will be made if booking terms are met.
            </li>
            <li>
              <strong>No-Show Fee:</strong> If you do not honor your booking, a no-show fee of £10 per person will be charged.
            </li>
            <li>
              <strong>Changes in Party Numbers:</strong> If there are changes in party numbers, we require 24 hours notice. Changes made before 24 hours have no charge. A £10 per person charge applies if terms are not met.
            </li>
            <li>
              <strong>Management Discretion:</strong> Management reserves the right to waive fees at their discretion.
            </li>
            <li>
              <strong>Late Arrivals:</strong> If you&apos;re running late, please call the restaurant directly. Tables more than 15 minutes late during busy periods will be treated as a no-show unless you contact us.
            </li>
            <li>
              <strong>Cancellation:</strong> If you need to cancel your booking, please call us.
            </li>
          </ol>
        </div>
      )}
    </form>
  );
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