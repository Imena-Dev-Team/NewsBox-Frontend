import React from "react";
import MyImage from "./logo.png";
import { UserCircle } from "lucide-react";
import { Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const Links = [
    { name: "HOME", href: "/Head" },
    { name: "BLOGS", href: "/All" },
    { name: "PUBLISH ARTICLES", href: "/Articles" },
    { name: "GALLERY", href: "/Gallery" },
    { name: "UPCOMING BIRTHDAYS", href: "/Birthdays" },
  ];
  return (
    <div>
      <div
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "rgb(245, 245, 246)",
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "Poppins, sans-serif",
          color: "gray",
        }}
      >
        <h3
          style={{
            marginRight: "190px",
            marginLeft: "40px",
            padding: 0,
            font: "Poppins, sans-serif",
          }}
        >
          HOPE FAMILY COURTESY
        </h3>
        <img
          src={MyImage}
          style={{
            marginLeft: "70px",
            color: "gray",
          }}
        />
        <a
          href="Sign In"
          style={{
            textDecoration: "none",
            marginLeft: "290px",
            right: "10px",
            color: "gray",
            fontFamily: "Poppins, sans-serif",
            alignItems: "center",
            display: "flex",
            lineHeight: "1",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          <UserCircle
            style={{
              width: "75px",
              height: "50px",
              color: "#2AA2FF",
            }}
          />
          SIGN IN
        </a>
      </div>
      <div
        style={{
          margin: "40px 0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          border: "1px solid rgba(128, 123, 123, 0.1)",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            borderRight: "1px solid rgba(128, 123, 123, 0.1)",
            marginRight: "50px",
          }}
        >
          <Menu style={{ width: "28px", height: "28px", color: "black" }} />
        </button>
        <div>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "inline-flex",
              gap: "20px",
              alignItems: "center",
              color: "gray",
              fontSize: "16px",
              fontWeight: "bold",
              lineHeight: "1.5",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {Links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    margin: "0px 45px",
                    ...(location.pathname === link.href && {
                      backgroundColor: "#EAF4FF",
                      color: "#2AA2FF",
                      padding: "6px 16px",
                      borderRadius: "999px",
                    }),
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "35px",
          }}
        >
          <Search style={{ width: "28px", height: "28px", color: "black" }} />
        </button>
      </div>
    </div>
  );
}
export default Header;