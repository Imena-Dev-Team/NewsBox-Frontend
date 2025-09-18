import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, image }) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      navigate("/union");
    }, 1500);
  };

  return (
    <div className="w-full max-w-[380px]">
      <div className="glass-effect rounded-2xl p-6 relative overflow-hidden">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-[220px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Category Badge */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
              Family News
            </span>
            <span className="text-xs text-gray-500">5 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 leading-tight font-heading">
            A Heart-warming Family Reunion: Embracing Togetherness! Embarking cherished Moments together
        </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-readable font-body">
            Amidst the hustle and bustle of our daily lives, this family reunion serves as a reminder of the importance of taking a pause and relishing the company of those who matter most.
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                DL
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 font-heading">Devon Lane</p>
                <p className="text-xs text-gray-500 font-body">May 31, 2023</p>
              </div>
            </div>
          </div>

          {/* Read More Link */}
          <button
            onClick={handleReadMore}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            Read more
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
        {pending && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">Loading blog...</p>
                <p className="text-sm text-gray-600 mt-1">Preparing your reading experience</p>
              </div>
            </div>
          </div>
          </div>
        )}
    </div>
  );
};

export default Card;
