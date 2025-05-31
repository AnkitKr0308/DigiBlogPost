import React from "react";
import { useDispatch } from "react-redux";
import logout from "../../features/authSlice";
import authservice from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch;

  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={logoutHandler}
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
