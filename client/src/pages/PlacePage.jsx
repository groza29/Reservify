/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white">
        <div className="p-8 grid gap-4">
          <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-8 top-8 flex gap-2 rounded-2xl p-2 bg-primary text-white shadow-md shadow-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return place ? (
    <>
      <div className="mt-4 bg-blue-50 -mx-8 px-8 py-8">
        <h1 className="text-2xl ">{place.title}</h1>
        <a
          className=" flex gap 1 block font-semibold underline mt-2 mb-4"
          href={"http://maps.google.com/?q=" + place.address}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>

          {place.address}
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
            <div>
              {place.photos?.[0] && (
                <div>
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover cursor-pointer"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="grid">
              {place.photos?.[1] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos[1]}
                  alt=""
                />
              )}
              <div className="overflow-hidden">
                {place.photos?.[2] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover relative top-2 cursor-pointer"
                    src={"http://localhost:4000/uploads/" + place.photos[2]}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl border border-black shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            Show more photos
          </button>
        </div>

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
