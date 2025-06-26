import React, { useState } from "react";
import MyImage from "../Header.png";
import { UserCircle } from "lucide-react";
import { Menu, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const Links = [
    { name: "HOME", href: "/" },
    { name: "BLOGS", href: "/all" },
    { name: "PUBLISH ARTICLES", href: "/Articles" },
    { name: "GALLERY", href: "/gallery" },
    { name: "MEMBERS' BIRTHDAYS", href: "/Birthdays" },
  ];

  return (
    <div>
      <div className="m-0 p-0 bg-[rgb(245,245,246)] flex justify-around font-['Poppins',sans-serif] text-gray-500">
        <h3 className="mr-[190px] ml-10 p-0 font-['Poppins',sans-serif] font-bold text-lg mt-6">
          HOPE FAMILY COURTESY
        </h3>
        <img src={MyImage} className="ml-[70px] text-gray-500" />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPending(true);
            setTimeout(() => {
              setPending(false);
              navigate("/login");
            }, 1500);
          }}
          className="no-underline ml-[290px] right-[10px] text-gray-500 font-['Poppins',sans-serif] flex items-center leading-none font-bold text-[18px]"
        >
          <UserCircle className="w-[75px] h-[50px] text-[#2aa2ff] text-sm font-medium" />
          Log Out
        </a>
        {pending && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-40">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-blue-600 font-semibold bg-white px-6 py-3 rounded shadow">
              Logging out...
            </p>
          </div>
        )}
      </div>

      <div className="my-10 flex justify-between items-center px-5 py-3 border border-[rgba(128,123,123,0.1)]">
        <div className="w-full flex justify-center items-center">
          <ul className="list-none m-0 p-0 flex w-full max-w-[1200px] justify-evenly items-center text-gray-500 text-base font-bold leading-normal font-['Poppins',sans-serif]">
            {Links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`no-underline text-gray-500 mx-[45px] ${
                    location.pathname === link.href
                      ? "bg-[#eaf4ff] text-[#2aa2ff] px-4 py-1.5 rounded-full"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
