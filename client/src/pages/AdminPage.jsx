import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../AdminNav";

export default function AdminPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  if (!ready) {
    return "loading...";
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (ready && user.email === "admin@gmail.com") {
    return (
      <>
        <header className="flex justify-between gap-3">
          <div className="flex items-center">
            <Link to={"/"} href="" className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8 -rotate-90"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
              <span className="font-bold text-xl">Reservify</span>{" "}
            </Link>
          </div>
          <Link to={"/admin"} className="flex items-center">
            <h2 className="text-3xl text-primary mr-5">Admin Dashboard</h2>
          </Link>
          <div>
            <button onClick={logout} className="primary max-w-sm p-5  mr-5">
              Log out
            </button>
          </div>
        </header>
        <div>
          <AdminNav />
        </div>
      </>
    );
  }
}
