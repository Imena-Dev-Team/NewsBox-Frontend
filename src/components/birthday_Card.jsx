import React, { useState, useEffect } from "react";
import { client } from "../sanityClient";

// Utility function to convert block content to plain text
function toPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text).join(""))
    .join("\n\n");
}

const Birthday = () => {
  const [birthdayMessages, setBirthdayMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Fetch birthday messages from Sanity
  // useEffect(() => {
  //   const fetchBirthdayMessages = async () => {
  //     try {
  //       const query = `*[_type == "birthday"]{
  //         _id,
  //         title,
  //         body
  //       }`;

  //       const messages = await client.fetch(query);
  //       setBirthdayMessages(messages);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching birthday messages:", err);
  //       setError("Failed to load birthday messages");
  //       setLoading(false);
  //     }
  //   };

  //   fetchBirthdayMessages();
  // }, []);

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
          <h2 className="font-bold text-sm sm:text-base bg-white">
            Imena FAMILY WISHES A BLAZING ANNIVERSARY TO YOU ALL
          </h2>
          <div className="mt-5 bg-white">
            <img
              src="/src/assets/party.png"
              alt="Birthday"
              className="ml-10 h-[180px] sm:h-[200px] object-cover bg-white"
            />
          </div>
          <p className=" bg-white text-xs sm:text-sm text-[#808080] line-clamp-3">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.
          </p>
        </div>
      </div>

      {/* Right Section - Zigzag Cards */}
      {/* <div className="lg:w-1/2 flex flex-col gap-7">
        {loading ? (
          // Loading skeleton
          <>
            <div className="lg:ml-auto w-[345px] h-[150px] bg-gray-200 rounded-xl shadow-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
            <div className="lg:mr-auto w-[345px] h-[150px] bg-gray-200 rounded-xl shadow-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
            <div className="lg:ml-auto w-[345px] h-[150px] bg-gray-200 rounded-xl shadow-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          </>
        ) : error ? (
          // Error state
          <div className="w-[345px] h-[150px] bg-red-50 border border-red-200 rounded-xl shadow-lg p-4 flex items-center justify-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        ) : birthdayMessages.length === 0 ? (
          // No messages state
          <div className="w-[345px] h-[150px] bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg p-4 flex items-center justify-center">
            <p className="text-yellow-600 text-sm">
              No birthday messages found. Add some in Sanity Studio!
            </p>
          </div>
        ) : (
          // Dynamic cards from Sanity
          birthdayMessages.slice(0, 3).map((message, index) => (
            <div
              key={message._id}
              className={`w-[345px] h-[150px] bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 ${
                index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
              }`}
            >
              <h2 className="font-bold bg-white">{message.title}</h2>
              <p className="bg-white text-xs mt-5 text-[#808080] line-clamp-4">
                {toPlainText(message.body)}
              </p>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default Birthday;
