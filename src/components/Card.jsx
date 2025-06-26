import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, image }) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  return (
    <div className="w-full max-w-[350px]">
      <div className="bg-white rounded-xl shadow-lg p-4 mt-7 transform hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-[180px] sm:h-[200px] object-cover rounded-2xl"
          />
        </div>
        <h2 className="font-semibold text-sm sm:text-base pt-2 mb-3 mt-3 line-clamp-2">
          A Heart-warming Family Reunion: Embracing Togetherness ! Embarking
          cherished Moments together
        </h2>
        <p className="text-xs sm:text-sm text-[#808080] line-clamp-3">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.
        </p>
        <div className="mt-4">
          <a
            className="inline-block text-sm bg-white rounded-3xl px-4 py-2 text-[#1A74ED] shadow-sm hover:bg-[#F5F9FF] transition-colors cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPending(true);
              setTimeout(() => {
                setPending(false);
                navigate("/union");
              }, 1500);
            }}
          >
            Read more &rarr;
          </a>
        </div>
        {pending && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-100">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-blue-600 font-semibold bg-white px-6 py-3 rounded shadow">
              Loading blog...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
