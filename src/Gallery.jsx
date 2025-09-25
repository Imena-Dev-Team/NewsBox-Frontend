import React, { useState, useEffect } from "react";
import "./gallery.css";
import { client } from "./sanityClient";
// Footer is rendered globally in App

const Gallery = () => {
  const [data, setData] = useState([]);
  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const getImg = (imgSrc, index) => {
    setTempImgSrc(imgSrc);
    setCurrentIndex(index);
    setModel(true);
  };

  const prevImage = () => {
    let newIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    setTempImgSrc(data[newIndex].imgSrc);
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    let newIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
    setTempImgSrc(data[newIndex].imgSrc);
    setCurrentIndex(newIndex);
  };

  // Fetch images from Sanity
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = `*[_type == "images"]{
          _id,
          title,
          "imageUrl": image.asset->url,
          "alt": image.alt
        }`;

        const images = await client.fetch(query);

        // Transform Sanity data to match our component structure
        const transformedImages = images.map((image, index) => ({
          id: image._id,
          imgSrc: image.imageUrl,
          title: image.title,
          alt: image.alt || `Gallery image ${index + 1}`,
        }));

        setData(transformedImages);

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setLoading(false);
          }
        }, 50);
      } catch (error) {
        console.error("Error fetching images from Sanity:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!model) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        nextImage();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        prevImage();
      } else if (e.key === "Escape") {
        setModel(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [model, currentIndex]);

  return (
    <div className="bg-gray-50">
      {loading && (
        <div className="h-1.5 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 my-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">
              Open Gallery
            </h1>
            {!loading && (
              <div className="text-sm text-gray-500">{data.length} photos</div>
            )}
          </div>

          {/* Lightbox */}
          <div
            className={model ? "model open" : "model"}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              className="close-btn"
              aria-label="Close"
              onClick={() => setModel(false)}
            >
              &times;
            </button>
            <button
              className="arrow prev"
              aria-label="Previous"
              onClick={prevImage}
            >
              &#10094;
            </button>
            {tempimgSrc && data[currentIndex] && (
              <img src={tempimgSrc} alt={data[currentIndex].alt} />
            )}
            <button
              className="arrow next"
              aria-label="Next"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>

          {/* Grid */}
          <div className="gallery">
            {loading
              ? Array.from({ length: 24 }).map((_, index) => (
                  <div className="skeleton-box" key={index} />
                ))
              : data.map((item, index) => (
                  <div
                    className="pics"
                    key={index}
                    onClick={() => getImg(item.imgSrc, index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open image ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        getImg(item.imgSrc, index);
                    }}
                  >
                    <img src={item.imgSrc} alt={item.alt} />
                  </div>
                ))}
          </div>

          {/* See More */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                window.open("https://photos.google.com/", "_blank")
              }
              className="btn-secondary px-6 py-3"
            >
              See more
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          
        </div>
      </div>
    </div>
  );
};

export default Gallery;
