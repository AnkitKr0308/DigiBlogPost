import React from "react";
import { Container, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Navigation items based on auth status
  const navItems = [
    { name: "Home", navigation: "/" },
    // Show Login and Signup only when NOT logged in
    ...(!authstatus
      ? [
          { name: "Login", navigation: "/login" },
          { name: "Signup", navigation: "/signup" },
        ]
      : []),
    // Show posts related only when logged in
    ...(authstatus
      ? [
          { name: "All Posts", navigation: "/posts" },
          { name: "Add Post", navigation: "/add-post" },
        ]
      : []),
  ];

  return (
    <header className="bg-gray-100 p-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6 w-full">
              <ul className="flex ml-auto items-center space-x-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={() => navigate(item.navigation)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
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
