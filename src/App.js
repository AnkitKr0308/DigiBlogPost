import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return null;
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full-block">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
