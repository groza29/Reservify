/* eslint-disable react/prop-types */
export default function BookingWidget({ place }) {
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
              <input type="date" />
            </div>
            <div className=" py-3 px-3 border-l">
              <label>Check out:</label>
              <input type="date" />
            </div>
          </div>
          <div className=" py-3 px-3 border-t">
            <label>No of guests:</label>
            <input type="number" value={place.maxGuests} />
          </div>
        </div>
        <button className="primary mt-4">Book this place</button>
      </div>
    </>
  );
}
