import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/apiService";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const Links = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/all" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Story", href: "/story" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure we have up-to-date profile data for members
  useEffect(() => {
    const fetchProfileIfNeeded = async () => {
      try {
        if (isAuthenticated && user?.userType === "member") {
          const resp = await authService.getProfile();
          if (resp?.data) {
            const data = resp.data;
            const normalizedProfile = {
              ...data,
              profilePic: data.profilePicUrl || data.profilePic || null,
            };
            updateUser({ profileData: normalizedProfile, hasProfile: true });
          }
        }
      } catch (_) {
        // ignore header fetch errors
      }
    };
    fetchProfileIfNeeded();
  }, [isAuthenticated, user?.userType, updateUser]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "backdrop-blur-2xl saturate-150 bg-gradient-to-r from-white/30 to-white/10 border-b border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            : "backdrop-blur-xl saturate-150 bg-white/20 border-b border-white/20"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  I
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                    IMENA FAMILY COURTESY
                  </h1>
                  <p className="text-sm text-blue-700/70 font-body">
                    Building bonds, sharing stories
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold font-heading bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                    IMENA Family
                  </h1>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {Links.filter(link => link.name !== "Story").map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === link.href
                      ? "text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              ))}
              {/* Members only */}
               {isAuthenticated && user?.userType === "member" && (
                <Link
                  to="/story"
                  className={`nav-link px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === "/story"
                      ? "text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >

                  <span className="font-medium text-sm">
                    story
                  </span>
                </Link>
              )}
              {isAuthenticated && user?.userType === "member" && (
                <Link
                  to="/Birthdays"
                  className={`nav-link px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === "/Birthdays"
                      ? "text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">
                    Members' Birthdays
                  </span>
                </Link>
              )}
              
            </nav>

            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {user?.userType === "member" && (
                    <div className="flex items-center rounded-full transition-all duration-200 cursor-pointer">
                      {(() => {
                        const profile =
                          user?.profileData?.data || user?.profileData;
                        const rawUrl =
                          profile?.profilePicUrl || profile?.profilePic;
                        const imageUrl =
                          rawUrl && rawUrl.startsWith("http") ? rawUrl : rawUrl;
                        const hasUrl = !!imageUrl;
                        return (
                          <>
                            <img
                              src={imageUrl || ""}
                              alt={
                                profile?.name || user.familyName || "Profile"
                              }
                              className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 bg-transparent"
                              style={{ display: hasUrl ? "block" : "none" }}
                              onClick={() => {
                                if (hasUrl) setPreviewSrc(imageUrl);
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.nextSibling) {
                                  e.currentTarget.nextSibling.style.display =
                                    "flex";
                                }
                              }}
                            />
                            <div
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white items-center justify-center font-bold text-lg select-none"
                              style={{ display: hasUrl ? "none" : "flex" }}
                            >
                              {(
                                user?.familyName?.[0] ||
                                user?.profileData?.name?.[0] ||
                                "M"
                              ).toUpperCase()}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {/* Show user type indicator */}
                  <div className="flex items-center px-3 py-1 rounded-full border border-blue-200">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                      {user?.userType === "guest"
                        ? "Guest "
                        : `${
                            user?.profileData?.name ||
                            user?.familyName ||
                            "Member"
                          }`}
                    </span>
                  </div>

                  {/* Profile Dropdown and Logout for members, simple logout for guests */}
                  {user?.userType === "member" ? (
                    <>
                      <ProfileDropdown />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/100 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm overflow-hidden isolate bg-clip-padding backdrop-blur-0 relative transform-gpu"
                      >
                        <svg
                          className="w-4 h-4 bg-transparent z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className=" text-sm leading-none bg-transparent z-10">
                          Logout
                        </span>
                      </button>
                    </>
                  ) : user?.userType === "guest" ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/100 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm overflow-hidden isolate bg-clip-padding backdrop-blur-0 relative transform-gpu"
                    >
                      <svg
                        className="w-4 h-4 bg-transparent z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium text-sm leading-none bg-transparent z-10">
                        Logout
                      </span>
                    </button>
                  ) : null}
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="bg-blue-600 px-6 py-2 rounded-md text-white">
                    Login
                  </span>
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden px-3 py-2 rounded-md hover:bg-blue-50 text-gray-700 border border-blue-100"
              >
                <span className="sr-only">Toggle menu</span>
                {isMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="absolute right-0 top-0 h-screen w-11/12 max-w-sm bg-white/70 backdrop-blur-md border-l border-white/30 shadow-xl transform transition-transform duration-300 translate-x-0">
              <div className="px-4 py-4 border-b border-white/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-base">
                    H
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">IMENA</p>
                    <p className="text-xs text-blue-700/70">Family Courtesy</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col space-y-2 px-4 py-4 h-[calc(100vh-64px)] overflow-y-auto">
                {Links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md transition-all duration-200 ${
                      location.pathname === link.href
                        ? "text-blue-700 font-semibold"
                        : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium text-base">{link.name}</span>
                  </Link>
                ))}

                {isAuthenticated && user?.userType === "member" && (
                  <Link
                    to="/Birthdays"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md transition-all duration-200 ${
                      location.pathname === "/Birthdays"
                        ? "text-blue-700 font-semibold"
                        : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium text-base">
                      Members' Birthdays
                    </span>
                  </Link>
                )}

                {/* Show user profile in mobile for members */}
                {isAuthenticated &&
                  user?.userType === "member" &&
                  user?.profileData && (
                    <div className="px-4 py-4 bg-gray-50 rounded-lg mb-2">
                      <div className="flex items-center space-x-3 mb-3">
                        {(() => {
                          const profile =
                            user?.profileData?.data || user?.profileData;
                          const rawUrl =
                            profile?.profilePicUrl || profile?.profilePic;
                          const imageUrl =
                            rawUrl && rawUrl.startsWith("http")
                              ? rawUrl
                              : rawUrl;
                          const hasUrl = !!imageUrl;
                          return (
                            <>
                              <img
                                src={imageUrl || ""}
                                alt={
                                  profile?.name || user.familyName || "Profile"
                                }
                                className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                                style={{ display: hasUrl ? "block" : "none" }}
                                onClick={() => {
                                  if (hasUrl) setPreviewSrc(imageUrl);
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  if (e.currentTarget.nextSibling) {
                                    e.currentTarget.nextSibling.style.display =
                                      "flex";
                                  }
                                }}
                              />
                              <div
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white items-center justify-center font-bold text-sm select-none"
                                style={{ display: hasUrl ? "none" : "flex" }}
                              >
                                {(
                                  user?.familyName?.[0] ||
                                  user?.profileData?.name?.[0] ||
                                  "M"
                                ).toUpperCase()}
                              </div>
                            </>
                          );
                        })()}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.profileData.name}
                          </p>
                          <p className="text-sm text-blue-600">
                            {user.familyName} Family
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {user.profileData.email}
                        </p>
                        <p>
                          <span className="font-medium">Sub Family:</span>{" "}
                          {user.profileData.subFam}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Show simple status for guests */}
                {isAuthenticated && user?.userType === "guest" && (
                  <div className="px-4 py-2 bg-blue-50 rounded-md mb-2 border border-blue-100">
                    <span className="text-sm font-medium text-gray-600">
                      Logged in as Guest
                    </span>
                  </div>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 mx-4 flex items-center justify-center px-4 py-3 border border-gray-200 text-gray-700 rounded-md hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-base">Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 mx-4 flex items-center justify-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                  >
                    <span className="font-medium text-base">Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Image Preview Modal */}
      {previewSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
          onClick={() => setPreviewSrc(null)}
        >
          <div
            className="relative max-w-4xl w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-sm"
              onClick={() => setPreviewSrc(null)}
            >
              Close
            </button>
            <img
              src={previewSrc}
              alt="Profile Preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="h-20"></div>
    </>
  );
}

export default Header;
