import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from "react-router-dom";
import { client } from "../../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
// Footer is rendered globally in App

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Utility function to convert block content to plain text
function toPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child.text).join(""))
    .join("\n\n");
}

export default function FamilyReunion() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch post data from Sanity
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Starting to fetch post data...");
        console.log("Current slug:", slug);

        let query;
        if (slug) {
          // If slug is provided, fetch specific post
          query = `*[_type == "post" && slug.current == "${slug}"][0]{
            title,
            body,
            image{..., asset->},
            publishedAt,
            categories,
            "authorName": author->name,
            "authorImage": author->image
          }`;
          console.log("Fetching specific post with slug:", slug);
        } else {
          // If no slug, fetch the most recent post
          query = `*[_type == "post"] | order(publishedAt desc)[0]{
            title,
            body,
            image{..., asset->},
            publishedAt,
            categories,
            "authorName": author->name,
            "authorImage": author->image
          }`;
          console.log("Fetching most recent post");
        }

        // Test query to see if we have any posts at all
        const allPosts = await client.fetch(`*[_type == "post"]`);
        console.log("Total posts available:", allPosts.length);
        console.log("All posts:", allPosts);

        console.log("Sanity query:", query);
        const postData = await client.fetch(query);
        console.log("Fetched post data:", postData);

        if (postData) {
          setPost(postData);
          console.log("Post set successfully");
        } else {
          console.log("No post data found");
          setError("Post not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        console.error("Error details:", err.message);
        setError(`Failed to load post: ${err.message}`);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Add a simple connection test
  useEffect(() => {
    const testConnection = async () => {
      try {
        const testQuery = `*[_type == "post"][0...3]{title}`;
        const result = await client.fetch(testQuery);
        console.log("Connection test successful:", result);
      } catch (err) {
        console.error("Connection test failed:", err);
      }
    };
    testConnection();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full min-h-screen bg-white py-6 px-4">
          <div className="w-full p-0 space-y-6">
            {/* Loading skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </div>
              <div className="flex items-center pt-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="w-full min-h-screen bg-white py-6 px-4">
          <div className="w-full p-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/all"
                className="bg-[#1A74ED] text-white px-6 py-3 rounded-full hover:bg-[#125fcc] transition"
              >
                Back to All Posts
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <div className="w-full min-h-screen bg-white py-6 px-4">
          <div className="w-full p-0">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No Post Found
              </h2>
              <p className="text-gray-600 mb-6">
                The post you're looking for doesn't exist.
              </p>
              <Link
                to="/all"
                className="bg-[#1A74ED] text-white px-6 py-3 rounded-full hover:bg-[#125fcc] transition"
              >
                Back to All Posts
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post?.title ? `${post.title} – Imena News` : 'Imena News – Post'}</title>
        {post?.summary && (
          <meta name="description" content={post.summary} />
        )}
      </Helmet>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full overflow-hidden">
          {/* Header with back button and category */}
          <div className="px-4 md:px-10 lg:px-16 py-6">
            <div className="flex items-center gap-3">
              <Link to="/all">
                <div className="h-10 w-10 bg-[#1A74ED] text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-[#125fcc] transition cursor-pointer">
                  &lt;
                </div>
              </Link>
              <div className="flex flex-col">
                <span className="text-[#1A74ED] text-sm font-semibold uppercase tracking-wider">
                  {post.categories || "POST"}
                </span>
                {post.publishedAt && (
                  <span className="text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mx-64 md:px-10 lg:px-16 py-8 px-24 space-y-8">
            {/* Featured Image */}
            {post.image && (
              <div className="relative overflow-hidden">
                <img
                  src={urlFor(post.image)
                    .width(1600)
                    .height(900)
                    .fit("crop")
                    .auto("format")
                    .quality(75)
                    .url()}
                  alt={post.title}
                  className="w-full h-[42vh] md:h-[56vh] object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                {post.title}
              </h1>
              {post.summary && (
                <p className="text-gray-600 text-base md:text-lg">
                  {post.summary}
                </p>
              )}
            </div>

            {/* Content Body */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-6 text-base md:text-lg">
                {post.body && (
                  <div className="whitespace-pre-line">
                    {toPlainText(post.body)}
                  </div>
                )}
              </div>
            </div>

            {/* Author Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {post.authorImage ? (
                    <img
                      src={urlFor(post.authorImage).width(80).height(80).auto("format").url()}
                      alt={post.authorName}
                      className="w-16 h-16 rounded-full object-cover border border-gray-200"
                      loading="lazy"
                      decoding="async"
                      width="64"
                      height="64"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {post.authorName
                        ? post.authorName.charAt(0).toUpperCase()
                        : "A"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {post.authorName || "Anonymous Author"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Published{" "}
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "recently"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                to="/all"
                className="inline-flex items-center px-6 py-3 bg-[#1A74ED] text-white font-semibold rounded-full hover:bg-[#125fcc] transition"
              >
                ← Back to All Posts
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition"
              >
                ↑ Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
