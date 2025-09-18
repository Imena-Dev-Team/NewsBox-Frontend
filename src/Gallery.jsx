import React, { useState, useEffect } from "react";
import "./gallery.css";
import Img1 from "./photos/blur.jpg";
import Img2 from "./photos/img.png";
import Img3 from "./photos/candle.jpg";
import Img4 from "./photos/dp.jpg";
import Img5 from "./photos/logo.jpg";
import Img6 from "./photos/eyo.png";
import NewsletterFooter from "./components/Footer";

const Gallery = () => {
  let data = [
    { id: 1, imgSrc: Img1 },
    { id: 2, imgSrc: Img2 },
    { id: 3, imgSrc: Img3 },
    { id: 4, imgSrc: Img4 },
    { id: 5, imgSrc: Img5 },
    { id: 6, imgSrc: Img6 },
    { id: 7, imgSrc: Img1 },
    { id: 8, imgSrc: Img2 },
    { id: 9, imgSrc: Img3 },
    { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 },
    { id: 12, imgSrc: Img6 },
    { id: 5, imgSrc: Img5 },
    { id: 6, imgSrc: Img6 },
    { id: 7, imgSrc: Img1 },
    { id: 8, imgSrc: Img2 },
    { id: 9, imgSrc: Img3 },
    { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 },
    { id: 12, imgSrc: Img6 },
    { id: 9, imgSrc: Img3 },
    { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 },
    { id: 12, imgSrc: Img6 },
    { id: 12, imgSrc: Img6 },
  ];

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">Open Gallery</h1>
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
            <button className="arrow prev" aria-label="Previous" onClick={prevImage}>
              &#10094;
            </button>
            {tempimgSrc && (
              <img src={tempimgSrc} alt="Selected" />
            )}
            <button className="arrow next" aria-label="Next" onClick={nextImage}>
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
                      if (e.key === "Enter" || e.key === " ") getImg(item.imgSrc, index);
                    }}
                  >
                    <img src={item.imgSrc} alt={`Gallery image ${index + 1}`} />
                  </div>
                ))}
          </div>

          {/* See More */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => window.open("https://photos.google.com/", "_blank")}
              className="btn-secondary px-6 py-3"
            >
              See more
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <NewsletterFooter />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
