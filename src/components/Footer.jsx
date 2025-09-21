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
    { name: "Twitter", href: "https://twitter.com", icon: "𝕏" },
    { name: "Facebook", href: "https://facebook.com", icon: "📘" },
    { name: "Instagram", href: "https://instagram.com", icon: "📷" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "💼" },
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
                Subscribe to our newsletter and never miss out on family updates, stories, and celebrations.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
                    <h3 className="text-xl font-bold gradient-text font-heading">HOPE FAMILY</h3>
                    <p className="text-sm text-gray-600 font-body">Building bonds, sharing stories</p>
                  </div>
           </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-readable font-body">
                  Connect with your family through our beautiful newsletter platform. Share stories, celebrate milestones, and stay connected with your loved ones.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                target="_blank" 
                rel="noopener noreferrer"
                      className="px-3 h-10 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      <span>{social.name}</span>
                    </a>
                  ))}
            </div>
          </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">Quick Links</h4>
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
               <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">Support & Help</h4>
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
                 <h4 className="text-lg font-semibold text-gray-800 mb-6 font-heading">Get in Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div>
                       <p className="text-sm font-medium text-gray-800 font-heading">Email</p>
                       <p className="text-sm text-gray-600 font-body">hello@hopefamily.com</p>
          </div>
        </div>

                  <div className="flex items-center space-x-3">
                    <div>
                       <p className="text-sm font-medium text-gray-800 font-heading">Location</p>
                       <p className="text-sm text-gray-600 font-body">Family Community Hub</p>
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