import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

function toPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text).join(""))
    .join("\n\n");
}

const Card = ({ title, image, body, authorName, authorImage, publishedAt }) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      navigate("/union");
    }, 1500);
  };

  const displayTitle = title || "";
  const displayImage = image
    ? urlFor(image).width(800).height(500).fit("crop").url()
    : "";
  const displayExcerpt = body ? toPlainText(body) : "";
  const displayAuthor = authorName || "";
  const displayDate = publishedAt ? new Date(publishedAt).toDateString() : "";

  return (
    <div className="w-full max-w-[380px] mb-10">
      <div className="glass-effect rounded-2xl p-6 relative overflow-hidden bg-white/70 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 group">
        {/* Image Container */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          {displayImage ? (
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-[220px] bg-gray-200" />
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
          <h2 className="text-xl font-bold text-gray-800 leading-tight font-heading">
            {displayTitle}
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-readable font-body">
            {displayExcerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              {authorImage ? (
                <img
                  src={
                    authorImage
                      ? urlFor(authorImage)
                          .width(64)
                          .height(64)
                          .fit("crop")
                          .url()
                      : ""
                  }
                  alt={displayAuthor}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {displayAuthor ? displayAuthor.slice(0, 2).toUpperCase() : ""}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800 font-heading">
                  {displayAuthor}
                </p>
                <p className="text-xs text-gray-500 font-body">{displayDate}</p>
              </div>
            </div>
          </div>

          {/* Read More Link */}
          <button
            onClick={handleReadMore}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            Read more
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
