import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPizzaSlice, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api/axios";
import { toast } from "react-toastify";

const BackIcon = FaArrowLeft as any;
const PizzaIcon = FaPizzaSlice as any;
const UserIcon = FaUser as any;
const MailIcon = FaEnvelope as any;
const LockIcon = FaLock as any;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", formData);
      toast.success("Registration successful! Please check your email.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
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
      <div className="flex items-center gap-3 mb-6 p-4">
        <PizzaIcon className="text-red-600 text-4xl" />
        <h1 className="text-3xl font-bold text-red-600">
          Pizza Delivery
        </h1>
      </div>

      {/* Register Card */}
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-xl w-full max-w-md p-8"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Name */}
        <label className="text-sm font-medium">Full Name</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <UserIcon className="text-gray-400 mr-2" />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="bg-transparent w-full p-3 outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <label className="text-sm font-medium">Email Address</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <MailIcon className="text-gray-400 mr-2" />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="bg-transparent w-full p-3 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <label className="text-sm font-medium">Password</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <LockIcon className="text-gray-400 mr-2" />

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="bg-transparent w-full p-3 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <label className="text-sm font-medium">Confirm Password</label>

        <div className="flex items-center bg-gray-100 rounded-lg px-3 mb-4">
          <LockIcon className="text-gray-400 mr-2" />

          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            className="bg-transparent w-full p-3 outline-none"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 text-sm mb-5">
          <input type="checkbox" required />
          I agree to the Terms of Service and Privacy Policy
        </label>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
        >
          Create Account
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium">
            Sign in
          </Link>
        </p>

        {/* Info box */}
        <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg mt-6 text-center">
          After registration, please check your email to verify your account
        </div>

      </form>

    </div>
  );
};

export default Register;