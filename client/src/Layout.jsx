import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const noHeader = ["/admin", "/admin/bookings", "/admin/places"];
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      {noHeader.includes(location.pathname) ? null : <Header />}
      <Outlet />
    </div>
  );
}
