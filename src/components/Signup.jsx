import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eyo from "./eyo.png";
import img from "./img.png";
import logo from "./logo.png";

const Signup = ({ onSignUp }) => {
  const images = [eyo, img, eyo];
  const [current, setCurrent] = useState(0);

  const allowedNames = [
    "BERWA",
    "HOZO",
    "TUNGA",
    "TONA",
    "MWAMBI",
    "MFURA",
    "RWANDA",
  ];
  const [formData, setFormData] = useState({
  name: "",
  birthday: "",
  email: "",
  password: "",
});

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const nameUpper = formData.name.trim().toUpperCase();

  if (!allowedNames.includes(nameUpper)) {
    setError("invalid");
    setFormData({
      name: "",
      birthday: "",
      email: "",
      password: "",
    });
    return;
  }

  try {
    setError("");

    const response = await axios.post('http://10.11.73.185:3008/api/signup', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      birthday: formData.birthday,
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Signup successful:", response.data);
      if (onSignUp) onSignUp();
    } else {
      setError("Signup failed. Please try again.");
    }

  } catch (error) {
    console.error("Signup error:", error);
    setError(error.response?.data?.message || "An error occurred during signup.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xxl bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-10 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-blue-200 rounded flex items-center justify-center text-blue-700 font-bold">
              <img src={logo} alt="" />
            </div>
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
                Family Name <span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  placeholder="Enter your name .."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  required
              />

              {error === "invalid" && (
                <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 17a1.25 1.25 0 0 1-1.25-1.25v-3.5a1.25 1.25 0 0 1 2.5 0v3.5A1.25 1.25 0 0 1 12 17Zm0 4.75A1.25 1.25 0 1 1 12 19.25 1.25 1.25 0 0 1 12 21.75Zm0-19.5A9.25 9.25 0 1 0 21.25 12 9.261 9.261 0 0 0 12 2.25ZM12 20A8 8 0 1 1 20 12 8.009 8.009 0 0 1 12 20Z"
                    ></path>
                  </svg>
                  Fill in valid data!
                </div>
              )}
              <br></br>
              <br />
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                  placeholder="Enter your birthday..."
                  className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                  required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter the email"
                className="w-full border rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter the password"
                className="w-full border rounded px-3 py-2 pr-10 text-gray-800 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.133-3.362m3.108-2.518A9.963 9.963 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.06 5.099M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-base transition"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <div className="text-xs text-gray-500 mt-2 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 w relative">
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

export default Signup;
