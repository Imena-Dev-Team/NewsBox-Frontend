import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const newErrors = validateForm();
    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3008/api/login", { email, password });
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && Object.keys(fieldErrors).length === 0;

  const carouselImages = [
    { url: "https://source.unsplash.com/random/800x600/?education,library", text: "Welcome to Our School" },
    { url: "https://source.unsplash.com/random/800x600/?classroom,students", text: "Empowering Students Every Day" },
    { url: "https://source.unsplash.com/random/800x600/?books,learning", text: "A Place to Grow and Learn" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image Carousel */}
      <div className="md:w-1/2 w-full relative overflow-hidden h-72 md:h-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {carouselImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === 0 ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={img.url}
                alt={img.text}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/30">
                <h2 className="text-3xl font-bold">{img.text}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
          <p className="text-gray-600 mb-8">
            Welcome back! Please sign in to your account.
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  fieldErrors.email ? "border-red-500" : "focus:ring-blue-400"
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                }}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
                  fieldErrors.password ? "border-red-500" : "focus:ring-blue-400"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                }}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                isLoading
                  ? "bg-gray-400 text-white"
                  : isFormValid
                  ? "bg-blue-600 text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-600 font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
