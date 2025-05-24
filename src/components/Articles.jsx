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
    <div className="relative py-8 border border-gray-500 rounded-xl h-[350px] w-[90%] max-w-[850px] mx-auto my-[60px] font-['Poppins',sans-serif] bg-[#f8fafc] shadow-[0_4px_24px_0_rgba(0,0,0,0.07)] flex flex-col justify-center">
      <button
        onClick={() => setActive('Cancel')}
        className={`absolute top-5 left-5 w-[150px] h-[50px] rounded-[40px] flex justify-center items-center text-xl border-2 border-[rgb(29,135,216)] cursor-pointer ${
          active === 'Cancel' ? 'bg-[#2aa2ff] text-white' : 'bg-white text-[#2aa2ff]'
        }`}
      >
        Cancel
      </button>

      <button
        onClick={() => setActive('Publish')}
        className={`absolute top-5 right-5 w-[150px] h-[50px] rounded-[40px] flex justify-center items-center text-xl border-2 border-[rgb(28,128,204)] cursor-pointer ${
          active === 'Publish' ? 'bg-[#2aa2ff] text-white' : 'bg-white text-[#2aa2ff]'
        }`}
      >
        Publish
      </button>

      {/* Inner wrapper for left alignment */}
      <div className="w-[90%] max-w-[700px] mx-auto flex flex-col items-start">
        
        {attachments.length > 0 && (
          <div className="flex gap-4 mb-2.5 mt-0 justify-start">
            {attachments.map((att, idx) => (
              <div
                key={idx}
                className="relative w-[70px] h-[70px] shadow-[0_2px_8px_0_rgba(0,0,0,0.10)] border-2 border-[#e0e7ef] rounded-xl overflow-hidden bg-white transition-[box-shadow_0.2s,border_0.2s] flex items-center justify-center cursor-pointer hover:shadow-[0_4px_16px_0_rgba(42,162,255,0.18)] hover:border-[#2aa2ff]"
                onClick={() => {
                  if (att.type === 'video') setVideoModal({ open: true, url: att.url });
                }}
              >
                {att.type === 'image' ? (
                  <img src={att.url} alt="attachment" className="w-full h-full object-cover rounded-[10px] transition-[box-shadow_0.2s]" />
                ) : att.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#eaf4ff] rounded-[10px]">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2aa2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="15" height="10" rx="2"/><polygon points="17 7 22 12 17 17 17 7"/></svg>
                  </div>
                ) : (
                  <span className="w-[60px] h-[60px] flex items-center justify-center bg-[#eee] rounded-lg">File</span>
                )}
                <button
                  onClick={e => { e.stopPropagation(); handleRemoveAttachment(idx); }}
                  className="absolute top-0.5 right-0.5 bg-white border border-[#ccc] rounded-full w-[22px] h-[22px] cursor-pointer font-bold leading-[18px] p-0 shadow-[0_1px_4px_0_rgba(0,0,0,0.10)] flex items-center justify-center"
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
          className="w-[80%] h-[100px] text-2xl font-medium border-none border-l-3 border-[#d3d3d3] outline-none px-5 py-2.5 m-0 block bg-[#f8fafc] text-[#333]"
        />
      </div>

      {/* File Inputs (hidden) */}
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={e => handleAttachmentChange(e, 'image')}
      />
      <input
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        ref={videoInputRef}
        onChange={e => handleAttachmentChange(e, 'video')}
      />

      {/* Plus Icon for Attachments */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="absolute bottom-5 left-5 text-white w-[80px] h-[80px] rounded-full flex justify-center items-center border-2 border-[#2aa2ff] bg-white cursor-pointer"
      >
        <Plus size={65} strokeWidth={1} color="#2aa2ff" />
      </button>

      {/* Icon Options */}
      {showOptions && (
        <div className="absolute bottom-[30px] left-[120px] flex gap-5">
          <div className="w-[60px] h-[60px] rounded-full border-2 border-[darkgreen] flex justify-center items-center cursor-pointer bg-white" onClick={() => fileInputRef.current.click()}>
            <Image color="#064420" />
          </div>
          <div className="w-[60px] h-[60px] rounded-full border-2 border-[darkgreen] flex justify-center items-center cursor-pointer bg-white" onClick={() => videoInputRef.current.click()}>
            <Video color="#064420" />
          </div>
          <div className="w-[60px] h-[60px] rounded-full border-2 border-[darkgreen] flex justify-center items-center cursor-pointer bg-white" onClick={() => fileInputRef.current.click()}>
            <MoreHorizontal color="#064420" />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal.open && (
        <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_24px_0_rgba(0,0,0,0.18)] relative min-w-[320px]">
            <button
              onClick={() => setVideoModal({ open: false, url: null })}
              className="absolute top-2 right-2 bg-white border border-[#ccc] rounded-full w-7 h-7 cursor-pointer font-bold text-lg leading-[22px] p-0 shadow-[0_1px_4px_0_rgba(0,0,0,0.10)] flex items-center justify-center"
              aria-label="Close video preview"
            >×</button>
            <video src={videoModal.url} controls autoPlay className="w-[320px] h-[240px] rounded-lg bg-black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
