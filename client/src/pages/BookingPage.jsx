import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[1];
  console.log(subpage + " Bookings form");
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      if (subpage === "admin") {
        axios.get("/admin-bookings").then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      } else {
        axios.get("/bookings").then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      }
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-2xl ">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 mb-6 mt-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-2">Your booking informations</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div className="">Total price:</div>
          <div className="text-2xl">{booking.price} Ron</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
