/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Link, Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import AdminNav from "../AdminNav";

export default function UserFormPage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  if (!id) {
    return;
  }
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/admin-users/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
      setEmail(data.email);
    });
  }, [id]);
  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={"/admin"} />;
  }
  async function saveUser(ev) {
    const userData = {
      name,
      email,
    };
    ev.preventDefault();
    await axios.put("/admin-users", {
      id,
      ...userData,
    });
    setRedirect(true);
  }
  async function deleteUser(ev) {
    ev.preventDefault();
    await axios.delete("/admin-users/" + id);
    setRedirect(true);
  }
  return (
    <div>
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
      </header>{" "}
      <div>
        <AdminNav />
      </div>
      <form className="mt-10" onSubmit={saveUser}>
        <div className="flex gap-3">
          <h2 className="text-2xl">Name:</h2>
          <input
            type="text"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </div>
        <div className="flex gap-3">
          <h2 className="text-2xl">Email:</h2>
          <input
            type="email"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          />
        </div>

        <div className="grid gap-2 grid-cols-2">
          <button className="primary my-4">Save</button>
          <button
            className="bg-red-500 p-2 w-full text-white rounded-2xl my-4  "
            onClick={deleteUser}
          >
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
              Delete{" "}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
