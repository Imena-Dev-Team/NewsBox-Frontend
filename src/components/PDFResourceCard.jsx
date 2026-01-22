import React from 'react';
import { Download, ExternalLink, Eye } from 'lucide-react';
import logo from '../assets/logo.png';

/**
 * PDFResourceCard Component
 * Displays a single PDF resource with action buttons for viewing, downloading, and opening externally
 * 
 * @param {Object} props
 * @param {string} props.title - Display title for the PDF
 * @param {string} props.description - Brief description of the PDF content
 * @param {string} props.fileName - Original filename of the PDF
 * @param {string} props.filePath - Path to the PDF file
 * @param {Function} props.onView - Callback when View button is clicked
 * @param {Function} props.onDownload - Callback when Download button is clicked
 * @param {Function} props.onOpenExternal - Callback when Open in New Tab button is clicked
 */
const PDFResourceCard = ({
  title,
  description,
  fileName,
  filePath,
  onView,
  onDownload,
  onOpenExternal
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      {/* Logo Container with Background */}
      <div className="mb-6 flex items-center justify-center">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:from-[#1A74ED]/10 group-hover:to-[#1A74ED]/20 transition-all duration-300">
          <img 
            src={logo} 
            alt="IMENA Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#1A74ED] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-auto">
        {/* View Button */}
        <button
          onClick={onView}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A74ED] text-white rounded-xl font-medium hover:bg-[#125fcc] transition-colors duration-300 shadow-sm hover:shadow-md"
        >
          <Eye size={18} />
          <span>View PDF</span>
        </button>

        {/* Secondary Actions */}
        <div className="flex gap-3">
          {/* Open in New Tab */}
          <button
            onClick={onOpenExternal}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#1A74ED] rounded-xl font-medium border-2 border-[#1A74ED] hover:bg-[#1A74ED] hover:text-white transition-all duration-300"
          >
            <ExternalLink size={16} />
            <span>Open</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#1A74ED] rounded-xl font-medium border-2 border-[#1A74ED] hover:bg-[#1A74ED] hover:text-white transition-all duration-300"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFResourceCard;
