import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api.js";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 🔹 Live email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // 🔹 Live password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    } else if (value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚫 HARD STOP if errors exist
    if (errors.email || errors.password || !email || !password) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);

      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-gray-950 px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-10 py-10 rounded-2xl shadow-2xl w-full max-w-md text-white">

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="text"   // ✅ IMPORTANT
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`w-full p-3 rounded-xl bg-white/10 border ${
                errors.email ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`w-full p-3 rounded-xl bg-white/10 border ${
                errors.password ? "border-red-500" : "border-gray-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-green-700 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 disabled:opacity-60"
          >
           
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don’t have an account?{" "}
          <span
            className="cursor-pointer text-green-500 font-semibold"
            onClick={() => navigate("/signup")}
          >
            Signup now
          </span>
        </p>
      </div>
    </div>
  );
}
