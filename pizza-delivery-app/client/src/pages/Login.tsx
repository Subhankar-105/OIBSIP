import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaPizzaSlice, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const BackIcon = FaArrowLeft as any;
const PizzaIcon = FaPizzaSlice as any;
const MailIcon = FaEnvelope as any;
const LockIcon = FaLock as any;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      console.log("DATA:", res.data);

      const { token, ...userData } = res.data;

      login(token, userData);

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log("ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: "admin@test.com",
        password: "123456"
      });

      const { token, ...userData } = res.data;

      login(token, userData);

      navigate("/admin");
    } catch (error: any) {
      toast.error("Admin login failed");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-red-600 font-medium hover:underline"
      >
        <BackIcon />
      </Link>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <PizzaIcon className="text-red-600 text-4xl" />
        <h1 className="text-3xl font-bold text-red-600">
          Pizza Delivery
        </h1>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl w-full max-w-md p-8"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back!
        </h2>

        {/* Email */}
        <label className="text-sm font-medium">Email Address</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <MailIcon className="text-gray-400 mr-2" />

          <input
            type="email"
            placeholder="you@example.com"
            className="bg-transparent w-full p-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <label className="text-sm font-medium">Password</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <LockIcon className="text-gray-400 mr-2" />

          <input
            type="password"
            placeholder="••••••••"
            className="bg-transparent w-full p-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm mb-5">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <span className="text-red-600 cursor-pointer">
            Forgot password?
          </span>

        </div>

        {/* Sign In */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
        >
          Sign In
        </button>

        {/* Admin login */}
        <button
          type="button"
          onClick={handleAdminLogin}
          className="w-full border border-red-600 text-red-600 py-3 rounded-lg font-semibold mt-3 hover:bg-red-50"
        >
          Sign In as Admin
        </button>

        {/* Register link */}
        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 font-medium">
            Sign up
          </Link>
        </p>

      </form>

      {/* Terms */}
      <p className="text-xs text-gray-500 mt-6 text-center max-w-sm">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>

    </div>
  );
};

export default Login;