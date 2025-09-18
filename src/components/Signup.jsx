import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  // Mix of gradients + background images for visual clarity
  const backgroundStyles = [
    {
      background: "url('https://source.unsplash.com/1200x900/?family,celebration') center/cover no-repeat",
      overlay: "linear-gradient(135deg, rgba(102,126,234,0.7), rgba(118,75,162,0.7))",
      title: "Join the Family",
      subtitle: "Start your journey today"
    },
    {
      background: "url('https://source.unsplash.com/1200x900/?community,together') center/cover no-repeat",
      overlay: "linear-gradient(135deg, rgba(240,147,251,0.7), rgba(245,87,108,0.7))",
      title: "Build Connections",
      subtitle: "Share amazing stories"
    },
    {
      background: "url('https://source.unsplash.com/1200x900/?friendship,smile') center/cover no-repeat",
      overlay: "linear-gradient(135deg, rgba(79,172,254,0.7), rgba(0,242,254,0.7))",
      title: "Create Memories",
      subtitle: "Bonds that last forever"
    }
  ];

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Carousel auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgroundStyles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundStyles.length]);

  // Form validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    const isNameValid = formData.name.trim() !== "";
    const isBirthdayValid = formData.birthday !== "";
    setIsFormValid(isEmailValid && isPasswordValid && isNameValid && isBirthdayValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const nameUpper = formData.name.trim().toUpperCase();

    if (!allowedNames.includes(nameUpper)) {
      setError("Please select a valid family name from the allowed list.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3008/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthday: formData.birthday,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Signup successful:", response.data);
        // After successful signup, redirect to login
        navigate('/login');
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ type, name, placeholder, label, showToggle, isSelect, options }) => {
    const hasError = fieldErrors[name];
    const hasValue = formData[name];
    const isValid = hasValue && !hasError;

    if (isSelect) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">{label}</label>
          <div className="relative group">
            <select
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${
                hasError
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300"
                  : isValid
                  ? "border-green-400 bg-green-50 focus:ring-2 focus:ring-green-300"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-300"
              }`}
              required
            >
              <option value="">Select your family name</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <div className="relative group">
          <input
            type={type === "password" && showPassword ? "text" : type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 ${
              hasError
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300"
                : isValid
                ? "border-green-400 bg-green-50 focus:ring-2 focus:ring-green-300"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-300"
            }`}
            required
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            {/* Title */}
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Hope News Box
              </h1>
              <p className="text-gray-500 text-sm">Your family's digital hub</p>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Join the Family!
              </h2>
              <p className="text-gray-600">
                We're excited to have you join our family newsletter community!
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                type="text"
                name="name"
                label="Family Name"
                isSelect={true}
                options={allowedNames}
              />
              <InputField
                type="date"
                name="birthday"
                label="Date of Birth"
              />
              <InputField
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Create a strong password"
                showToggle
              />

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
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Carousel */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative">
          {backgroundStyles.map((style, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              style={{ background: `${style.overlay}, ${style.background}` }}
            />
          ))}
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <h2 className="text-4xl font-bold">{backgroundStyles[current].title}</h2>
            <p className="text-xl">{backgroundStyles[current].subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
