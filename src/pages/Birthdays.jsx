import React, { useState, useEffect } from "react";
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
          <div key={i} className="bg-white w-full sm:w-1/2 lg:w-1/3 p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
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
  // removed unused clicked/message states
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingBirthdays, setLoadingBirthdays] = useState(true);
  const [fetchError, setFetchError] = useState("");
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

  // removed unused handleSubmit

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
        setFetchError(err?.message || "Failed to load birthdays");
        setTodayBirthdays([]);
        setUpcomingBirthdays([]);
      } finally {
        setLoadingBirthdays(false);
      }
    };
    fetchBirthdays();
  }, []);

// removed unused isSoon helper

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
          <div className="font-['Poppins',sans-serif] p-4 sm:p-6 md:p-10 box-border mt-8">
            {fetchError && (
              <div className="mx-4 mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                {fetchError}
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 mb-8 mt-2 w-full px-4">
              <div className="flex-1 min-w-[260px] ml-[14px]">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent flex items-center gap-2">
                  <span>🎉</span>
                  <span>Today's Birthdays</span>
                </h2>
                {loadingBirthdays ? (
                  <div className="text-gray-500">Loading...</div>
                ) : todayBirthdays.length === 0 ? (
                  <div className="text-gray-500 bg-white/60 border border-dashed border-blue-200 rounded-xl p-6">
                    No birthdays today.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {todayBirthdays.map((b) => {
                      const full = b.name || b.fullName || "Member";
                      const initials = full
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase();
                      return (
                        <div
                          key={b._id || full}
                          className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white font-bold flex items-center justify-center shadow">
                            {initials}
                          </div>
                          <div className="flex-1">
                            <div className="text-slate-800 font-semibold leading-tight">{full}</div>
                            <div className="text-slate-500 text-sm flex items-center gap-1">
                              <span className="inline-block animate-pulse">🎂</span>
                              <span>Happy Birthday!</span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-white bg-blue-600/90 rounded-full px-2 py-1 shadow hidden sm:inline-block group-hover:bg-blue-700">Today</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-[260px]">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-sky-500 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                  <span>🔔</span>
                  <span>Upcoming Birthdays</span>
                </h2>
                {loadingBirthdays ? (
                  <div className="text-gray-500">Loading...</div>
                ) : upcomingBirthdays.length === 0 ? (
                  <div className="text-gray-500 bg-white/60 border border-dashed border-blue-200 rounded-xl p-6">
                    No upcoming birthdays.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBirthdays.map((b) => {
                      const full = b.name || b.fullName || "Member";
                      const initials = full
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase();
                      const dateLabel = b.birthdayFormatted || b.date || '';
                      const daysUntil = typeof b.daysUntilBirthday === 'number' ? b.daysUntilBirthday : undefined;
                      const ageTurn = typeof b.ageTheyWillTurn === 'number' ? b.ageTheyWillTurn : undefined;
                      return (
                        <div
                          key={b._id || `${full}-${dateLabel}`}
                          className="group bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 hover:border-purple-200  transition"
                        >
                          <div className="flex flex-col sm:flex-row gap-5">
                            <div className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 mx-auto sm:mx-0">
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center shadow text-xl md:text-2xl">
                                {initials}
                              </div>
                              {b.profilePicUrl && (
                                <img
                                  src={b.profilePicUrl}
                                  alt={`${full} profile`}
                                  className="absolute inset-0 w-full h-full rounded-2xl object-cover"
                                  loading="lazy"
                                  decoding="async"
                                  sizes="(max-width: 640px) 80px, 96px"
                                  width="96"
                                  height="96"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg md:text-xl font-bold text-slate-800 truncate">{full}</h3>
                                {b.familyName && (
                                  <span className="text-xs md:text-[12px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{b.familyName}</span>
                                )}
                                {b.subFam && (
                                  <span className="text-xs md:text-[12px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">{b.subFam}</span>
                                )}
                              </div>
                              <div className="mt-1 text-slate-600 text-sm md:text-base flex flex-wrap items-center gap-2">
                                <span className="whitespace-nowrap">{dateLabel}</span>
                                {ageTurn !== undefined && (
                                  <span className="text-purple-700 bg-purple-50 border border-purple-100 rounded-full px-2 py-0.5 text-[11px] md:text-xs whitespace-nowrap">turning {ageTurn}</span>
                                )}
                                {typeof daysUntil === 'number' && (
                                  <span className={`text-[11px] md:text-xs px-2 py-0.5 rounded-full font-semibold ${daysUntil <= 2 ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                                    {daysUntil === 0 ? 'Today' : `in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 text-slate-500 text-sm break-words">
                                {b.email && (
                                  <a href={`mailto:${b.email}`} className="text-slate-700">
                                    {b.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
