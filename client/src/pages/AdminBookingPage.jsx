import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import AdminPage from "./AdminPage";
export default function AdminBookingPage() {
  const getCurrentDateInput = (date) => {
    const dateObj = new Date(date);

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [user, setUser] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    axios.get("/admin-bookings/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setPlace(data.place);
      setUser(data.user);
      setCheckIn(getCurrentDateInput(data.checkIn));
      setCheckOut(getCurrentDateInput(data.checkOut));
      setPrice(data.price);
    });
  }, [id]);
  if (redirect) {
    return <Navigate to={"/admin"} />;
  }
  async function saveBooking(ev) {
    const bookingData = {
      name,
      place,
      user,
      checkIn,
      checkOut,
      price,
    };
    ev.preventDefault();
    await axios.put("/admin-bookings", {
      id,
      ...bookingData,
    });
    setRedirect(true);
  }
  async function deleteUser(ev) {
    ev.preventDefault();
    await axios.delete("/admin-bookings/" + id);
    setRedirect(true);
  }

  return !checkIn ? (
    <></>
  ) : (
    <div>
      <div>
        <AdminPage />
      </div>
      <form className="mt-10" onSubmit={saveBooking}>
        <div className="flex gap-4 items-center">
          <h2 className="text-xl">Place id:</h2>
          <input type="text" value={place} />
        </div>
        <div className="flex gap-4 items-center mt-2">
          <h2 className="text-xl">User id:</h2>
          <input type="text" value={user} />
        </div>
        <div className="flex gap-4 items-center">
          <h2 className="text-xl">Check in22:</h2>
          <input
            className="border rounded-2xl p-2"
            type="date"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
          <h2>Check out:</h2>
          <input
            className="border rounded-2xl p-2"
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <h2>Name:</h2>
          <input type="text" value={name} />
        </div>
        <div className="flex gap-4 items-center">
          <h2>Price</h2>
          <input type="number" value={price} />
        </div>

        <div className="flex gap-2 mt-2">
          <button className="primary">Save</button>
          <button
            className="bg-red-500  w-full text-white rounded-2xl"
            onClick={deleteUser}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
