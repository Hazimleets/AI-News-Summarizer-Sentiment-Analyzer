// frontend/src/components/Navbar.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b">
      {/* Logo */}
      <Link to="/" className="text-black font-bold text-xl">
        NewsAI
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Navigation Links */}
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-yellow-500 transition"
            >
              Home
            </Link>
            <Link
              to="/results"
              className="text-gray-700 font-medium hover:text-yellow-500 transition"
            >
              Results
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 font-medium hover:text-yellow-500 transition"
            >
              Dashboard
            </Link>

            {/* Greeting */}
            <span className="text-gray-700">Hi, {user.name}</span>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black hover:text-yellow-500">
              Login
            </Link>
            <Link to="/register" className="text-black hover:text-yellow-500">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
