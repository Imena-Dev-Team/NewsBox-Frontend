import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import photo1 from '../assets/image6.png'
import photo2 from '../assets/image4.jpg'
import photo3 from '../assets/image3.png'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Signup"); // takes user to home
  };

  const carouselImages = [
    { url: photo1, text: "Welcome to Our School" },
    { url: photo2, text: "Empowering Students Every Day" },
    { url: photo3, text: "A Place to Grow and Learn" },
  ];

  // Auto change slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image Carousel */}
      <div className="md:w-1/2 w-full relative overflow-hidden h-72 md:h-auto">
        {carouselImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === current ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={img.url}
              alt={img.text}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
          <p className="text-gray-600 mb-8">
            Welcome back! Please sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Family Name
              </label>
              <input
                id="name"
                type="name"
                placeholder="Enter your family name"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold transition bg-gray-900 text-white"
            >
             Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Enter as{" "}
            <Link
              to="/"
              className="text-blue-600 font-bold hover:underline"
            >
              Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;