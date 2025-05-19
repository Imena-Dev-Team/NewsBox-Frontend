import React, { useState, useEffect } from "react";
import './home.css';
import logo from './logo.png';
import { Link } from "react-router-dom";


export default function LandingPage() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev === 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="whole">
     
      
      <div className="svg-background">
        <div className="svg-bg">
          <svg
            width="100%"
            height="100vh"
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4982CF" />
                <stop offset="100%" stopColor="#4982CF" />
              </linearGradient>
            </defs>
            <path
              d="
                M0,0
                Q300,40 400,120
                Q500,200 320,370
                Q200,480 400,600
                H0 Z"
              fill="url(#mainGradient)"
            />
          </svg>
        </div>
      </div>

      
      <div id="log-sign">
        <a href="|" id="text1" className="font-sans">LOGIN</a>
        < a href="" id="text2" className="font-sans">SIGNUP</a>
      </div>

      
      <div className="image">
        <img src={logo} alt="Logo" />
      </div>

     
      <div id="text">
        <p id="welcome">WELCOME TO</p>
        <p id="aerg">AERG IMENA</p>
        <p id="cap">Kubw'umurava n'ikizere, imbere hacu heza <br /> ntituzazima</p>
      </div>

      
      <button className="start">GET STARTED</button>

      
      <div
        style={{
          fontSize: "50px",
          fontWeight: "bolder",
          textAlign: "center",
          marginTop: "100px",
          marginLeft: "700px",
          color: "#4982CF"
        }}
      >
        {".".repeat(dotCount)}
      </div>
    </div>
  );
}
