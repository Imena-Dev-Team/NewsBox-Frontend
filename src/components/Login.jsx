import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eyo from "./eyo.png";
import img from "./img.png";

const Login = ({ onLogin }) => {
  const images = [eyo, img, eyo];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add real authentication here
    if (onLogin) onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-0">
      <div className="flex flex-col md:flex-row w-full max-w-full min-h-[95vh] bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 justify-center min-h-[95vh]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-blue-200 rounded flex items-center justify-center text-blue-700 font-bold">
              N
            </div>
            <span className="font-semibold text-blue-700 text-xl">
              News Box
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Welcome back to Hope News Box,
            </h2>
            <p className="text-gray-500 mt-1">
              We are delighted to have you onboard! Such an amazing experience
              we are looking forward to!
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter the email"
                className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter the password"
                className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button className="mt-2 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-base transition">
              LOGIN
            </button>
          </form>

          <div className="text-xs text-gray-500 mt-2 text-center">
            Do not have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 relative items-center justify-center min-h-[95vh]">
          <img
            src={images[current]}
            alt="Group"
            className="object-cover w-full h-full transition duration-700"
          />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back to Hope News Box
            </h2>
            <p>
              We are delighted to have you onboard! Such an amazing experience
              we are looking forward to!
            </p>
            <div className="flex items-center gap-2 mt-4 justify-center">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-2 h-2 rounded-full ${
                    i === current ? "bg-white" : "bg-white/50"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
