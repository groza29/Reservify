import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[1];

  console.log(subpage);
  const noHeader = [
    "admin",
    "/admin/bookings",
    "/admin/places",
    "admin/user/${id}",
  ];
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      {noHeader.includes(subpage) ? null : <Header />}
      <Outlet />
    </div>
  );
}
