import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const Links = [
    { name: "Home", href: "/home" },
    { name: "Blogs", href: "/all" },
    { name: "Gallery", href: "/gallery" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#1A74ED] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  H
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text font-heading">
                    IMENA FAMILY COURTESY
                  </h1>
                  <p className="text-sm text-gray-600 font-body">
                    Building bonds, sharing stories
                  </p>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              {Links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === link.href
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              ))}
              {isAuthenticated && user?.userType === 'member' && (
                <Link
                  to="/Birthdays"
                  className={`nav-link px-4 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === "/Birthdays"
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium text-sm">Members' Birthdays</span>
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  {user?.userType === 'member' && (
                    <div className="hidden lg:flex items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                      {user?.profileData?.profilePic && user.profileData.profilePic !== '/uploads/images/defaultProfile.png' ? (
                        <img
                          src={user.profileData.profilePic}
                          alt={user.profileData?.name || user.familyName || "Profile"}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                          {(user?.familyName?.[0] || user?.profileData?.name?.[0] || 'M').toUpperCase()}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Show user type indicator */}
                  <div className="hidden lg:flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-medium text-gray-600">
                      {user?.userType === 'guest' ? 'Guest User' : `${user?.profileData?.name || user?.familyName || 'Member'}`}
                    </span>
                  </div>

                  {/* Profile Dropdown and Logout for members, simple logout for guests */}
                  {user?.userType === 'member' ? (
                    <>
                      <ProfileDropdown />
                      <button
                        onClick={handleLogout}
                        className="hidden lg:flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        <span className="font-medium text-sm">Logout</span>
                      </button>
                    </>
                  ) : user?.userType === 'guest' ? (
                    <button
                      onClick={handleLogout}
                      className="hidden lg:flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  ) : null}
                </>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="bg-[#1A74ED] px-6 py-2 rounded-md text-white ">Login</span>
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white/90 backdrop-blur border-t border-gray-100">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {Links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md transition-all duration-200 ${
                      location.pathname === link.href
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium text-base">{link.name}</span>
                  </Link>
                ))}

                {isAuthenticated && user?.userType === 'member' && (
                  <Link
                    to="/Birthdays"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md transition-all duration-200 ${
                      location.pathname === "/Birthdays"
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium text-base">Members' Birthdays</span>
                  </Link>
                )}

                {/* Show user profile in mobile for members */}
                {isAuthenticated && user?.userType === 'member' && user?.profileData && (
                  <div className="px-4 py-4 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                        {user.profileData.name?.charAt(0)?.toUpperCase() || user.familyName?.charAt(0)?.toUpperCase() || 'M'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.profileData.name}</p>
                        <p className="text-sm text-blue-600">{user.familyName} Family</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><span className="font-medium">Email:</span> {user.profileData.email}</p>
                      <p><span className="font-medium">Sub Family:</span> {user.profileData.subFam}</p>
                    </div>
                  </div>
                )}
                
                {/* Show simple status for guests */}
                {isAuthenticated && user?.userType === 'guest' && (
                  <div className="px-4 py-2 bg-gray-100 rounded-md mb-2">
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
                    className="flex items-center px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200 w-full justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium text-base">Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                  >
                    <span className="font-medium text-base">Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      <div className="h-20"></div>
    </>
  );
}

export default Header;
