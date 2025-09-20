import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const Links = [
    { name: "Home", href: "/" },
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  H
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text font-heading">
                    HOPE FAMILY COURTESY
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
              {isAuthenticated && (
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
                  <button className="hidden lg:flex items-center px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700 transition-all duration-200">
                    <span className="font-medium text-sm">Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="hidden lg:flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center px-4 py-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="font-medium text-sm">Login</span>
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

                {isAuthenticated && (
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

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-md transition-all duration-200"
                  >
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
