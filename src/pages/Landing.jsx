import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from "swiper/modules";
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/apiService';

import photo1 from "../assets/loginPhotos/login1.webp";
import photo2 from "../assets/loginPhotos/login2.webp";
import photo3 from "../assets/loginPhotos/login3.webp";
import photo4 from "../assets/loginPhotos/login4.webp";
import photo5 from "../assets/loginPhotos/login5.webp";
import photo6 from "../assets/loginPhotos/login6.webp";
import familyImage3 from "../assets/landingPhotos/family2.webp";
import familyImage4 from "../assets/landingPhotos/family3.webp";
import familyImage0 from "../assets/landingPhotos/family4.webp";
import familyImage5 from "../assets/landingPhotos/family5.webp";
import familyImage6 from "../assets/landingPhotos/family6.webp";
import familyImage7 from "../assets/landingPhotos/family7.webp"; 
import familyImage8 from "../assets/landingPhotos/family2.webp";

function HeroSlider() {
  const images = useMemo(() => [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    familyImage3,
    familyImage4,
    familyImage0,
    familyImage5,
    familyImage6,
    familyImage7,
    familyImage8
  ], []);

  useEffect(() => {
    const preload = () => {
      for (let i = 1; i < images.length; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = images[i];
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        window.requestIdleCallback(preload, { timeout: 2000 });
      } else {
        setTimeout(preload, 300);
      }
    }
  }, [images]);
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        preloadImages={false}
        lazyPreloadPrevNext={2}
        className="w-full h-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            {i === 0 ? (
              <img
                src={img}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <img
                src={img}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMemberClick = (event) => {
    event.preventDefault();
    setActiveButton('member');
    
    // If user is already authenticated as member, go to home
    if (isAuthenticated && user?.userType === 'member') {
      navigate("/home");
    } else {
      // Otherwise, go to login
      navigate("/login");
    }
  };

  const handleGuestClick = async (event) => {
    event.preventDefault();
    setActiveButton('guest');
    
    // If user is already authenticated as guest, go directly to home
    if (isAuthenticated && user?.userType === 'guest') {
      navigate("/home");
      return;
    }
    
    setLoading(true);
    
    try {
      // Actually login as guest through API
      const response = await authService.loginAsGuest();
      
      if (response.token) {
        // Login successful
        login(response.token, {
          userType: 'guest',
          hasProfile: false,
          profileData: null,
          ...response.user
        });
        navigate("/home");
      }
    } catch (error) {
      console.error('Guest login failed:', error);
      // On error, still navigate but without authentication
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen font-[poppins] overflow-hidden">
      <Helmet>
        <title>IMENA – United in Love</title>
        <meta name="description" content="Join the Imena family community: stories, news, and connections." />
      </Helmet>
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-24 py-8 md:py-24 bg-white flex-1 md:flex-none overflow-auto">
        <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-black mb-4 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent leading-none">
          IMENA
        </h1>
        <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-8"></div>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-blue-600 mb-8">
          <Typewriter
            words={[
              'Welcome to Imena Family',
              'United in love',
              'We rise together💙✊'
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2500}
          />
        </h2>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 max-w-xl">
          Join a community where every member matters, every story counts, and every connection creates lasting bonds.
        </p>
        
        {/* Authentication Status Indicator */}
        {isAuthenticated && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg max-w-xl">
            <p className="text-green-800 text-sm">
              ✅ You're logged in as <strong>{user?.userType === 'guest' ? 'Guest' : user?.profileData?.name || user?.familyName || 'Member'}</strong>
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-lg ${activeButton === 'member' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}
            onClick={handleMemberClick}
            aria-pressed={activeButton === 'member'}
            disabled={activeButton && activeButton !== 'member'}
          >
            {isAuthenticated && user?.userType === 'member' ? 'Continue as Member' : 'Member'}
          </button>
          <button
            className={`border-2 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all hover:scale-105 ${activeButton === 'guest' ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleGuestClick}
            aria-pressed={activeButton === 'guest'}
            disabled={loading || (activeButton && activeButton !== 'guest')}
          >
            {loading && activeButton === 'guest' ? 'Logging in...' : isAuthenticated && user?.userType === 'guest' ? 'Continue as Guest' : 'Guest'}
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-64 sm:h-96 md:h-full overflow-hidden">
        <HeroSlider />
      </div>
    </div>
  );
}
