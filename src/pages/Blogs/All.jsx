"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Build URLs for Sanity images
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// removed unused toPlainText helper

// Simple placeholder while loading
const CardSkeleton = () => (
  <div className="w-full max-w-[350px]">
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
);

function Duplicates() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const pageSize = 6;
  const totalPages = Math.ceil(posts.length / pageSize);
  const currentPageContent = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Fetch posts from Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "post"] | order(publishedAt desc){
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
        console.log("Sanity posts fetched:", data);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setError(
          "Could not load posts. If your dataset is private, add a read token and set CORS for your dev origin."
        );
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Fake progress bar
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 3));
    }, 50);
    return () => clearInterval(id);
  }, [loading]);

  const handleCardClick = (slug) => {
    if (!slug?.current) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      navigate(`/union/${slug.current}`);
    }, 500);
  };

  return (
    <div className="pb-24">
      {pending ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-blue-600 font-semibold">Loading Blog...</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 max-w-7xl">
          {loading && (
            <div className="h-1.5 bg-gray-200 mb-8">
              <div
                className="h-full bg-blue-600 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="bg-blue-100 text-blue-800 p-6 rounded-xl">
              No posts found. Create a `post` document in Sanity Studio and
              publish it.
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 mb-8">
            <h1 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-0">
              All Blogs
            </h1>
            
          </div>
          <p className="text-gray-600 max-w-3xl mb-6">
            Explore stories, updates, and insights from our community. New posts are added regularly—dive in to stay informed and inspired.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center mt-8">
            {loading
              ? Array.from({ length: pageSize }).map((_, i) => (
                  <div key={i} className="w-full max-w-[640px]">
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 mt-7">
                      {/* Card Image Skeleton */}
                      <div className="w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-3xl mb-5"></div>

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
              : currentPageContent.map((card, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[640px] mb-10 cursor-pointer"
                    onClick={() => handleCardClick(card.slug)}
                  >
                    <div className="rounded-3xl p-7 relative overflow-hidden bg-white border border-gray-200 transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1 group">
                      {/* Image Container */}
                      <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/3]">
                        {card.image ? (
                          <img
                            src={urlFor(card.image)
                              .width(1200)
                              .height(900)
                              .fit("crop")
                              .auto("format")
                              .quality(75)
                              .url()}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        {/* Category Badge */}
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-[#1A74ED] text-white text-xs font-semibold rounded-full">
                            {card.categories || "Family News"}
                          </span>
                          <span className="text-xs text-gray-500">5 min read</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-extrabold text-gray-900 leading-snug font-heading">
                          {card.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed font-body">
                          {card.summary || ""}
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                          <div className="flex items-center space-x-3">
                            {card.authorImage ? (
                              <img
                                src={urlFor(card.authorImage)
                                  .width(64)
                                  .height(64)
                                  .fit("crop")
                                  .auto("format")
                                  .url()}
                                alt={card.authorName}
                                className="w-10 h-10 rounded-full object-cover"
                                loading="lazy"
                                decoding="async"
                                width="40"
                                height="40"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {card.authorName
                                  ?.slice(0, 2)
                                  ?.toUpperCase() || ""}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-gray-900 font-heading">
                                {card.authorName}
                              </p>
                              <p className="text-xs text-gray-500 font-body">
                                {card.publishedAt
                                  ? new Date(card.publishedAt).toDateString()
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(card.slug);
                          }}
                          className="mt-4 text-blue-600 font-semibold"
                        >
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || loading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Duplicates;