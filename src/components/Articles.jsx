import { useState, useRef } from 'react';
import { Plus, Image, Video, MoreHorizontal } from 'lucide-react';

const Articles = () => {
  const [active, setActive] = useState('Publish');
  const [showOptions, setShowOptions] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [videoModal, setVideoModal] = useState({ open: false, url: null });
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Handle multiple attachments (images/videos)
  const handleAttachmentChange = (event, type) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'other'
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = () => fileInputRef.current.click();
  const handleVideoClick = () => videoInputRef.current.click();

  // Centering logic: flex column, center content
  return (
    <div
      style={{
        position: 'relative',
        padding: '32px 0',
        border: '1px solid gray',
        borderRadius: '12px',
        height: '350px',
        width: '90%',
        maxWidth: '850px',
        margin: '60px auto',
        fontFamily: 'Poppins, sans-serif',
        background: '#f8fafc',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={() => setActive('Cancel')}
        style={{
          backgroundColor: active === 'Cancel' ? '#2aa2ff' : '#fff',
          color: active === 'Cancel' ? '#fff' : '#2aa2ff',
          width: '150px',
          height: '50px',
          borderRadius: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          position: 'absolute',
          top: '20px',
          left: '20px',
          border: '2px solid rgb(29, 135, 216)',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>

      <button
        onClick={() => setActive('Publish')}
        style={{
          backgroundColor: active === 'Publish' ? '#2aa2ff' : '#fff',
          color: active === 'Publish' ? '#fff' : '#2aa2ff',
          width: '150px',
          height: '50px',
          borderRadius: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          position: 'absolute',
          top: '20px',
          right: '20px',
          border: '2px solid rgb(28, 128, 204)',
          cursor: 'pointer',
        }}
      >
        Publish
      </button>

      {/* Inner wrapper for left alignment */}
      <div
        style={{
          width: '90%',
          maxWidth: 700,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        
        {attachments.length > 0 && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 10, marginTop: 0, justifyContent: 'flex-start' }}>
            {attachments.map((att, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  width: 70,
                  height: 70,
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  border: '2px solid #e0e7ef',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'box-shadow 0.2s, border 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(42,162,255,0.18)';
                  e.currentTarget.style.border = '2px solid #2aa2ff';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.10)';
                  e.currentTarget.style.border = '2px solid #e0e7ef';
                }}
                onClick={() => {
                  if (att.type === 'video') setVideoModal({ open: true, url: att.url });
                }}
              >
                {att.type === 'image' ? (
                  <img src={att.url} alt="attachment" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10, transition: 'box-shadow 0.2s' }} />
                ) : att.type === 'video' ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eaf4ff', borderRadius: 10 }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2aa2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><polygon points="17 7 22 12 17 17 17 7"/></svg>
                  </div>
                ) : (
                  <span style={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: 8 }}>File</span>
                )}
                <button
                  onClick={e => { e.stopPropagation(); handleRemoveAttachment(idx); }}
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    lineHeight: '18px',
                    padding: 0,
                    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Remove"
                >×</button>
              </div>
            ))}
          </div>
        )}

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          style={{
            width: '80%',
            height: '100px',
            fontSize: '24px',
            fontWeight: '500',
            border: 'none',
            borderLeft: '3px solid #d3d3d3',
            outline: 'none',
            padding: '10px 20px',
            margin: 0,
            display: 'block',
            backgroundColor: '#f8fafc',
            color: '#333',
          }}
        />
      </div>

      {/* File Inputs (hidden) */}
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={e => handleAttachmentChange(e, 'image')}
      />
      <input
        type="file"
        accept="video/*"
        multiple
        style={{ display: 'none' }}
        ref={videoInputRef}
        onChange={e => handleAttachmentChange(e, 'video')}
      />

      {/* Plus Icon for Attachments */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#fff',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #2aa2ff',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        <Plus size={65} strokeWidth={1} color="#2aa2ff" />
      </button>

      {/* Icon Options */}
      {showOptions && (
        <div style={{ position: 'absolute', bottom: '30px', left: '120px', display: 'flex', gap: '20px' }}>
          <div style={iconStyle} onClick={() => fileInputRef.current.click()}>
            <Image color="#064420" />
          </div>
          <div style={iconStyle} onClick={() => videoInputRef.current.click()}>
            <Video color="#064420" />
          </div>
          <div style={iconStyle} onClick={() => fileInputRef.current.click()}>
            <MoreHorizontal color="#064420" />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal.open && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', position: 'relative', minWidth: 320 }}>
            <button
              onClick={() => setVideoModal({ open: false, url: null })}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: 28,
                height: 28,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 18,
                lineHeight: '22px',
                padding: 0,
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close video preview"
            >×</button>
            <video src={videoModal.url} controls autoPlay style={{ width: 320, height: 240, borderRadius: 8, background: '#000' }} />
          </div>
        </div>
      )}
    </div>
  );
};

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
