import React from 'react';
import { Download, ExternalLink, Eye } from 'lucide-react';

/**
 * PDFResourceCard Component
 * Displays a single PDF resource with action buttons for viewing, downloading, and opening externally
 * 
 * @param {Object} props
 * @param {string} props.title - Display title for the PDF
 * @param {string} props.description - Brief description of the PDF content
 * @param {string} props.fileName - Original filename of the PDF
 * @param {string} props.filePath - Path to the PDF file
 * @param {string} props.icon - Emoji icon to display on the card
 * @param {string} props.color - Tailwind gradient classes for the card background
 * @param {Function} props.onView - Callback when View button is clicked
 * @param {Function} props.onDownload - Callback when Download button is clicked
 * @param {Function} props.onOpenExternal - Callback when Open in New Tab button is clicked
 */
const PDFResourceCard = ({
  title,
  description,
  fileName,
  filePath,
  icon,
  color,
  onView,
  onDownload,
  onOpenExternal
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      {/* Icon */}
      <div 
        className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1A74ED] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        {/* View Button */}
        <button
          onClick={onView}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1A74ED] text-white rounded-lg hover:bg-[#125fcc] transition-colors duration-300 font-medium"
        >
          <Eye size={18} />
          <span>View PDF</span>
        </button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          {/* Open in New Tab */}
          <button
            onClick={onOpenExternal}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm font-medium"
          >
            <ExternalLink size={16} />
            <span>Open</span>
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm font-medium"
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
