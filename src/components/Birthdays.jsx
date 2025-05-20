import React, { useState } from 'react';
import MyImage from '../bd.png'
import Image from '../pt.png'

const Birthdays = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      padding: '40px',
      marginLeft: "14px",
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        position: 'relative',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginLeft:"20px" }}>UPCOMING BIRTHDAY</h2>
      </div>

      <div style={{ position: 'relative' }}>
        <img src={Image} 
         style={{
            position: 'absolute',
            right: '0px',
            top: '-170px',
            fontSize: '70px',
            zIndex: -1,
            opacity: 0.9,
         }}
        />        
        
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
          <div style={getCardStyle()}>
            <h3 style={titleStyle}>HAPPY BIRTHDAY MIKE !!</h3>
            <p style={textStyle}>Amidst the hustle and bustle of our daily lives...</p>
          </div>
        </div>
        <img
        src={MyImage}
        alt="Gift"
        style={{
            position: 'absolute',
            top:"250px",
            left: '-80px',
            width: '120px',
            zIndex: -1,
            opacity: 0.9,
            transform: 'translateY(-20%)',
            marginLeft:"15px",
            marginBottom:'90px'
        }}
        />
      </div>
        <div 
            style={{
             marginTop: '5px',
             position: 'relative',
             fontFamily: 'Poppins, sans-serif',
            }}>
           <input type='text' placeholder='Birthday wishes to the born baby' 
            style={{
                width: "70%",
                height: "20px",
                fontSize: "24px",
                fontWeight: "500",
                fontFamily: "Poppins, sans-serif",
                border: "none",
                borderLeft: "3px solid #d3d3d3", 
                outline: "none",
                padding: "10px 20px",
                margin: "150px auto",
                display: "block",
                color: "#333",
                backgroundColor: "#fff",
            }} 
            />

            <button
              onClick={() => setClicked(true)}
              style={{
                backgroundColor: clicked ? '#2aa2ff' : '#fff',
                color: clicked ? '#fff' : '#2aa2ff',
                border: "1px solid #2aa2ff",
                borderRadius: '40px',
                width:'200px',
                height: '50px',
                position: 'absolute',
                right:'20px',
                cursor: 'pointer',
                fontSize: '20px',
                top: '100px',
            }}>
              POST
            </button>
        </div>
    </div>
  );
};

// Shared styles
const getCardStyle = () => ({
  backgroundColor: '#fff',
  width: '30%',
  minWidth: '300px',
  padding: '20px',
  borderRadius: '15px',
  boxSizing: 'border-box',
  marginLeft: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const titleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '10px',
};

const textStyle = {
  fontSize: '14px',
  color: '#555',
  lineHeight: '1.5',
};

export default Birthdays;
