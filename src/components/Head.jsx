import React, { useState, useEffect } from "react";
import Card from "./Card";
import Birthday from "./Birthday";
import { span, title } from "framer-motion/client";


const Head = () => {
  const Header = [
    {
      image: "src/assets/image6.png",
      title: "Embracing Togetherness ! Embarking Togetherness!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
        profile: "\src\assets\image2.jpg",
        user: "Devon Lane",
        time: "May 31, 2023"
    },

    {
      image: "src/assets/image5.png",
      title: "Let's Celebrate Togetherness ! Embarking Togetherness!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
        profile: "\src\assets\image2.jpg",
        user: "Devon Lane",
        time: "May 31, 2023"
    },

    {
      image: "src/assets/image3.png",
      title: "Fly Over Dangers, because you are light!!",
      content:
        "Our itinerary is brimming with activities that cater to every family member's interests, ensuring that each moment is as special as the bonds we share. From heart-warming conversations over home-cooked meals to exploring the local attractions hand in hand, this visit is a celebration of the ties that bind us.",
        profile: "\src\assets\image2.jpg",
        user: "Devon Lane",
        time: "May 31, 2023"
    },
  ];

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIstransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIstransitioning(true);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % Header.length);
        setIstransitioning(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

return (
    <>
      <div className="flex align-center justify-center w-[100%] mt-7  bg-[./public/vite.svg] bg-no-repeat bg-cover bg-center h-screen">
          <img src="\src\assets\party1.png" alt="" className="h-15 w-15 mt-10" />
          <div className="p-5 w-[40%] mt-[80px]">
            <img src={Header[index].image} alt="" className="rounded-2xl max-w-100 max-h-100" />
          </div>
        <div className="w-[35%] mt-[100px]">
          <button className=" rounded-2xl px-5 py-2 bg-transparent-blue text-[#1A74ED] mb-5 font-semibold">
            ACTIVITY
          </button>
          <h2 className="font-bold mb-3 tracking-wider">
            {Header[index].title}
          </h2>
          <p className="text-[#808080] font-light text-sm">
            {Header[index].content}
          </p>

          <div className="flex mt-5 gap-2.5">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={Header[index].image}
              alt=""
            />
            <h3>
              {Header.user} <br />
              <span className="font-extralight text-[#98A0A2] text-xs">
                {Header[index].time}
              </span>
            </h3>
          </div>
          <img
            src="/src/assets/image.png"
            alt=""
            srcset=""
            className="w-15 h-15 ml-100"
          />
        </div>
        <div>
          {Header.map((_, i) => (
            <span key={i} style={{
              width: i === index ? '30px':'10px',
              height: i=== index ? '7px': '10px',
              borderRadius: i === index ? '7px' : "50%",
              backgroundColor: i === index ? '#1A74ED' : '#D9D9D9',
              marginRight:"5px",
              marginTop:"500px",
              display:"inline-block",
              transition: "all 300ms ease-in-out"
            }}>

            </span>
          ))}
        </div>
      </div>
  
      
      <div className="flex mt-[100px] justify-between">
        <h1 className="font-semibold ml-7  mb-10 text-xl">Featured news</h1>
        <button className="bg-transparent-blue p-0 text-[#1A74ED] mr-20 px-5 py-1 rounded-full text-center font-semibold">
          See more
        </button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center ">
        <Card image="\src\assets\image3.png" />
        <Card image="\src\assets\image4.jpg" />
        <Card image="\src\assets\image6.png" />
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-7">
        <Card image="\src\assets\image6.png" />
        <Card image="\src\assets\image4.jpg" />
        <Card image="\src\assets\image1.jpg" />
      </div>

      <Birthday />
    </>
  );
};

export default Head;
