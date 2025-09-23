import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/apiService';
import photo2 from '../assets/image3.png';
import photo3 from '../assets/image5.png';
import photo1 from '../assets/image6.png';

const Signup = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
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
  const allowedSubFamilyNames = ["Hope", "Light", "Wihogora"];
  
  // Quick profile check (route guards should handle most cases)
  useEffect(() => {
    // The route guard should prevent access, but double-check for safety
    const checkProfile = async () => {
      try {
        if (user?.hasProfile || user?.profileData) {
          console.log('User already has profile, should not be here');
          navigate('/home');
          return;
        }
        
        // Final server check
        const profileCheck = await authService.checkProfile();
        if (profileCheck.hasProfile) {
          updateUser({
            hasProfile: true,
            profileData: profileCheck.profile
          });
          navigate('/home');
          return;
        }
        
        // All clear - show the form
        setCheckingProfile(false);
      } catch (error) {
        console.error('Profile check error:', error);
        // Allow form to show on error
        setCheckingProfile(false);
      }
    };
    
    checkProfile();
  }, [user, navigate, updateUser]);

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

  // Show loading spinner while checking profile status
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
        // Create the profile data object according to backend schema
        // familyName will be automatically added by the backend from JWT token
        const profileData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          birthday: formData.birthday,
          subFam: formData.subFam
        };
        
        // Add profilePic only if provided
        if (formData.profilePic) {
          // For now, we'll just use a placeholder path
          // In a real implementation, you'd upload the file first
          profileData.profilePic = '/uploads/images/defaultProfile.png';
        }
        
        console.log('Sending profile data:', profileData);
        
        const response = await authService.createProfile(profileData);
        
        if (response.data) {
          // Update user context with the new profile data
          updateUser({ 
            hasProfile: true,
            profileData: response.data,
            profileCompleted: true 
          });
          
          console.log('Profile created successfully:', response.data);
          
          // Clear errors and redirect to home
          setErrors({});
          navigate("/home");
        }
      } catch (err) {
        console.error('Profile creation error:', err);
        // Handle specific error messages from backend
        const errorMessage = err.message || 'Failed to create profile. Please try again.';
        setErrors({ submit: errorMessage });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Complete Your Profile</h1>
            <p className="text-gray-500 mb-8 text-sm">
              Welcome {user?.familyName}! Please complete your profile to continue.
            </p>
            
            {/* General error message */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Profile Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFormData({ ...formData, profilePic: e.target.files[0] });
                    if (errors.profilePic) setErrors({ ...errors, profilePic: "" });
                  }}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.profilePic ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-300'
                  }`}
                  disabled={loading}
                />
                {formData.profilePic && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(formData.profilePic)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
                {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold transition bg-gray-900 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Profile...' : 'Complete Profile'}
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
