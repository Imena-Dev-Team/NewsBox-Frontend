import React, { useState } from "react";
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
    { id: 13, imgSrc: Img1 }, { id: 14, imgSrc: Img2 },
    { id: 15, imgSrc: Img3 }, { id: 16, imgSrc: Img4 },
    { id: 17, imgSrc: Img5 }, { id: 18, imgSrc: Img6 },
    { id: 19, imgSrc: Img1 }, { id: 20, imgSrc: Img2 },
    { id: 21, imgSrc: Img3 }, { id: 22, imgSrc: Img4 },
    { id: 23, imgSrc: Img5 }, { id: 24, imgSrc: Img6 },
    { id: 25, imgSrc: Img1 },
  ];

  
  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

 
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

  return (
   <div style={{backgroundColor:"#FAFAFA", padding:"0", margin:"0"}}>

      <Header/>
      <div
      style={{
        margin: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        justifyContent: "center",
        paddingTop: "40px",
        paddingLeft: "60px",
        paddingRight: "60px",
        height:"1350px",
        marginLeft: "50px",
        marginTop:"30px",
        borderTop:"1px solid rgba(0, 0, 0, 0.1)",
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

      <div className={model ? "model open" : "model"} >
         <span  className="close-btn" onClick={() => setModel(false)}>  &times;</span>
      
        <button className="arrow prev" onClick={prevImage}>&#10094;</button>

        
        <img src={tempimgSrc} alt="expanded" />

        
        <button className="arrow next" onClick={nextImage}>&#10095;</button>
      </div>

      <div className="gallery">
        {data.map((item, index) => (
          <div
            className="pics"
            key={index}
            onClick={() => getImg(item.imgSrc, index)}
          >
            <img src={item.imgSrc} />
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

      <div style={{ position: "relative", left:"-90px", marginTop: "100px" }}>
        <NewsletterFooter />
      </div>
    </div>
   </div>
  );
};

export default Gallery;
