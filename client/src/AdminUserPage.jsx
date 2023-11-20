/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/admin-users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      {users?.length > 0 &&
        users.map((users) => (
          <Link
            to={`/admin/user/${users._id}`}
            className="flex items-center justify-between w-auto gap-4 bg-gray-100 rounded-2xl overflow-hidden mt-4"
          >
            <div className="ml-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-4 py-3 pr-3 grow">
              <h2 className="text-xl">Name: {users.name}</h2>
              <h2 className="text-xl text-grey-500">Email {users.email}</h2>
            </div>
            <div></div>
          </Link>
        ))}
    </div>
  );
}
