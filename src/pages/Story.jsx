import React, { useEffect, useMemo, useState } from "react";
import { client } from "../sanityClient";

export default function PaginatedShowcase() {
  const [pageIndex, setPageIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const storiesQuery = `*[_type == "story"]|order(_createdAt asc){
          _id,
          title,
          "description": coalesce(pt::text(body), ""),
          image{asset->{url}}
        }`;

        const testimonialsQuery = `*[_type == "testimonials"]|order(_createdAt desc){
          _id,
          "name": title,
          "quote": coalesce(pt::text(body), ""),
          image{asset->{url}},
          dateWritten
        }`;

        const [storiesData, testimonialsData] = await Promise.all([
          client.fetch(storiesQuery),
          client.fetch(testimonialsQuery),
        ]);

        if (!isMounted) return;

        setStories(
          (storiesData || []).map((s) => ({
            id: s._id,
            title: s.title,
            description: s.description,
            image: s?.image?.asset?.url || "",
          }))
        );

        setTestimonials(
          (testimonialsData || []).map((t) => ({
            id: t._id,
            name: t.name,
            quote: t.quote,
            avatar: t?.image?.asset?.url || "",
            dateWritten: t.dateWritten,
          }))
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load stories/testimonials", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const current = useMemo(() => stories[pageIndex], [stories, pageIndex]);
  const isFirst = pageIndex === 0;
  const isLast = stories.length ? pageIndex === stories.length - 1 : true;

  const goPrev = () => !isFirst && setPageIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    !isLast && setPageIndex((i) => Math.min((stories.length || 1) - 1, i + 1));
  const goTo = (i) => setPageIndex(i);

  // Format date for MM-YYYY badge
  const formatDateForBadge = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  return (
    <main className="w-full min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center text-gray-900">
            Our stories
          </h1>
          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-gray-500">Page</span>
            <span className="text-sm font-medium text-blue-700">
              {stories.length ? pageIndex + 1 : 0} / {stories.length}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {current ? (
              <img
                key={current.id}
                src={current.image}
                alt={current.title}
                className="h-[900px] sm:h-[500px] w-full object-cover transition-all duration-500 ease-out opacity-0 [animation:fade-in_.6s_ease-out_forwards]"
              />
            ) : (
              <div className="h-[900px] sm:h-[500px] w-full flex items-center justify-center text-gray-400">
                {loading ? "Loading..." : "No stories found"}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div>
              <h2
                key={`title-${current?.id || "empty"}`}
                className="text-xl sm:text-2xl font-semibold text-gray-900 transition-all duration-500 ease-out opacity-0 [animation:slide-up_.5s_ease-out_forwards]"
              >
                {current?.title || (loading ? "Loading..." : "No title")}
              </h2>
              <p
                key={`desc-${current?.id || "empty"}`}
                className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed transition-all duration-500 ease-out opacity-0 [animation:slide-up_.6s_.1s_ease-out_forwards]"
              >
                {current?.description ||
                  (loading
                    ? "Fetching content..."
                    : "No description available.")}
              </p>
            </div>

            <nav className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                disabled={isFirst || !stories.length}
                aria-label="Previous page"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1A74ED] bg-[#1A74ED] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1A74ED]/30 disabled:cursor-not-allowed disabled:border-blue-200 disabled:bg-blue-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-2" aria-label="Pagination">
                {stories.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={
                      "h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 " +
                      (i === pageIndex
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50")
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={isLast || !stories.length}
                aria-label="Next page"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-200 disabled:bg-blue-200"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.length === 0 && (
              <div className="col-span-full text-sm text-gray-500">
                {loading ? "Loading testimonials..." : "No testimonials found."}
              </div>
            )}
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                {/* Date Badge */}
                {t.dateWritten && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 border border-blue-200">
                      {formatDateForBadge(t.dateWritten)}
                    </span>
                  </div>
                )}
                
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    className="h-12 w-12 aspect-square shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 ring-2 ring-blue-100" />
                )}
                <div className="flex-1 pr-16">
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {t.quote ? `"${t.quote}"` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slide-up { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </main>
  );
}
