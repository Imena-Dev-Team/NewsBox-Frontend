/**
 * PDF Resource Data Configuration
 * Contains metadata for all PDF documents available in the Resources section
 */

// Import PDFs as assets
import aergDocumentPdf from '../assets/resources/AERG Document .pdf';
import aergPdf from '../assets/resources/AERG.pdf';
import amatekaYaAergPdf from '../assets/resources/AMATEKA YA AERG.pdf';

/**
 * @typedef {Object} PDFResource
 * @property {string} id - Unique identifier for the PDF resource
 * @property {string} title - Display title for the PDF
 * @property {string} description - Brief description of the PDF content
 * @property {string} fileName - Original filename of the PDF
 * @property {string} filePath - Path to the PDF file
 * @property {string} icon - Emoji icon to display on the card
 * @property {string} color - Tailwind gradient classes for the card background
 */

/**
 * Array of PDF resources available in the application
 * @type {PDFResource[]}
 */
export const pdfResources = [
  {
    id: 'aerg-document',
    title: 'Rwandan Genocide Memorial Sites added to national heritage list',
    description: 'Official documentation about Rwandan Genocide Memorial Sites being added to the national heritage list',
    fileName: 'AERG Document .pdf',
    filePath: aergDocumentPdf,
    icon: '📄',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'aerg',
    title: 'Amateka ya AERG Imena',
    description: 'Historical records and archives of AERG Imena',
    fileName: 'AERG.pdf',
    filePath: aergPdf,
    icon: '📋',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'amateka-ya-aerg',
    title: 'Amateka ya Aerg muri Rusange',
    description: 'Historical records and archives of AERG in Rusange',
    fileName: 'AMATEKA YA AERG.pdf',
    filePath: amatekaYaAergPdf,
    icon: '📚',
    color: 'from-green-500 to-green-600'
  }
];
