import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setnumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  return (
    <>
      {" "}
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-xl text-center">
          Price: {place.price} Ron/per night
        </div>
        <div className="border rounded-2xl my-4">
          <div className="flex">
            <div className="py-3 px-3">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className=" py-3 px-3 border-l">
              <label>Check out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className=" py-3 px-3 border-t">
            <label>No of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setnumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className=" py-3 px-3 border-t grid grid-cols-2">
              <label>Full name:</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
          {numberOfNights > 0 && (
            <span> for Ron {numberOfNights * place.price}</span>
          )}
        </button>
      </div>
    </>
  );
}
