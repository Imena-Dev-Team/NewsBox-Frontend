import React, { useState, useEffect } from "react";
import MyImage from "../bd.png";
import Image from "../pt.png";
import { authService } from "../services/apiService";

const BirthdaySkeleton = () => (
  <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border mt-24">
    <div className="flex justify-between items-center mb-[30px] relative">
      <div className="h-8 w-60 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-4"></div>
    </div>
    <div className="relative">
      <div className="absolute right-0 -top-[170px] w-32 h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full opacity-80" />
      <div className="flex flex-wrap gap-[30px] justify-between w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
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
  const [loadingBirthdays, setLoadingBirthdays] = useState(true);
  const [error, setError] = useState("");
  const [todayBirthdays, setTodayBirthdays] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  useEffect(() => {
    setProgress(0);
    setShowProgress(true);
    setLoading(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 300);
          setTimeout(() => setLoading(false), 300);
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

  // Fetch birthdays from API
  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoadingBirthdays(true);
        const res = await authService.getBirthdays();
        const payload = res?.data || res || {};
        const todays = payload.todaysBirthdays || payload.todayBirthdays || [];
        const upcoming = payload.upcomingBirthdays || [];
        setTodayBirthdays(todays);
        setUpcomingBirthdays(upcoming);
      } catch (err) {
        setError(err?.message || "Failed to load birthdays");
        setTodayBirthdays([]);
        setUpcomingBirthdays([]);
      } finally {
        setLoadingBirthdays(false);
      }
    };
    fetchBirthdays();
  }, []);

  function isSoon(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = (date - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff < 2;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {showProgress && (
        <div style={{ height: "6px", backgroundColor: "#e0e0e0", margin: 0 }}>
          <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#1474ED", transition: "width 0.3s" }} />
        </div>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <BirthdaySkeleton />
        ) : (
          <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border mt-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8 mt-2 w-full ml-10">
              <div className="flex-1 min-w-[220px] ml-[14px]">
                <h2 className="text-xl font-bold mb-2 text-[#1474ED]"> 🎉 Today's Birthdays </h2>
                {loadingBirthdays ? (
                  <div className="text-gray-500">Loading...</div>
                ) : todayBirthdays.length === 0 ? (
                  <div className="text-gray-500">No birthdays today.</div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {todayBirthdays.map((b) => (
                      <div key={b._id || b.name} className="bg-[#e3f0fd] px-6 py-3 rounded-lg shadow text-[#1474ED] font-semibold border border-[#2aa2ff]">
                        {b.name || b.fullName || "Member"}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-[260px]">
                <h2 className="text-lg font-semibold mb-2 text-[#2aa2ff]"> 🔔 Upcoming Birthdays </h2>
                {loadingBirthdays ? (
                  <div className="text-gray-500">Loading...</div>
                ) : upcomingBirthdays.length === 0 ? (
                  <div className="text-gray-500">No upcoming birthdays.</div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {upcomingBirthdays.map((b) => (
                      <div key={b._id || `${b.name}-${b.birthdayFormatted || b.date}`} className="bg-[#f0f8ff] px-4 py-2 rounded shadow text-[#2aa2ff] font-medium border border-[#1474ED] flex items-center justify-between min-w-[260px] w-fit">
                        <div>
                          {(b.name || b.fullName || "Member")} {" "}
                          <span className="text-[#1474ED] font-normal"> ({b.birthdayFormatted || b.date}) </span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {(typeof b.daysUntilBirthday === 'number' ? b.daysUntilBirthday <= 2 : isSoon(b.date)) && (
                            <span className="bg-[#2aa2ff] text-white text-xs px-2 py-0.5 rounded-full font-semibold"> Soon </span>
                          )}
                          <span className="text-2xl">🎂</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}></div>
    </div>
  );
};

export default Birthdays;
