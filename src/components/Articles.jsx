import { useState } from 'react';
import { Plus, Image, Video, MoreHorizontal } from 'lucide-react';

const Articles = () => {
  const [active, setActive] = useState('Publish');
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        padding: "50px",
        border: "1px solid gray",
        borderRadius: "12px",
        height: "350px",
        width: "90%",
        maxWidth: "850px",
        margin: "60px auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Cancel and Publish Buttons */}
      <button
        onClick={() => setActive('Cancel')}
        style={{
          backgroundColor: active === 'Cancel' ? "#2aa2ff" : "#fff",
          color: active === 'Cancel' ? "#fff" : "#2aa2ff",
          width: "150px",
          height: "50px",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          position: "absolute",
          top: "20px",
          left: "20px",
          border: "2px solid rgb(29, 135, 216)",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>

      <button
        onClick={() => setActive('Publish')}
        style={{
          backgroundColor: active === 'Publish' ? "#2aa2ff" : "#fff",
          color: active === 'Publish' ? "#fff" : "#2aa2ff",
          width: "150px",
          height: "50px",
          borderRadius: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          position: "absolute",
          top: "20px",
          right: "20px",
          border: "2px solid rgb(28, 128, 204)",
          cursor: "pointer",
        }}
      >
        Publish
      </button>

      {/* Post Title Input */}
      <input
        type='text'
        placeholder='Title of your post'
        style={{
          width: "80%",
          height: "50px",
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

      {/* Floating Plus Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "#fff",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          border: "2px solid #2aa2ff",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <Plus size={65} strokeWidth={1} color="#2aa2ff" />
      </button>

      {/* Icon Options */}
      {showOptions && (
        <div style={{ position: 'absolute', bottom: '30px', left: '120px', display: 'flex', gap: '20px' }}>
          
          <div style={iconStyle}>
            <Image color="#064420" />
          </div>

          <div style={iconStyle}>
            <Video color="#064420" />
          </div>

          <div style={iconStyle}>
            <MoreHorizontal color="#064420" />
          </div>
        </div>
      )}
    </div>
  );
};

// Icon style object
const iconStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '2px solid darkgreen',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: '#fff',
};

export default Articles;
