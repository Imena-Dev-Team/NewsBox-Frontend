import { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, ExternalLink, Loader2, Menu } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

/**
 * PDFViewerModal Component
 * Displays a PDF document in a modal with navigation and zoom controls
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {string} props.filePath - Path to the PDF file
 * @param {string} props.fileName - Name of the PDF file
 */
const PDFViewerModal = ({ isOpen, onClose, filePath, fileName }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Memoize options to prevent unnecessary reloads
  const options = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
  }), []);

  // Reset state when modal opens with new file
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened with file:', filePath);
      setPageNumber(1);
      setScale(1.0);
      setLoading(true);
      setError(null);
      setSidebarOpen(true);
    }
  }, [isOpen, filePath]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    console.error('File path:', filePath);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    setLoading(false);
    setError('Failed to load PDF. Please try opening in a new tab or downloading the file.');
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const fitToWidth = () => {
    setScale(1.0);
  };

  const openInNewTab = () => {
    window.open(filePath, '_blank');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const goToPage = (page) => {
    setPageNumber(page);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h2 id="pdf-viewer-title" className="text-lg font-semibold text-gray-900 truncate">
              {fileName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 flex-wrap gap-2">
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-700 min-w-[100px] text-center">
              {numPages ? `Page ${pageNumber} of ${numPages}` : 'Loading...'}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-sm text-gray-700 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={fitToWidth}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Fit to width"
            >
              <Maximize2 size={20} />
            </button>
          </div>

          {/* Open in New Tab */}
          <button
            onClick={openInNewTab}
            className="flex items-center gap-2 px-3 py-2 bg-[#1A74ED] text-white rounded-lg hover:bg-[#125fcc] transition-colors text-sm font-medium"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Open in New Tab</span>
          </button>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          {sidebarOpen && numPages && (
            <div className="w-48 border-r border-gray-200 bg-gray-50 overflow-y-auto p-2">
              <div className="space-y-2">
                {Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-full p-2 rounded-lg transition-all ${
                      page === pageNumber
                        ? 'bg-[#1A74ED] text-white shadow-md'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">Page {page}</div>
                    <div className="border border-gray-300 rounded overflow-hidden bg-white">
                      <Document
                        file={filePath}
                        options={options}
                      >
                        <Page
                          pageNumber={page}
                          width={150}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PDF Content */}
          <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4">
            {loading && !error && (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-[#1A74ED]" size={48} />
                <p className="text-gray-600">Loading PDF...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
                <p className="text-red-800 mb-4">{error}</p>
                <button
                  onClick={openInNewTab}
                  className="px-4 py-2 bg-[#1A74ED] text-white rounded-lg hover:bg-[#125fcc] transition-colors"
                >
                  Open in New Tab
                </button>
              </div>
            )}

            {!error && (
              <Document
                file={filePath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                error={null}
                options={options}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
