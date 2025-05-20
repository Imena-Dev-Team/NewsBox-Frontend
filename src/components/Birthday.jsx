import React from "react";




const Birthday = ({name}) => {
  return (
    <div className="w-[100%] flex align-items-center justify-center mt-[150px]">
      <div className="w-[60%] ml-10">
        <h2 className="text-[#1A74ED] font-semibold w-[50%] text-4xl tracking-wider mb-7 ">WISHING AMAZING BIRTHDAYS !</h2>
        <span className="text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family<br /> reunion
          serves as a reminder of the importance of taking a pause <br /> and relishing
          the company of those who matter most.{" "}
        </span>
        <div className="bg-white shadow-md rounded-3xl w-120 mt-10">
          <h2 className="font-bold text-xl p-5 pt-5">HOPE FAMILY WISHES A BLAZING <br /> ANNIVERSARY TO YOU ALL !!</h2>
          <img src="/src/assets/party.png" alt="" srcset="" className="h-90" />
          <p className="p-5 text-sm text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.
          </p>
        </div>
      </div>
    <div className="block space-y-5 mt-30">
          <div className="max-h-50 max-w-110 shadow-xl rounded-3xl relative transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {"Kelia"}!!</h1>

        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
      </div>
      <div className="max-h-50 max-w-110 shadow-2xl rounded-2xl relative  transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {"Mike"}!!</h1>
        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
      </div>
      <div className="max-h-50 max-w-110 shadow-2xl rounded-2xl relative mr-10  transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {"John"}!!</h1>
        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
      </div>
      </div>
      {/* <div className="flex flex-col space-y-4">
      <Message  name="Kelia" style={{ position:"relative", left:"-100px",}}/>
      <Message  name="Kelia"/>
      <Message  name="Kelia"/>
    </div> */}
    </div>
  );
};

export default Birthday;
