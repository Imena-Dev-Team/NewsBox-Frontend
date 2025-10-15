import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotificationToast } from "../../context/NotificationContext";
import { authService } from "../../services/apiService";
import { Helmet } from "react-helmet";
import photo1 from "../../assets/loginPhotos/login1.webp";
import photo2 from "../../assets/loginPhotos/login2.webp";
import photo3 from "../../assets/loginPhotos/login3.webp";
import photo4 from "../../assets/loginPhotos/login4.webp";
import photo5 from "../../assets/loginPhotos/login5.webp";
import photo6 from "../../assets/loginPhotos/login6.webp";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const notify = useNotificationToast();
  const [familyName, setFamilyName] = useState("");
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("member");

  const handleMemberLogin = async (e) => {
    e.preventDefault();
    if (!familyName.trim()) {
      setError("Please enter your family name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await authService.loginAsMember(familyName);
      if (response.token) {
        setError("");
        localStorage.setItem("temp_token", response.token);
        try {
          const profileCheck = await authService.checkProfile();
          if (profileCheck.hasProfile) {
            login(response.token, {
              userType: "member",
              familyName,
              profile: profileCheck.profile,
              hasProfile: true,
              profileData: profileCheck.profile,
              ...response.user,
            });
            notify.success("Welcome back", "Signed in successfully.");
            navigate("/home");
          } else {
            login(response.token, {
              userType: "member",
              familyName,
              hasProfile: false,
              ...response.user,
            });
            notify.info("Complete Profile", "Please finish setting up your profile.");
            navigate("/signup");
          }
        } catch {
          login(response.token, {
            userType: "member",
            familyName,
            hasProfile: false,
            ...response.user,
          });
          notify.info("Complete Profile", "Please finish setting up your profile.");
          navigate("/signup");
        } finally {
          localStorage.removeItem("temp_token");
        }
      }
    } catch (err) {
      const errorMessage = err.message || "Invalid family name. Please check and try again.";
      setError(errorMessage);
      notify.error("Sign in failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await authService.loginAsGuest();
      if (response.token) {
        setError("");
        login(response.token, {
          userType: "guest",
          ...response.user,
        });
        notify.success("Welcome", "Continuing as Guest.");
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.message || "Unable to login as guest. Please try again.";
      setError(errorMessage);
      notify.error("Guest login failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const carouselImages = useMemo(
    () => [
      { url: photo1, text: "Welcome to Our School – A Place to Learn and Grow" },
      { url: photo2, text: "Empowering Students Every Day to Reach Their Potential" },
      { url: photo3, text: "A Safe and Nurturing Learning Environment" },
      { url: photo4, text: "Where Curiosity Meets Knowledge" },
      { url: photo5, text: "Building Bright Futures Together" },
      { url: photo6, text: "Join a Community that Inspires Excellence" },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    const nextIndex = (current + 1) % carouselImages.length;
    const next = new Image();
    next.decoding = "async";
    next.src = carouselImages[nextIndex].url;
  }, [current, carouselImages]);

  return (
    <>
      <Helmet>
        <title>Login | School Portal</title>
        <meta
          name="description"
          content="Sign in to the School Portal to access learning materials, track progress, and stay connected with our academic community."
        />
        <meta
          name="keywords"
          content="school login, student portal, family member access, guest login, education platform"
        />
        <link rel="canonical" href="https://www.yourschoolsite.com/login" />
      </Helmet>

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full relative overflow-hidden h-48 sm:h-64 md:h-auto">
          {carouselImages.map(
            (img, index) =>
              index === current && (
                <div key={index} className="absolute inset-0">
                  <img
                    src={img.url}
                    alt={img.text}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchpriority={index === 0 ? "high" : undefined}
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )
          )}
        </div>

        <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
            <p className="text-gray-600 mb-8">
              Welcome back! Please sign in to your account to continue.
            </p>

            <div className="flex mb-6 bg-gray-200 rounded-xl p-0">
              <button
                type="button"
                onClick={() => setLoginType("member")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  loginType === "member"
                    ? "bg-blue-600 text-slate-200 shadow"
                    : "text-gray-600"
                }`}
              >
                Family Member
              </button>
              <button
                type="button"
                onClick={() => setLoginType("guest")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  loginType === "guest"
                    ? "bg-blue-600 text-slate-200 shadow"
                    : "text-gray-600"
                }`}
              >
                Guest
              </button>
            </div>

            {loginType === "member" ? (
              <form onSubmit={handleMemberLogin} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="familyName"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Family Name
                  </label>
                  <input
                    id="familyName"
                    type="text"
                    placeholder="Enter your family name (e.g., MFURA)"
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                    value={familyName}
                    onChange={(e) => {
                      setFamilyName(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={loading}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !familyName.trim()}
                  className="w-full py-3 rounded-xl font-semibold transition bg-blue-600 text-white disabled:opacity-90 disabled:cursor-not-allowed hover:bg-blue-800"
                >
                  {loading ? "Signing In..." : "Sign In as Member"}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Guest Access
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Continue as a guest to explore public content.
                  </p>
                  <button
                    onClick={handleGuestLogin}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl font-semibold transition bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                  >
                    {loading ? "Entering..." : "Continue as Guest"}
                  </button>
                </div>
              </div>
            )}

            {loginType === "member" && (
              <p className="text-center mt-6 text-gray-600">
                Don’t have family access?{" "}
                <button
                  onClick={() => setLoginType("guest")}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Enter as Guest
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
