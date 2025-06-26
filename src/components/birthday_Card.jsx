import React from "react";

const Birthday = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-semibold text-[#1A74ED] w-90">
          WISHING AMAZING BIRTHDAYS!
        </h1>
        <p className="mt-5 w-100 text-sm">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>

        <div className="bg-white rounded-xl shadow-lg p-4 mt-7 w-[345px] transform hover:scale-105 transition-transform duration-300">
          <h2 className="font-bold text-sm sm:text-base">
            HOPE FAMILY WISHES A BLAZING ANNIVERSARY TO YOU ALL
          </h2>
          <div className="mt-5">
            <img
              src="/src/assets/party.png"
              alt="Birthday"
              className="ml-10 h-[180px] sm:h-[200px] object-cover"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#808080] line-clamp-3">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.
          </p>
        </div>
      </div>

      {/* Right Section - Zigzag Cards */}
      <div className="lg:w-1/2 flex flex-col gap-7">
        {/* First Card - Aligned Right */}
        <div className="lg:ml-auto w-[345px] h-[150px] bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
          <h2 className="font-bold">Happy Birthday Mike !!</h2>
          <p className="text-xs mt-5 text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.{" "}
          </p>
        </div>

        {/* Second Card - Aligned Left */}
        <div className="lg:mr-auto w-[345px] h-[150px] bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
          <h2 className="font-bold">Happy Birthday Mike !!</h2>
          <p className="text-xs mt-5 text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.{" "}
          </p>
        </div>

        {/* Third Card - Aligned Right */}
        <div className="lg:ml-auto w-[345px] h-[150px] bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
          <h2 className="font-bold">Happy Birthday Mike !!</h2>
          <p className="text-xs mt-5 text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Birthday;
