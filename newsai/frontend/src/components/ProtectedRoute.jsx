// frontend/src/components/ProtectedRoute.jsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    alert("⚠️ Please login or register first!");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
