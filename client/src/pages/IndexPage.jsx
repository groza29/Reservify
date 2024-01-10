/* eslint-disable react/jsx-key */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const { searchInput } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-col-2 md:grid-cols-3 lg:grid-col-4">
      {places.length > 0 &&
        places
          .filter((place) => place.title.match(searchInput))
          .map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>

              <img src="" alt="" />
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">{place.price}RON </span>
                per night
              </div>
            </Link>
          ))}
    </div>
  );
}
