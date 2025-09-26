import axios from 'axios';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('temp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If sending FormData, let the browser set the correct multipart boundary
    if (config.data instanceof FormData) {
      if (config.headers && 'Content-Type' in config.headers) {
        delete config.headers['Content-Type'];
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication Service
export const authService = {
  // Guest login
  loginAsGuest: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
        userType: 'guest'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Member login
  loginAsMember: async (familyName) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
        userType: 'member',
        familyName: familyName.trim()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create profile (members only)
  createProfile: async (profileData) => {
    try {
      // Support both JSON payloads and multipart with image file
      let payload = profileData;
      let config = undefined;

      const hasFile =
        profileData instanceof FormData ||
        (profileData && typeof File !== 'undefined' && profileData.profilePic instanceof File);

      if (hasFile) {
        const formData = new FormData();
        const toStringOrEmpty = (v) => (v === undefined || v === null ? '' : String(v));
        if (profileData.name) formData.append('name', toStringOrEmpty(profileData.name).trim());
        if (profileData.email) formData.append('email', toStringOrEmpty(profileData.email).trim());
        if (profileData.birthday) {
          // Ensure yyyy-mm-dd
          const b = toStringOrEmpty(profileData.birthday).slice(0, 10);
          formData.append('birthday', b);
        }
        if (profileData.subFam) formData.append('subFam', toStringOrEmpty(profileData.subFam));
        if (profileData.profilePic instanceof File) {
          formData.append('profilePic', profileData.profilePic);
        }

        // Debug: log form keys and value types for verification
        try {
          const debugEntries = [];
          for (const [key, value] of formData.entries()) {
            debugEntries.push({ key, type: value instanceof File ? 'File' : typeof value });
          }
          console.log('API: FormData fields:', debugEntries);
        } catch (_err) {
          // ignore debug logging failures
        }
        payload = formData;
        // Do NOT set Content-Type explicitly; let axios/browser set proper boundary
        config = undefined;
      }

      console.log('API: Sending profile data:', hasFile ? '[FormData]' : payload);
      const response = await apiClient.post(API_ENDPOINTS.PROFILE, payload, config);
      console.log('API: Profile creation response:', response.data);
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;
      console.error('API: Profile creation error:', status, data || error.message);

      // Extract meaningful error message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 400) {
        throw new Error('Please check your profile information and try again.');
      } else if (error.response?.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      } else {
        throw new Error('Failed to create profile. Please try again.');
      }
    }
  },

  // Check if profile exists (members only)
  checkProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROFILE_CHECK);
      return response.data;
    } catch (error) {
      console.error('API: Profile check error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get current user's profile (members only)
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROFILE);
      return response.data; // { success, data }
    } catch (error) {
      console.error('API: Get profile error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // Get birthdays (members only)
  getBirthdays: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BIRTHDAYS);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Blog Service
export const blogService = {
  // Upload blog (admin only)
  uploadBlog: async (formData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.UPLOAD_BLOG, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete blog (admin only)
  deleteBlog: async (blogId) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.DELETE_BLOG, {
        data: { id: blogId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default apiClient;
