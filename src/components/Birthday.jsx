import React from "react";




const Birthday = () => {
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
          <h2 className="font-bold text-xl p-5">HOPE FAMILY Wishes a BLAZING <br /> ANNIVERSARY TO YOU ALL !!</h2>
          <img src="/src/assets/party.png" alt="" srcset="" className="h-90" />
          <p className="p-5 text-sm text-[#808080]">
            Amidst the hustle and bustle of our daily lives, this family reunion
            serves as a reminder of the importance of taking a pause and
            relishing the company of those who matter most.
          </p>
        </div>
      </div>

          <div className="max-h-50 max-w-110 shadow-2xl rounded-2xl w-[40%] relative ">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {name}!!</h1>
        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
      </div>
    
      <div className="max-h-50 max-w-110 shadow-2xl rounded-2xl w-[40%] relative ">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {name}!!</h1>
        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
      </div>
      <div className="max-h-50 max-w-110 shadow-2xl rounded-2xl w-[40%] relative mr-0 ">
        <h1 className="font-bold text-center pt-4">HAPPY BIRTHDAY {name}!!</h1>
        <p className="p-5 text-sm text-[#808080]">
          Amidst the hustle and bustle of our daily lives, this family reunion
          serves as a reminder of the importance of taking a pause and relishing
          the company of those who matter most.{" "}
        </p>
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
