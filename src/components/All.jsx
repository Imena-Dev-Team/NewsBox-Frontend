"use client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Footer is rendered globally in App
import { client } from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Build URLs for Sanity images
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

// Simple placeholder while loading
const CardSkeleton = () => (
  <div
    style={{
      height: 370,
      margin: "20px 70px",
      background: "#eee",
      borderRadius: 25,
    }}
  />
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
    <div style={{ backgroundColor: "#FAFAFA", paddingBottom: "120px" }}>
      {pending ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-blue-600 font-semibold">Loading Blog...</p>
        </div>
      ) : (
        <>
          {loading && (
            <div
              style={{
                height: 6,
                backgroundColor: "#e0e0e0",
                marginBottom: 30,
              }}
            >
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

          {!loading && error && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                padding: 12,
                borderRadius: 8,
                margin: "0 70px 20px",
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div
              style={{
                margin: "0 70px",
                background: "#FFF",
                borderRadius: 12,
                padding: 24,
                color: "white",
              }}
            >
              No posts found. Create a `post` document in Sanity Studio and
              publish it.
            </div>
          )}

          {loading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <CardSkeleton key={i} />
              ))
            : currentPageContent.map((card, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: 40,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(card.slug)}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      height: 390,
                      marginLeft: 70,
                      borderRadius: 25,
                      width: "87%",
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        maxWidth: 600,
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "flex-start",
                          backgroundColor: "#E3F2FD",
                          color: "#1E88E5",
                          padding: "8px 16px",
                          borderRadius: 20,
                          fontWeight: 600,
                        }}
                      >
                        {card.categories}
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 700 }}>
                        {card.title}
                      </h2>
                      <p style={{ color: "#6B7280" }}>
                        {card.summary || "No summary available"}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {card.authorImage && (
                            <img
                              src={urlFor(card.authorImage)
                                .width(48)
                                .height(48)
                                .url()}
                              alt={card.authorName}
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                marginRight: 12,
                              }}
                            />
                          )}
                          <div>
                            <div style={{ fontWeight: 600 }}>
                              {card.authorName}
                            </div>
                            <div style={{ fontSize: 14, color: "#9CA3AF" }}>
                              {card.publishedAt
                                ? new Date(card.publishedAt).toDateString()
                                : ""}
                            </div>
                          </div>
                        </div>
                        {/* Read more button */}
                        {card.slug?.current && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(card.slug);
                            }}
                            style={{
                              marginTop: 12,
                              padding: '8px 14px',
                              borderRadius: 8,
                              backgroundColor: '#1E88E5',
                              color: 'white',
                              fontWeight: 600,
                            }}
                          >
                            Read more
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {card.image ? (
                    <img
                      src={urlFor(card.image)
                        .width(700)
                        .height(310)
                        .fit("crop")
                        .url()}
                      alt={card.title || "Post image"}
                      style={{
                        height: 310,
                        left: 840,
                        position: "absolute",
                        top: 30,
                        borderRadius: 25,
                        width: "35%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#E9E9E9",
                        height: 320,
                        left: 840,
                        position: "absolute",
                        top: 30,
                        borderRadius: 25,
                        width: "35%",
                      }}
                    />
                  )}
                </div>
              ))}

          {/* Pagination */}
          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  color: currentPage === i + 1 ? "#1E88E5" : "#6B7280",
                  fontWeight: currentPage === i + 1 ? "bold" : "normal",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || loading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Duplicates;
