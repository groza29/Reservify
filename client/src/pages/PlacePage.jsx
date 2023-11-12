/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  return place ? (
    <>
      <div className="mt-4 bg-blue-50 -mx-8 px-8 py-8">
        <h1 className="text-2xl ">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            <b>Check-in:</b>
            {place.checkIn}
            <br />
            <b>Check-out:</b>
            {place.checkOut} <br />
            <b>Max Guests: </b>
            {place.maxGuests} <br />
          </div>
          <div className="">
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-semibold text-xl">Extra Info</h2>
        </div>
        <div className="text-gray-800 text-sm leading-4 mt-4">
          {place.extraInfo}
        </div>
      </div>
    </>
  ) : (
    <>loading...</>
  );
}
