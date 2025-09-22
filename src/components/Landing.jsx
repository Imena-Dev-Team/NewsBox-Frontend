import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from "swiper/modules";
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

import familyImage from "../assets/fam .jpg";
import familyImage1 from "../assets/fam2.jpg";
import familyImage2 from "../assets/family1.jpg";
import familyImage3 from "../assets/family2.jpg";
import familyImage4 from "../assets/family3.JPG";
import familyImage5 from "../assets/family4.JPG";
import familyImage6 from "../assets/family5.JPG";
import familyImage7 from "../assets/family6.JPG";
import familyImage8 from "../assets/family7.JPG";

function HeroSlider() {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {[familyImage, familyImage1, familyImage2, familyImage3, familyImage4, familyImage5,
          familyImage6, familyImage7, familyImage8, familyImage1,familyImage, familyImage2].map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`slide-${i}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleMemberClick = (event) => {
    event.preventDefault();
    setActiveButton('member');
    navigate("/login");
  };

  const handleGuestClick = (event) => {
    event.preventDefault();
    setActiveButton('guest');
    navigate("/home");
  };

  return (
    <div className="flex w-full h-screen font-[poppins]">
      <div className="w-1/2 flex flex-col justify-center px-16 lg:px-24 py-24 bg-white">
        <h1 className="text-6xl lg:text-[6rem] font-black mb-4 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent leading-none">
          IMENA
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-8"></div>

        <h2 className="text-2xl lg:text-3xl font-light text-blue-600 mb-8">
          <Typewriter
            words={[
              'Welcome to Imena Family',
              'United in love',
              'We rise together💙'
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2500}
          />
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
          Join a community where every member matters, every story counts, and every connection creates lasting bonds.
        </p>

        <div className="flex gap-4">
          <button
            className={`px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-lg ${activeButton === 'member' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}
            onClick={handleMemberClick}
            aria-pressed={activeButton === 'member'}
            disabled={activeButton && activeButton !== 'member'}
          >
            Member
          </button>
          <button
            className={`border-2 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 ${activeButton === 'guest' ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white'}`}
            onClick={handleGuestClick}
            aria-pressed={activeButton === 'guest'}
            disabled={activeButton && activeButton !== 'guest'}
          >
            Guest
          </button>
        </div>
      </div>

      <div className="w-1/2 h-full overflow-hidden">
        <HeroSlider />
      </div>
    </div>
  );
}
