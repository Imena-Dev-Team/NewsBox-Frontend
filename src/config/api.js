// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://newsbox-backend.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  PROFILE: '/api/profile',
  PROFILE_CHECK: '/api/profile/check',
  TODAY_BIRTHDAYS: '/api/birthdays',
  BIRTHDAYS: '/api/birthdays/upcoming',
  WISHES: '/api/birthdays/wishes',
  UPLOAD_BLOG: '/api/uploadBlog',
  DELETE_BLOG: '/api/deleteBlog'
};

export default API_BASE_URL;
