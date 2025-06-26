import React, { useState, useEffect } from "react";
import MyImage from "../bd.png";
import Image from "../pt.png";
import NewsletterFooter from "./Footer";

const BirthdaySkeleton = () => (
  <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border mt-24">
    <div className="flex justify-between items-center mb-[30px] relative">
      <div className="h-8 w-60 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-4"></div>
    </div>
    <div className="relative">
      <div className="absolute right-0 -top-[170px] w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full opacity-80" />

      <div className="flex flex-wrap gap-[30px] justify-between w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]"
          >
            <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-2.5"></div>
            <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>

      <div className="absolute top-[250px] -left-[112px] w-[120px] h-[120px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full opacity-80 -translate-y-[20%] ml-[15px] mb-[90px]" />

      <form className="mt-[5px] relative font-['Poppins',sans-serif]">
        <div className="w-[70%] h-[50px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mx-auto my-[150px] mb-4" />
        <div className="absolute right-5 top-[100px] w-[200px] h-[50px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-[40px]" />
      </form>
    </div>
  </div>
);

const Birthdays = () => {
  const [clicked, setClicked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProgress(0);
    setShowProgress(true);
    setLoading(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 300); // Hide after short delay
          setTimeout(() => setLoading(false), 300); // Show content after progress bar
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && author.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          author: author,
          timestamp: new Date().toLocaleDateString(),
        },
      ]);
      setNewMessage("");
      setAuthor("");
      setClicked(true);
      setTimeout(() => setClicked(false), 1000);
    }
  };

  const todayBirthdays = [{ name: "TONA" }, { name: "RWANDA" }];
  const upcomingBirthdays = [
    { name: "HOZO", date: "2025-06-27" },
    { name: "BERWA", date: "2025-06-28" },
  ];

  function isSoon(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = (date - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < 2;
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {showProgress && (
        <div style={{ height: "6px", backgroundColor: "#e0e0e0", margin: 0 }}>
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <BirthdaySkeleton />
        ) : (
          <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border mt-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8 mt-2 w-full ml-10">
              <div className="flex-1 min-w-[220px] ml-[14px]">
                <h2 className="text-xl font-bold mb-2 text-[#1474ED]">
                  🎉 Today's Birthdays
                </h2>
                {todayBirthdays.length === 0 ? (
                  <div className="text-gray-500">No birthdays today.</div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {todayBirthdays.map((b, i) => (
                      <div
                        key={i}
                        className="bg-[#e3f0fd] px-6 py-3 rounded-lg shadow text-[#1474ED] font-semibold border border-[#2aa2ff]"
                      >
                        {b.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-[260px]">
                <h2 className="text-lg font-semibold mb-2 text-[#2aa2ff]">
                  🔔 Upcoming Birthdays
                </h2>
                {upcomingBirthdays.length === 0 ? (
                  <div className="text-gray-500">No upcoming birthdays.</div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {upcomingBirthdays.map((b, i) => (
                      <div
                        key={i}
                        className="bg-[#f0f8ff] px-4 py-2 rounded shadow text-[#2aa2ff] font-medium border border-[#1474ED] flex items-center justify-between min-w-[260px] w-fit"
                      >
                        <div>
                          {b.name}{" "}
                          <span className="text-[#1474ED] font-normal">
                            ({b.date})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {isSoon(b.date) && (
                            <span className="bg-[#2aa2ff] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                              Soon
                            </span>
                          )}
                          <span className="text-2xl">🎂</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border mt-24">
              <div className="flex justify-between items-center mb-[30px] relative">
                <h2 className="text-2xl font-semibold ml-5">BIRTHDAY WISHES</h2>
              </div>

              <div className="relative">
                <img
                  src={Image}
                  className="absolute right-0 -top-[170px] text-[70px] -z-10 opacity-90"
                />

                <div className="flex flex-wrap gap-[30px] justify-between w-full">
                  {messages.length === 0 ? (
                    <div className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
                      <h3 className="text-lg font-semibold mb-2.5">
                        No messages yet
                      </h3>
                      <p className="text-sm text-[#555] leading-normal">
                        Be the first to wish someone a happy birthday!
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]"
                      >
                        <h3 className="text-lg font-semibold mb-2.5">
                          Birthday Wish
                        </h3>
                        <p className="text-sm text-[#555] leading-normal">
                          {message.text}
                        </p>
                        <p className="text-xs text-[#888] mt-2.5 leading-normal">
                          Posted on: {message.timestamp}
                          {message.author && (
                            <span className="ml-2 text-[#2aa2ff] font-semibold">
                              — {message.author}
                            </span>
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <img
                  src={MyImage}
                  alt="Gift"
                  className="absolute top-[250px] -left-[112px] w-[120px] -z-10 opacity-90 -translate-y-[20%] ml-[15px] mb-[90px]"
                />
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 relative font-['Poppins',sans-serif] flex flex-col items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-[180px] h-[36px] text-base font-normal border border-[#d3d3d3] rounded px-3 py-1 mb-1 focus:border-[#2aa2ff] outline-none mt-6"
                    maxLength={20}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Click to type birthday wishes to the born baby"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-[70%] h-[50px] text-2xl font-medium font-['Poppins',sans-serif] border-none border-l-3 border-[#d3d3d3] outline-none px-5 py-2.5 mx-auto my-[30px] block text-[#333] bg-white mt-4"
                    required
                  />
                  <button
                    type="submit"
                    className={`absolute right-5 top-[100px] w-[200px] h-[50px] rounded-[40px] cursor-pointer text-xl transition-all duration-300 ease-in-out border border-[#2aa2ff] ${
                      clicked
                        ? "bg-[#2aa2ff] text-white"
                        : "bg-white text-[#2aa2ff]"
                    }`}
                  >
                    POST
                  </button>
                </form>
                <div className="mb-12" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>
        <NewsletterFooter />
      </div>
    </div>
  );
};

export default Birthdays;
