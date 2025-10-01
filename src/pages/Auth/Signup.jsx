import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/apiService';
import { useNotificationToast } from '../../context/NotificationContext';
import {Camera} from "lucide-react";
import API_BASE_URL from '../../config/api';
import photo1 from '../../assets/signUpPhotos/image1.jpg';
import photo2 from '../../assets/signUpPhotos/image1.jpg';
import photo3 from '../../assets/signUpPhotos/image1.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const notify = useNotificationToast();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ 
    name: "", 
    birthday: "", 
    email: "", 
    subFam: "",
    profilePic: null 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const allowedSubFamilyNames = ["Hope", "Light", "Wihogora", "SubFamily1"];
  
  // Quick profile check
  useEffect(() => {
    const checkProfile = async () => {
      try {
        if (user?.hasProfile || user?.profileData) {
          notify.success('Welcome back', 'Profile already completed.');
          navigate('/home');
          return;
        }
        
        const profileCheck = await authService.checkProfile();
        if (profileCheck.hasProfile) {
          updateUser({
            hasProfile: true,
            profileData: profileCheck.profile
          });
          notify.success('Welcome back', 'Profile already completed.');
          navigate('/home');
          return;
        }
        
        setCheckingProfile(false);
      } catch (error) {
        console.error('Profile check error:', error);
        setCheckingProfile(false);
      }
    };
    
    checkProfile();
  }, [user, navigate, updateUser, notify]);

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
  }, [carouselImages.length]);

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your profile status...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.subFam) newErrors.subFam = "Sub Family Name is required";
    if (!formData.birthday) {
      newErrors.birthday = "Date of Birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.birthday);
      if (birthDate >= today) {
        newErrors.birthday = "Date of Birth must be in the past";
      }
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      
      try {
        // Build payload. If an image File is present, the service will convert to FormData.
        const profileData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          birthday: formData.birthday,
          subFam: formData.subFam,
          profilePic: formData.profilePic || undefined
        };

        const response = await authService.createProfile(profileData);
        
        // Backend returns { data } (no success flag on creation)
        if (response?.data) {
          const data = response.data;
          // Normalize profilePic url field for consumers
          const normalizedProfile = {
            ...data,
            profilePic: data.profilePicUrl || data.profilePic || null
          };
          updateUser({
            hasProfile: true,
            profileData: normalizedProfile,
            profileCompleted: true
          });
          
          setErrors({});
          notify.success('Profile created', 'Your profile has been saved successfully.');
          navigate("/home");
        }
      } catch (err) {
        const errorMessage = err.message || 'Failed to create profile. Please try again.';
        setErrors({ submit: errorMessage });
        notify.error('Profile error', errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Complete Your Profile</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 mb-8">
            Welcome <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{user?.familyName || 'Member'}</span>!
            <span className="block text-sm font-normal text-blue-600 mt-2">Please complete your profile to continue.</span>
          </h2>
            

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <div className="flex flex-col items-center">
                  <label htmlFor="profilePic" className="relative cursor-pointer">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                      {(() => {
                        const pic = formData.profilePic;
                        const isFile = typeof File !== 'undefined' && pic instanceof File;
                        const isString = typeof pic === 'string' && pic.length > 0;
                        if (isFile || isString) {
                          const src = isFile ? URL.createObjectURL(pic) : pic;
                          return (
                            <img
                              src={src}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onLoad={() => { if (isFile) URL.revokeObjectURL(src); }}
                            />
                          );
                        }
                        return <span className="text-gray-400 text-sm">No Image</span>;
                      })()}
                      <div className="absolute bottom-0 right-0 p-2 rounded-full">
                        <Camera className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                      setFormData({ ...formData, profilePic: file });
                    }}
                    disabled={loading}
                  />
                </div>
                {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sub Family Name
                </label>
                <select
                  name="subFam"
                  value={formData.subFam}
                  onChange={(e) => {
                    setFormData({ ...formData, subFam: e.target.value });
                    if (errors.subFam) setErrors({ ...errors, subFam: "" });
                  }}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.subFam ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
                  }`}
                  disabled={loading}
                  required
                >
                  <option value="">Select your sub family</option>
                  {allowedSubFamilyNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                {errors.subFam && <p className="text-red-500 text-sm mt-1">{errors.subFam}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={(e) => {
                    setFormData({ ...formData, birthday: e.target.value });
                    if (errors.birthday) setErrors({ ...errors, birthday: "" });
                  }}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.birthday ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
                  }`}
                  disabled={loading}
                  required
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
                  }`}
                  disabled={loading}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold transition bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Profile...' : 'Complete Profile'}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 relative">
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
  );
};

export default Signup;
