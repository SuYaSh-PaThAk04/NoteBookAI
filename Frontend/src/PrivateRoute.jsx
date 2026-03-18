import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // ❌ token hi nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ token hai → allow
  return children;
};

export default PrivateRoute;
