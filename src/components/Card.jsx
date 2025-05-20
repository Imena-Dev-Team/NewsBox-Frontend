import React from "react";

const Card = ({title, image}) => {
  
  return (
    <>
      <div className="flex align-center justify-center">
        <div className=" max-w-sm max-h-[500px]  rounded-xl shadow-lg p-4 mt-7  bg-white transform hover:scale-105 transition-transform duration-300">
          <img src={image} alt={title} className="rounded-2xl h-[200px]" />
          <h2 className=" font-semibold text-md pt-2 mb-4 mt-3">
            A Heart-warming Family Reunion: Embracing Togetherness ! Embarking
            cherished Moments together
          </h2>
          <span className="text-xs text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.
          </span><br /><br />
          <a className=" text-sm bg-white rounded-3xl px-5 py-3 text-[#1A74ED] shadow-sm" href="">Read more &rarr;</a>
        </div>
      </div>
    </>
  );
};

export default Card;
