import React from "react";
import { Link } from "react-router-dom";

function NewsletterFooter() {
  // const [firstName, setFirstName] = useState("");
  // const [email, setEmail] = useState("");
  // const [isSubscribed, setIsSubscribed] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (firstName && email) {
  //     setIsSubscribed(true);
  //     setFirstName("");
  //     setEmail("");
  //     setTimeout(() => setIsSubscribed(false), 3000);
  //   }
  // };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/aerg.imena_/",
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
  ];

  // Navigation links moved to the navbar; footer keeps branding and contact only

  return (
    <footer className="relative mt-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section removed */}

      {/* Main Footer */}
      <div className="relative z-10 w-full  backdrop-blur border-t border-t-blue-50">
        <div className="max-w-7xl mx-auto px-4 w-full py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    H
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-700 font-heading">
                     IMENA FAMILY
                    </h3>
                    <p className="text-sm text-blue-800/70 font-body">
                      Building bonds, sharing stories
                    </p>
                  </div>
                </div>

                <p className="text-blue-800/70 mb-6 leading-relaxed text-readable font-body">
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
                      className="w-10 h-10 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center text-blue-500 hover:text-blue-600 transition-all duration-300  "
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold text-blue-800 mb-6 font-heading">
                  Get in Touch
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-blue-900 font-heading">
                        Email
                      </p>
                      <p className="text-sm text-blue-800/70 font-body">
                        imena@outlook.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-blue-900 font-heading">
                        Location
                      </p>
                      <p className="text-sm text-blue-800/70 font-body">
                        Nyabihu, Rwanda
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* Divider */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-blue-800/70 text-sm font-body">
                  © 2025 IMENA COURTESY. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-blue-800/70 text-sm font-body">
                  <span>Made with</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1D4ED8" className="w-4 h-4">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 3 13.052 3 10.5 3 7.42 5.42 5 8.5 5A5.5 5.5 0 0112 6.635 5.5 5.5 0 0115.5 5C18.58 5 21 7.42 21 10.5c0 2.552-1.688 4.86-3.989 7.007a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003-.003.002a.75.75 0 01-.686 0l-.003-.002z"/>
                  </svg>
                  <span>by Imena DevTeam</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default NewsletterFooter;
