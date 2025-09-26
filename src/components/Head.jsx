import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import Birthday from "./birthday_Card";
// Footer is rendered globally in App
import { client } from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [featuredPosts, setFeaturedPosts] = useState([]);

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIstransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // Reset loading state when route changes
  useEffect(() => {
    setLoading(true);
    setProgress(0);
  }, [location.pathname]);

  // Fetch featured posts for carousel
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "post"] | order(publishedAt desc)[0...3]{
            title,
            summary,
            image,
            publishedAt,
            categories,
            slug,
            "authorName": author->name,
            "authorImage": author->image
          }`
        );
        setFeaturedPosts(data);
      } catch (e) {
        console.error("Error fetching featured posts:", e);
      }
    };
    fetchFeaturedPosts();
  }, []);

  useEffect(() => {
    if (featuredPosts.length === 0) return;

    const timer = setInterval(() => {
      setIstransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % featuredPosts.length);
        setIstransitioning(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "post"] | order(publishedAt desc)[0...6]{
            title,
            summary,
            image,
            publishedAt,
            categories,
            slug,
            "authorName": author->name,
            "authorImage": author->image
          }`
        );
        setPosts(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load posts");
      }
    };
    fetchPosts();
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
          ) : null}

          <div className="w-full lg:w-[45%] mt-4 lg:mt-[80px]">
            {loading ? (
              <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"></div>
            ) : featuredPosts.length > 0 ? (
              <img
                src={urlFor(featuredPosts[index]?.image)
                  .width(800)
                  .height(600)
                  .fit("crop")
                  .url()}
                alt={featuredPosts[index]?.title}
                className="w-full h-auto rounded-2xl object-cover"
              />
            ) : null}
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

                <div className="flex items-center mt-5 gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="w-24 h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-8">
                  <div className="w-8 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
              </>
            ) : (
              <>
                <button className="rounded-2xl px-4 py-2 bg-transparent text-[#1A74ED] mb-4 font-semibold text-sm sm:text-base border border-[#1A74ED]">
                  {featuredPosts[index]?.categories || "POST"}
                </button>
                <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 tracking-wider">
                  {featuredPosts[index]?.title || "Loading..."}
                </h2>
                <p className="text-[#808080] font-light text-sm sm:text-base">
                  {featuredPosts[index]?.summary || "No summary available"}
                </p>

                <div className="flex items-center mt-5 gap-3">
                  {featuredPosts[index]?.authorImage ? (
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={urlFor(featuredPosts[index].authorImage)
                        .width(80)
                        .height(80)
                        .url()}
                      alt={featuredPosts[index]?.authorName}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {featuredPosts[index]?.authorName
                        ?.charAt(0)
                        ?.toUpperCase() || "A"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm sm:text-base">
                      {featuredPosts[index]?.authorName || "Anonymous"}
                    </h3>
                    <span className="font-extralight text-[#98A0A2] text-xs">
                      {featuredPosts[index]?.publishedAt
                        ? new Date(
                            featuredPosts[index].publishedAt
                          ).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-8">
                  {featuredPosts.map((_, i) => (
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
                className="px-5 py-2 text-[#1A74ED] rounded border border-[#1A74ED] text-center font-semibold text-sm sm:text-base hover:bg-[#F5F9FF] transition-colors"
                onClick={() => navigate("/all")}
              >
                See more
              </button>
            </>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center mt-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
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
            : posts.map((p, i) => (
                <Card
                  key={i}
                  title={p.title}
                  image={p.image}
                  summary={p.summary}
                  authorName={p.authorName}
                  authorImage={p.authorImage}
                  publishedAt={p.publishedAt}
                  slug={p.slug?.current}
                />
              ))}
        </div>

        {/* Birthday Section - Commented Out */}
        {/*
        <div className="mt-16">
          {loading ? (
            <div className="flex flex-col lg:flex-row gap-8">
              // Left Section Skeleton
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

              // Right Section Skeleton
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
        */}
      </div>
      
    </>
  );
};

export default Head;
