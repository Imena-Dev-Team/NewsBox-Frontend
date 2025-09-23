import React, { useState } from "react";
import { Link } from "react-router-dom";

function NewsletterFooter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && email) {
      setIsSubscribed(true);
      setFirstName("");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M19.633 7.997c.013.176.013.353.013.53 0 5.396-4.108 11.62-11.62 11.62-2.31 0-4.457-.676-6.262-1.843.321.038.63.05.963.05 1.91 0 3.667-.65 5.07-1.751a4.098 4.098 0 0 1-3.825-2.84c.253.038.506.063.771.063.368 0 .736-.05 1.079-.139A4.09 4.09 0 0 1 2.8 9.55v-.05c.544.304 1.176.493 1.85.518a4.083 4.083 0 0 1-1.826-3.403c0-.75.202-1.44.557-2.04a11.62 11.62 0 0 0 8.433 4.279 4.612 4.612 0 0 1-.102-.936 4.09 4.09 0 0 1 7.08-2.796 8.09 8.09 0 0 0 2.594-.988 4.107 4.107 0 0 1-1.796 2.26 8.2 8.2 0 0 0 2.36-.63 8.813 8.813 0 0 1-2.12 2.18z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.02H7.9v-2.9h2.4v-2.2c0-2.37 1.42-3.68 3.59-3.68 1.04 0 2.13.18 2.13.18v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.88h2.64l-.42 2.9h-2.22v7.02c4.78-.74 8.44-4.91 8.44-9.93z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 6.5a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M6.94 6.5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.5 8.75h3.5V20.5H3.5V8.75zM9 8.75h3.36v1.6h.05c.47-.9 1.62-1.86 3.34-1.86 3.57 0 4.23 2.35 4.23 5.4v6.61h-3.5v-5.86c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.09v5.97H9V8.75z" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Recent Blogs", href: "/all" },
    { name: "Publish Blogs", href: "/Articles" },
    { name: "Gallery", href: "/gallery" },
    { name: "Birthdays", href: "/Birthdays" },
  ];

  const supportLinks = [
    { name: "Customer Support", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <footer className="relative mt-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 mb-16">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-3xl p-8 lg:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-heading">
                Stay Connected with Your Family
              </h2>
              <p className="text-gray-600 text-lg mb-8 text-readable font-body">
                Subscribe to our newsletter and never miss out on family
                updates, stories, and celebrations.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field flex-1"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field flex-1"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#1A74ED] text-white rounded-lg px-6 "
                >
                  Subscribe
                </button>
              </form>

              {isSubscribed && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                  <p className="flex items-center justify-center">
                    Thank you for subscribing!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    H
                  </div>
                  <div>
                    <h3 className="text-xl font-bold gradient-text font-heading">
                      HOPE FAMILY
                    </h3>
                    <p className="text-sm text-gray-600 font-body">
                      Building bonds, sharing stories
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-readable font-body">
                  Connect with your family through our beautiful newsletter
                  platform. Share stories, celebrate milestones, and stay
                  connected with your loved ones.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <span className="font-body">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">
                  Support & Help
                </h4>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <span className="font-body">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">
                  Get in Touch
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800 font-heading">
                        Email
                      </p>
                      <p className="text-sm text-gray-600 font-body">
                        hello@hopefamily.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800 font-heading">
                        Location
                      </p>
                      <p className="text-sm text-gray-600 font-body">
                        Family Community Hub
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-600 text-sm font-body">
                  © 2024 HOPE FAMILY COURTESY. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-gray-600 text-sm font-body">
                  <span>Made with</span>
                  <span>love</span>
                  <span>for families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NewsletterFooter;
