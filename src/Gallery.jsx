import React, { useState, useEffect } from "react";
import './gallery.css';
import Img1 from './photos/blur.jpg';
import Img2 from './photos/img.png';
import Img3 from './photos/candle.jpg';
import Img4 from './photos/dp.jpg';
import Img5 from './photos/logo.jpg';
import Img6 from './photos/eyo.png';
import NewsletterFooter from "./components/Footer";
import Header from "./components/Header";

const Gallery = () => {
  let data = [
    { id: 1, imgSrc: Img1 }, { id: 2, imgSrc: Img2 },
    { id: 3, imgSrc: Img3 }, { id: 4, imgSrc: Img4 },
    { id: 5, imgSrc: Img5 }, { id: 6, imgSrc: Img6 },
    { id: 7, imgSrc: Img1 }, { id: 8, imgSrc: Img2 },
    { id: 9, imgSrc: Img3 }, { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 }, { id: 12, imgSrc: Img6 },
     { id: 5, imgSrc: Img5 }, { id: 6, imgSrc: Img6 },
    { id: 7, imgSrc: Img1 }, { id: 8, imgSrc: Img2 },
    { id: 9, imgSrc: Img3 }, { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 }, { id: 12, imgSrc: Img6 },
    { id: 9, imgSrc: Img3 }, { id: 10, imgSrc: Img4 },
    { id: 11, imgSrc: Img5 }, { id: 12, imgSrc: Img6 },
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
      setProgress(prev => {
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

  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      <Header />

      
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

      <div
        style={{
          margin: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          justifyContent: "center",
          padding: "40px 60px",
          height: "1350px",
          marginLeft: "50px",
          marginTop: "30px",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: "600",
            fontSize: "20px",
            paddingLeft: "10px",
          }}
        >
          Open Gallery
        </p>

        <div className={model ? "model open" : "model"}>
          <span className="close-btn" onClick={() => setModel(false)}>&times;</span>
          <button className="arrow prev" onClick={prevImage}>&#10094;</button>
          <img src={tempimgSrc} alt="expanded" />
          <button className="arrow next" onClick={nextImage}>&#10095;</button>
        </div>

        <div className="gallery">
          {loading
            ? 
              Array.from({ length: 25 }).map((_, index) => (
                <div className="skeleton-box" key={index}></div>
              ))
            : 
              data.map((item, index) => (
                <div
                  className="pics"
                  key={index}
                  onClick={() => getImg(item.imgSrc, index)}
                >
                  <img src={item.imgSrc} alt={`img-${index}`} />
                </div>
              ))}
        </div>

        <div style={{ marginLeft: "600px", marginTop: "30px" }}>
          <button
            onClick={() => window.open("https://photos.google.com/", "_blank")}
            style={{
              height: "40px",
              width: "180px",
              borderRadius: "8px",
              border: "none",
              fontFamily: '"Poppins", sans-serif',
              fontWeight: "600",
              backgroundColor: "#1474ED",
              color: "white",
            }}
          >
            SEE MORE
          </button>
        </div>

        <div style={{ position: "relative", left: "-90px", marginTop: "100px" }}>
          <NewsletterFooter />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
