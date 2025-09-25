import { useState, useRef, useEffect } from "react";
import { Plus, Image, Video } from "lucide-react";
// Footer is rendered globally in App
import { blogService } from '../services/apiService';

const validCategories = [
  "Family Time",
  "Community",
  "Activity",
  "Social",
  "History Time",
];

const ArticleSkeleton = () => (
  <div className="relative py-8 border border-gray-500 rounded-xl h-[350px] w-[90%] max-w-[850px] mx-auto my-[60px] bg-white shadow-lg flex flex-col justify-center">
    <div className="absolute top-5 left-5 w-[150px] h-[50px] bg-gray-200 animate-pulse rounded-[40px]" />
    <div className="absolute top-5 right-5 w-[150px] h-[50px] bg-gray-200 animate-pulse rounded-[40px]" />
    <div className="flex gap-6 mt-20 ml-32">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[70px] h-[70px] bg-gray-200 animate-pulse rounded-xl"
        />
      ))}
    </div>
    <div className="w-[80%] h-[100px] bg-gray-200 animate-pulse rounded-lg mx-auto mt-4" />
    <div className="absolute bottom-5 left-5 w-[80px] h-[80px] bg-gray-200 animate-pulse rounded-full" />
  </div>
);

const Articles = () => {
  const [attachments, setAttachments] = useState([]);
  const [coverImg, setCoverImg] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(validCategories[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProgress(0);
    setShowProgress(true);
    setLoading(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProgress(false), 300);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleAttachmentChange = (event, type) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImg(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !coverImg) {
      setMessage("⚠️ Title, Content, and Cover Image are required.");
      return;
    }

    setMessage("Uploading...");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("coverImg", coverImg);

      // append files with array keys
      attachments.forEach((att) => {
        if (att.type === "image") formData.append("images[]", att.file);
        if (att.type === "video") formData.append("videos[]", att.file);
      });

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Use the blog service which handles authentication automatically
      await blogService.uploadBlog(formData);

      setMessage("✅ Blog uploaded successfully!");
      setTitle("");
      setContent("");
      setCategory(validCategories[0]);
      setCoverImg(null);
      setCoverPreview(null);
      setAttachments([]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showProgress && (
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {loading ? (
          <ArticleSkeleton />
        ) : (
          <div className="relative py-8 border border-gray-500 rounded-xl w-[90%] max-w-[850px] mx-auto my-12 bg-white shadow-lg flex flex-col gap-4 p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full border p-3 rounded-lg text-lg"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content..."
              rows={5}
              className="w-full border p-3 rounded-lg"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-lg"
            >
              {validCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div>
              <p className="font-medium">Cover Image (required)</p>
              {coverPreview ? (
                <div className="relative w-40">
                  <img
                    src={coverPreview}
                    alt="cover"
                    className="w-40 h-28 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setCoverImg(null);
                      setCoverPreview(null);
                    }}
                    className="absolute top-1 right-1 bg-white border rounded-full w-6 h-6"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => coverInputRef.current.click()}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                >
                  Upload Cover
                </button>
              )}
              <input
                type="file"
                accept="image/*"
                ref={coverInputRef}
                onChange={handleCoverChange}
                hidden
              />
            </div>

            {attachments.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {attachments.map((att, idx) => (
                  <div key={idx} className="relative w-24 h-20">
                    {att.type === "image" ? (
                      <img
                        src={att.url}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={att.url}
                        className="w-full h-full object-cover rounded-lg"
                        controls
                      />
                    )}
                    <button
                      onClick={() => handleRemoveAttachment(idx)}
                      className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={(e) => handleAttachmentChange(e, "image")}
              hidden
            />
            <input
              type="file"
              accept="video/*"
              multiple
              ref={videoInputRef}
              onChange={(e) => handleAttachmentChange(e, "video")}
              hidden
            />

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
              >
                <Image className="w-5 h-5" />
                <span className="font-medium">Add Images</span>
              </button>
              <button
                onClick={() => videoInputRef.current.click()}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                <span className="font-medium">Add Videos</span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-6 bg-[#1A74ED]  text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish Blog
            </button>

            {message && <p className="text-sm mt-2">{message}</p>}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Articles;
