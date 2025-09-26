// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://newsbox-backend.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  PROFILE: '/api/profile',
  PROFILE_CHECK: '/api/profile/check',
  BIRTHDAYS: '/api/birthdays/upcoming',
  UPLOAD_BLOG: '/api/uploadBlog',
  DELETE_BLOG: '/api/deleteBlog'
};

export default API_BASE_URL;
