import React, { useState, useEffect } from "react";
import ".././assets/styles/gallery.css";
import { client } from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import NewsletterFooter from "../components/Footer";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
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
    let newIndex =
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setTempImgSrc(galleryImages[newIndex].imgSrc);
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    let newIndex =
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setTempImgSrc(galleryImages[newIndex].imgSrc);
    setCurrentIndex(newIndex);
  };

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    const images = gallery.gallery.map((image, index) => ({
      id: `${gallery._id}-${index}`,
      imgSrc: urlFor(image).width(800).height(600).fit("crop").url(),
      alt: image.alt || `${gallery.title} - Image ${index + 1}`,
      title: gallery.title,
    }));
    setGalleryImages(images);
    setCurrentIndex(0);
    setModel(false);
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    setGalleryImages([]);
    setModel(false);
  };

  // Fetch galleries from Sanity
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const query = `*[_type == "images"]{
          _id,
          title,
          image{
            ...,
            asset->{
              _id,
              url,
              metadata
            }
          },
          gallery[]{
            ...,
            asset->{
              _id,
              url,
              metadata
            }
          }
        }`;

        const galleriesData = await client.fetch(query);
        console.log("Raw galleries data:", galleriesData);

        const transformedGalleries = galleriesData.map((gallery) => {
          const previewImage = gallery.image || gallery.gallery?.[0] || null;
          let previewUrl = null;
          if (previewImage) {
            try {
              if (previewImage.asset) {
                previewUrl = urlFor(previewImage)
                  .width(400)
                  .height(300)
                  .fit("crop")
                  .url();
              } else {
                previewUrl = urlFor(previewImage)
                  .width(400)
                  .height(300)
                  .fit("crop")
                  .url();
              }
            } catch (error) {
              console.error(
                `Error generating URL for gallery "${gallery.title}":`,
                error
              );
            }
          }

          return {
            _id: gallery._id,
            title: gallery.title,
            image: gallery.image,
            gallery: gallery.gallery || [],
            previewUrl: previewUrl,
            imageCount: gallery.gallery ? gallery.gallery.length : 0,
          };
        });

        setGalleries(transformedGalleries);

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

    fetchGalleries();
  }, []);

  useEffect(() => {
    if (!model) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        nextImage();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        prevImage();
      } else if (e.key === "Escape") {
        if (selectedGallery) {
          closeGallery();
        } else {
          setModel(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [model, currentIndex, selectedGallery]);

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

      <div className="w-full px-4">
        <div className="rounded-2xl p-6 md:p-10 my-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-10 text-2xl md:text-3xl font-bold text-blue-600  font-heading">
              Open Gallery
            </h1>
            {!loading && (
              <div className="text-md text-blue-600">
                {galleries.length} galleries
              </div>
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
            {tempimgSrc && galleryImages[currentIndex] && (
              <img src={tempimgSrc} alt={galleryImages[currentIndex].alt} />
            )}
            <button
              className="arrow next"
              aria-label="Next"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>

          {/* Gallery Grid */}
          {selectedGallery ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeGallery}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Galleries
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedGallery.title}
                </h2>
                <div className="text-sm text-gray-500">
                  {galleryImages.length} photos
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 w-full aspect-[4/3]"
                    onClick={() => getImg(image.imgSrc, index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open image ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") 
                        getImg(image.imgSrc, index);
                    }}
                  >
                    <img
                      src={image.imgSrc}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-opacity-90 rounded-full p-2">
                          <svg
                            className="w-6 h-6 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-xl w-full aspect-[4/3]"
                    ></div>
                  ))
                : galleries.map((gallery) => (
                    <div
                      key={gallery._id}
                      className="w-full rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => openGallery(gallery)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${gallery.title} gallery`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") openGallery(gallery);
                      }}
                    >
                      {gallery.previewUrl ? (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={gallery.previewUrl}
                            alt={gallery.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent text-gray-200 "></div>
                          <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-sm font-medium">
                            {gallery.imageCount} photos
                          </div>
                        </div>
                      ) : (
                        <div className="h-64 bg-gray-200 flex items-center justify-center w-full">
                          <div className="text-gray-400 text-center">
                            <svg
                              className="w-12 h-12 mx-auto mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm">No preview</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-blue-600 group-hover:text-blue-900 transition-colors duration-300">
                          {gallery.title}
                        </h3>
                        <p className="text-md text-gray-600 mt-1">
                          {gallery.imageCount}{" "}
                          {gallery.imageCount === 1 ? "photo" : "photos"}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;