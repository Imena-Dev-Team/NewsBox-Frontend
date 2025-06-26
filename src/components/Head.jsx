import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Birthday from "./birthday_Card";
import NewsletterFooter from "./Footer";
const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const Header = [
    {
      image: "src/assets/image6.png",
      title: "Embracing Togetherness ! Embarking Togetherness!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
      profile: "src/assets/image2.jpg",
      user: "Devon Lane",
      time: "May 31, 2023",
    },

    {
      image: "src/assets/image5.png",
      title: "Let's Celebrate Togetherness ! Embarking Togetherness!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
      profile: "src/assets/image2.jpg",
      user: "Devon Lane",
      time: "May 31, 2023",
    },

    {
      image: "src/assets/image3.png",
      title: "Fly Over Dangers, because you are light!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
      profile: "src/assets/image2.jpg",
      user: "Devon Lane",
      time: "May 31, 2023",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIstransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Reset loading state when route changes
  useEffect(() => {
    setLoading(true);
    setProgress(0);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIstransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % Header.length);
        setIstransitioning(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [loading]); // Add loading as dependency

  return (
    <>
      {loading && (
        <div style={{ height: "6px", backgroundColor: "#e0e0e0", margin: "0" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#1474ED",
              transition: "width 0.3s",
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mt-7">
          {loading ? (
            <div className="w-12 h-12 sm:w-15 sm:h-15 lg:mb-100 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
          ) : (
            <img
              src="\src\assets\party1.png"
              alt=""
              className="w-12 h-12 sm:w-15 sm:h-15 lg:mb-100"
            />
          )}

          <div className="w-full lg:w-[45%] mt-4 lg:mt-[80px]">
            {loading ? (
              <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"></div>
            ) : (
              <img
                src={Header[index].image}
                alt=""
                className="w-full h-auto rounded-2xl object-cover"
              />
            )}
          </div>

          <div className="w-full lg:w-[40%] mt-6 lg:mt-[100px] space-y-4">
            {loading ? (
              <>
               
                <div className="w-28 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"></div>

               
                <div className="space-y-2">
                  <div className="w-3/4 h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"></div>
                  <div className="w-1/2 h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"></div>
                </div>

               
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  <div className="w-5/6 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  <div className="w-4/6 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                </div>

                
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-24 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>

               
                <div className="w-12 h-12 sm:w-15 sm:h-15 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>

              
                <div className="flex gap-2 mt-8">
                  <div className="w-8 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
              </>
            ) : (
              <>
                <button className="rounded-2xl px-4 py-2 bg-transparent-blue text-[#1A74ED] mb-4 font-semibold text-sm sm:text-base">
                  ACTIVITY
                </button>
                <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 tracking-wider">
                  {Header[index].title}
                </h2>
                <p className="text-[#808080] font-light text-sm sm:text-base">
                  {Header[index].content}
                </p>

                <div className="flex items-center mt-5 gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={Header[index].profile}
                    alt=""
                  />
                  <div>
                    <h3 className="text-sm sm:text-base">
                      {Header[index].user}
                    </h3>
                    <span className="font-extralight text-[#98A0A2] text-xs">
                      {Header[index].time}
                    </span>
                  </div>
                </div>

                <img
                  src="/src/assets/image.png"
                  alt=""
                  className="w-12 h-12 sm:w-15 sm:h-15 mt-4"
                />

                <div className="flex gap-2 mt-8">
                  {Header.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: i === index ? "30px" : "10px",
                        height: i === index ? "7px" : "10px",
                        borderRadius: i === index ? "7px" : "50%",
                        backgroundColor: i === index ? "#1A74ED" : "#D9D9D9",
                        transition: "all 300ms ease-in-out",
                      }}
                    ></span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Featured News Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-16 mb-8">
          {loading ? (
            <>
              <div className="w-40 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"></div>
              <div className="w-28 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full mt-4 sm:mt-0"></div>
            </>
          ) : (
            <>
              <h1 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-0">
                Featured news
              </h1>
              <button
                className="bg-transparent-blue px-5 py-2 text-[#1A74ED] rounded-full text-center font-semibold text-sm sm:text-base hover:bg-[#F5F9FF] transition-colors"
                onClick={() => navigate("/all")}
              >
                See more
              </button>
            </>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full max-w-[350px]">
                <div className="bg-white rounded-xl shadow-lg p-4 mt-7">
                  {/* Card Image Skeleton */}
                  <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl mb-4"></div>

                  
                  <div className="space-y-2 mb-4">
                    <div className="w-5/6 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-4/6 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  </div>

                  
                  <div className="space-y-2 mb-4">
                    <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-5/6 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-4/6 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  </div>

                  
                  <div className="w-32 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <Card image="\src\assets\image3.png" />
              <Card image="\src\assets\image4.jpg" />
              <Card image="\src\assets\image6.png" />
              <Card image="\src\assets\image6.png" />
              <Card image="\src\assets\image4.jpg" />
              <Card image="\src\assets\image1.jpg" />
            </>
          )}
        </div>

        {/* Birthday Section */}
        <div className="mt-16">
          {loading ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Section Skeleton */}
              <div className="lg:w-1/2 space-y-6">
                <div className="w-3/4 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  <div className="w-5/6 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="w-[345px] bg-white rounded-xl shadow-lg p-4">
                  <div className="w-4/5 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-4"></div>
                  <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-5/6 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>

              {/* Right Section Skeleton */}
              <div className="lg:w-1/2 flex flex-col gap-7">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[345px] h-[150px] bg-white rounded-xl shadow-lg p-4 ${
                      i % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                    }`}
                  >
                    <div className="w-3/4 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                      <div className="w-5/6 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Birthday />
          )}
        </div>
      </div>
      <NewsletterFooter />
    </>
  );
};

export default Head;
