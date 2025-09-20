import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import photo2 from '../assets/image3.png';
import photo3 from '../assets/image5.png';
import photo1 from '../assets/image6.png';

const Signup = () => {
  const navigate = useNavigate();

  // Carousel images and overlay text
  const carouselImages = [
    { url: photo1, text: "Welcome to Our School" },
    { url: photo2, text: "Empowering Students Every Day" },
    { url: photo3, text: "A Place to Grow and Learn" },
  ];

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ name: "", birthday: "", email: "" });
  const allowedSubFamilyNames = ["Hope", "Light", "Wihogora"];

  // Carousel auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Imena News Box</h1>
            <p className="text-gray-500 mb-8 text-sm">Your family's digital hub</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sub Family Name
                </label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                >
                  <option value="">Select your sub family</option>
                  {allowedSubFamilyNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthday"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold transition bg-gray-900 text-white hover:opacity-90`}
              >
               Complete profile
              </button>
            </form>
          </div>
        </div>

        {/* Right side - Carousel */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative">
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.text}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/30">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
