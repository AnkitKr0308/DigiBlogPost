import React from "react";
import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      active: true,
      navigation: "/",
    },
    {
      name: "Login",
      active: !authstatus,
      navigation: "/login",
    },
    {
      name: "Signup",
      active: !authstatus,
      navigation: "/signup",
    },
    {
      name: "All Posts",
      active: authstatus,
      navigation: "/posts",
    },
    {
      name: "Add Post",
      active: authstatus,
      navigation: "/add-post",
    },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* <!-- Logo --> */}
            {/* <a href="#" className="text-xl font-bold text-gray-800">MySite</a> */}

            {/* <!-- Navigation --> */}
            <nav className="hidden md:flex space-x-6">
              <ul className="flex ml-auto">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => {
                          navigate(item.navigation);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authstatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;
