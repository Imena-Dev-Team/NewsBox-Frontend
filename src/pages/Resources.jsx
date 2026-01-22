import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import PDFResourceCard from '../components/PDFResourceCard';
import PDFViewerModal from '../components/PDFViewerModal';
import { pdfResources } from '../data/pdfResources';

const Resources = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Handler to open PDF in modal
  const handleViewPDF = (pdf) => {
    setSelectedPDF(pdf);
    setModalOpen(true);
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPDF(null);
  };

  // Handler to download PDF
  const handleDownloadPDF = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.filePath;
    link.download = pdf.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handler to open PDF in new tab
  const handleOpenExternal = (pdf) => {
    window.open(pdf.filePath, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Resources – Imena Family Portal</title>
        <meta name="description" content="Access family resources, documents, and important information." />
      </Helmet>

      {loading && (
        <div style={{ height: "6px", backgroundColor: "#e0e0e0", margin: "0" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#1474ED",
              transition: "width 0.3s",
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-7xl py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#1A74ED] transition-colors duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            Family Resources
          </h1>
          <p className="text-gray-600 text-lg">
            Everything you need to stay connected with the family
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-2xl mb-6 mx-auto"></div>
                <div className="w-3/4 h-7 bg-gray-200 animate-pulse rounded mb-4 mx-auto"></div>
                <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {pdfResources.map((pdf) => (
              <PDFResourceCard
                key={pdf.id}
                title={pdf.title}
                description={pdf.description}
                fileName={pdf.fileName}
                filePath={pdf.filePath}
                onView={() => handleViewPDF(pdf)}
                onDownload={() => handleDownloadPDF(pdf)}
                onOpenExternal={() => handleOpenExternal(pdf)}
              />
            ))}
          </div>
        )}

        {/* PDF Viewer Modal */}
        {selectedPDF && (
          <PDFViewerModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            filePath={selectedPDF.filePath}
            fileName={selectedPDF.fileName}
          />
        )}

        
      </div>
    </>
  );
};

export default Resources;
