import React, { useState } from "react";
import Blur from './blur.png';
import Image from './img.png';
import logo from './logo.png';


const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

function NewsletterFooter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing:", firstName, email);
    setFirstName("");
    setEmail("");
  };

    const styles = {
    footer: {
      padding: '3rem 0',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    topSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
    },
    logoSection: {
      gridColumn: '1',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3b82f6',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
    },
    logoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2px',
    },
    logoSquare: {
      width: '8px',
      height: '8px',
      backgroundColor: 'white',
    },
    logoSquareTransparent: {
      width: '8px',
      height: '8px',
      backgroundColor: 'white',
      opacity: '0.5',
    },
    logoText: {
      color: '#3b82f6',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    description: {
      color: '#4b5563',
      fontSize: '0.875rem',
      lineHeight: '1.5',
      marginBottom: '1.5rem',
    },
    socialIcons: {
      display: 'flex',
      gap: '0.75rem',
    },
    socialIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      color: '#4b5563',
      transition: 'background-color 0.2s',
    },
    linksSection: {
      gridColumn: 'span 1',
    },
    linkHeading: {
      color: '#3b82f6',
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
    },
    linksList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    linkItem: {
      marginBottom: '0.75rem',
    },
    link: {
      color: '#4b5563',
      textDecoration: 'none',
      fontSize: '0.875rem',
      transition: 'color 0.2s',
    },
    copyright: {

      marginTop: '3rem',
      paddingTop: '0rem',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '0.875rem',
    },
    divider: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '3rem 0',
    }
  };



  return (
    <div className="outer">

      <footer style={{
        backgroundColor:"#3b82f6",
        padding: "20px",
        fontSize: "18px",
        borderRadius: "10px",
        height: "200px",
        width: "1250.5px",
        marginLeft:"125px",
        marginTop:"50px"
    }}>
        
        <p style={
            {
               fontFamily: 'Poppins, sans-serif',
               fontSize:"30px",
               color:"white",
               fontWeight:"600",
               paddingLeft: "350px",
               letterSpacing: "1px"
 

            }
        }> Subscribe to our newsletter</p>
        
        <div style={
            {
                marginLeft:"200px",

            }
        }>  <input type="text" placeholder="First name" className="eyo" required style={{ height: "40px", width:"250px", borderRadius:"5px", border:"none", paddingLeft:"15px", marginRight:"20px"}} />  
            <input type="text" placeholder="Email Address" className="eyo" required style={{ height: "40px", marginLeft:"10px", width:"250px", borderRadius:"5px", border:"none", paddingLeft:"15px", marginRight:"20px"}}/>
            <input
             type="text"
             placeholder="Subscribe Now"
            className="custom-input"
            style={{ marginLeft:"10px"}}
            />

          <style>
            {`
            .eyo::placeholder{
             color:rgb(81, 113, 177) ;
            }
              .eyo{
              margin-top: 30px;
              }
            .custom-input {
             height: 40px;
             width: 250px;
             border-radius: 20px;
             border: none;
             text-align: center;
             color:rgb(81, 113, 177);
             font-weight: 600;
             }

            .custom-input::placeholder {
            color: rgb(66, 116, 215);
             }
            `}
           </style>
           </div>
           {/* <div className="image"
           style={{

            position:"absolute",
            top:"-220px",
            left: "-980px",
            zIndex:"1",
            height:"20px",
            width: "100px", height: "80px",
            transform: "rotate(-5deg)"
           }}> <img src={Blur} alt="" /></div> */}

            {/* <div className="image"
           style={{

            position:"absolute",
            top:"-50px",
            left: "120px",
            zIndex:"1",
            height:"20px",
            width: "100px", height: "80px",
            transform: "rotate(-5deg)"
           }}> <img src={Image} alt="" /></div> */}
           
          <div style={{ ...styles.footer, marginTop: "80px" }}>
          <div style={styles.container}>
          <div style={styles.topSection}>
          <div style={styles.logoSection}>
          <img src={logo} alt="" style={{ width: '100px', height: 'auto', marginTop: '7px' }} />

            <p style={{...styles.description, fontFamily: "Poppins, sans-serif"}}>
              NewsBox provide accurate and reliable price feeds to the Flare Network and a transparent, incentivized, risk-free delegation service
            </p>
            <div style={styles.socialIcons}>
              <a 
                href="https://x.com/"
                style={styles.socialIcon}
               
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIcon}
               >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                 href="https://www.instagram.com/aerg.imena_/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIcon}
              
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/aerg.imena_/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.socialIcon}
                
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>

    
          <div style={styles.linksSection}>
            <h3 style={{ ...styles.linkHeading, fontFamily: "Poppins, sans-serif" }}>NEWSBOX</h3>
            <ul style={styles.linksList}>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
                 
                >
                  Home
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                style={ {...styles.link, fontFamily: "Poppins, sans-serif"}}
       
                >
                  Recent Blogs
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                    style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
                 
                >
                  Publish Blogs
                </a>
              </li>
            </ul>
          </div>

          
          <div style={styles.linksSection}>
            <h3 style={{...styles.linkHeading, fontFamily: "Poppins, sans-serif"}}>SUPPORT & HELP</h3>
            <ul style={styles.linksList}>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
                
                >
                  Customer Support
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
                 
                >
                  Terms & Conditions
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
                 
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        
          <div style={styles.linksSection}>
        <h3 style={{...styles.linkHeading, fontFamily: "Poppins, sans-serif"}}>FAQ</h3>
            <ul style={styles.linksList}>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
            
                >
                  Get Started
                </a>
              </li>
              <li style={styles.linkItem}>
                <a 
                  href="#" 
                  style={{...styles.link, fontFamily: "Poppins, sans-serif"}}
               
                >
                  Team
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.divider}></div>

        
        <div style={{...styles.copyright, fontFamily: "Poppins, sans-serif"}}>
          © Copyright 2022, All Rights Reserved by HOPE FAMILY AERG IMENA COURTESY.
        </div>
      </div>
    </div>
           

    </footer>
    </div>
 
  );
}

export default NewsletterFooter;