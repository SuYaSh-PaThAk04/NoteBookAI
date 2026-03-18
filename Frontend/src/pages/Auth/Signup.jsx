import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/api.js";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 basic frontend validation
    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      // ✅ CORRECT ORDER
      const res = await signup(email, username, password);

      if (res.data.success) {
        // ✅ save token for auto-login
        localStorage.setItem("accessToken", res.data.accessToken);

        toast.success("Signup successful!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong during signup"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-800 to-gray-950 px-4">
      <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-white">
          <input
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/30"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-700 font-bold"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
