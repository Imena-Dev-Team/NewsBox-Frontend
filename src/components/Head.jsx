import React from "react";
import Card from "./Card";
import Birthday from "./Birthday";

const Head = () => {
  return (
    <>
    <div className="flex align-center justify-center w-[100%] mt-7">
        <img src="\src\assets\party1.png" alt="" className="h-15 w-15 mt-10" />
      <div className="p-5 w-[40%] mt-[80px]">
        <img src="\src\assets\image1.jpg" alt="" className="rounded-2xl" />
      </div>
      <div className="w-[35%] mt-[100px]">
        <button className=" rounded-2xl px-5 py-2 bg-transparent-blue text-[#1A74ED] mb-5 font-semibold">ACTIVITY</button>
        <h2 className="font-bold mb-3 tracking-wider">
          A Heart-warming Family Reunion: Embracing Togetherness ! Embarking
          cherished Moments together
        </h2>
        <p className="text-[#808080] font-light text-sm">
          Our itinerary is brimming with activities that cater to every family
          member's interests, ensuring that each moment is as special as the
          bonds we share. From heart-warming conversations over home-cooked
          meals to exploring the local attractions hand in hand, this visit is a
          celebration of the ties that bind us.<br /> <br /> Amidst the hustle and bustle of
          our daily lives, this family reunion serves as a reminder of the
          importance of taking a pause and relishing the company of those who
          matter most.
        </p>

        <div className="flex mt-5 gap-2.5">
            <img className="w-10 h-10 rounded-full object-cover" src="\src\assets\image2.jpg" alt="" />
            <h3>Devon Lane <br /><span className="font-extralight text-[#98A0A2] text-xs">May 31, 2023</span></h3>

            
        </div>
        <img src="/src/assets/image.png" alt="" srcset="" className="w-15 h-15 ml-100" />

      </div>
    </div>
    <div className="flex mt-[100px] justify-between">
        <h1 className='font-semibold ml-7  mb-10 text-xl'>Featured news</h1>
        <button className="bg-transparent-blue p-0 text-[#1A74ED] mr-20 px-5 py-1 rounded-full text-center font-semibold">See more</button>
    </div>
    <div className="flex flex-wrap gap-6 justify-center ">
    <Card image="\src\assets\image3.png" />
    <Card image="\src\assets\image4.jpg" />
    <Card  image="\src\assets\image6.png"/>
    </div>

    <div className="flex flex-wrap gap-6 justify-center mt-7">
    <Card image="\src\assets\image6.png" />
    <Card image="\src\assets\image4.jpg" />
    <Card  image="\src\assets\image1.jpg"/>
    </div>

    <Birthday />
    </>

  );
};

export default Head;
