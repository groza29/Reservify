/* eslint-disable react/prop-types */
import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover min-w-full max-h-32";
  }
  return <Image className={className} src={place.photos[index]} alt="" />;
}
