import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// removed unused toPlainText helper

const Card = ({
  title,
  image,
  summary,
  authorName,
  authorImage,
  publishedAt,
  slug,
}) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    if (!slug) return;
    setPending(true);
    setTimeout(() => {
      setPending(false);
      navigate(`/union/${slug}`);
    }, 300);
  };

  const displayTitle = title || "";
  const displayImage = image
    ? urlFor(image)
        .width(1200)
        .height(900)
        .fit("crop")
        .auto("format")
        .quality(75)
        .url()
    : "";
  const displayExcerpt = summary || "";
  const displayAuthor = authorName || "";
  const displayDate = publishedAt ? new Date(publishedAt).toDateString() : "";

  return (
    <div className="w-full max-w-[640px] mb-10 cursor-pointer">
      <div className="rounded-3xl p-7 relative overflow-hidden bg-white border border-gray-200 transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1 group">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/3]">
          {displayImage ? (
            <img
              src={displayImage}
              alt={displayTitle}
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
              Family News
            </span>
            <span className="text-xs text-gray-500">5 min read</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-gray-900 leading-snug font-heading">
            {displayTitle}
          </h2>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed font-body">
            {displayExcerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              {authorImage ? (
                <img
                  src={
                    authorImage
                      ? urlFor(authorImage)
                          .width(64)
                          .height(64)
                          .fit("crop")
                          .auto("format")
                          .url()
                      : ""
                  }
                  alt={displayAuthor}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="40"
                  height="40"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {displayAuthor ? displayAuthor.slice(0, 2).toUpperCase() : ""}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 font-heading">
                  {displayAuthor}
                </p>
                <p className="text-xs text-gray-500 font-body">{displayDate}</p>
              </div>
            </div>
          </div>

          {/* Read More Link */}
          <button
            onClick={handleReadMore}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={`Read more about ${displayTitle}`}
          >
            Read more
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {pending && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  Loading blog...
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Preparing your reading experience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
