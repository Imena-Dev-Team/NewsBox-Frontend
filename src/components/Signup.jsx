import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import photo2 from '../assets/image3.png';
import photo3 from '../assets/image5.png';
import photo1 from '../assets/image6.png';

const Signup = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ name: "", birthday: "", email: "", image: null });
  const [errors, setErrors] = useState({});
  const allowedSubFamilyNames = ["Hope", "Light", "Wihogora"];

  const carouselImages = [
    { url: photo1, text: "Welcome to Our School" },
    { url: photo2, text: "Empowering Students Every Day" },
    { url: photo3, text: "A Place to Grow and Learn" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "Sub Family Name is required";
    if (!formData.birthday) newErrors.birthday = "Date of Birth is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.image) newErrors.image = "Profile Image is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Imena News Box</h1>
            <p className="text-gray-500 mb-8 text-sm">Your family's digital hub</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sub Family Name
                </label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select your sub family</option>
                  {allowedSubFamilyNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold transition bg-gray-900 text-white hover:opacity-90"
              >
                Complete profile
              </button>
            </form>
          </div>
        </div>

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
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
