import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/apiService';

const ProfileDropdown = () => {
  const { user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [remoteProfile, setRemoteProfile] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch profile image from API when authenticated member
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user || user.userType !== 'member') return;
        
        // Only skip fetch if profile data actually contains fields
        const hasLocalProfile = !!(user.hasProfile && user.profileData && (user.profileData.name || user.profileData.email || user.profileData.subFam || user.profileData.birthday || user.profileData.profilePic || user.profileData.profilePicUrl));
        if (hasLocalProfile) {
          setRemoteProfile(user.profileData);
          return;
        }
        
        const res = await authService.getProfile();
        if (res?.success && res?.data) {
          // Shape: { success: true, data: { ...profile } }
          setRemoteProfile(res.data);
          updateUser({
            hasProfile: true,
            profileData: { ...(user.profileData || {}), ...res.data }
          });
        } else if (res?.data) {
          // Shape: { data: { ...profile } }
          setRemoteProfile(res.data);
          updateUser({
            hasProfile: true,
            profileData: { ...(user.profileData || {}), ...res.data }
          });
        } else if (res && !res.success) {
          // Shape: direct profile object
          setRemoteProfile(res);
          updateUser({
            hasProfile: true,
            profileData: { ...(user.profileData || {}), ...res }
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // fail silently
      }
    };
    fetchProfile();
  }, [user, updateUser]);

  if (!user || user.userType !== 'member') {
    return null;
  }
  
  const rawProfile = remoteProfile || user.profileData;
  const profile = rawProfile?.data || rawProfile; // handle either {data:{...}} or flat
  
  // Debug logging
  console.log('ProfileDropdown - Profile data:', profile);
  console.log('ProfileDropdown - Profile pic URL:', profile?.profilePicUrl);
  console.log('ProfileDropdown - Profile pic:', profile?.profilePic);
  console.log('ProfileDropdown - User data:', user);
  console.log('ProfileDropdown - User profileData:', user?.profileData);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex items-center px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
          isOpen 
            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
            : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50 border border-transparent'
        }`}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Profile</span>
        <svg
          className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-4 px-6 z-50 overflow-hidden isolate bg-clip-padding">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
            {/* Profile Picture */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-blue-200 overflow-hidden">
              {(() => {
                const rawUrl = profile?.profilePicUrl || profile?.profilePic;
                const imageUrl = rawUrl && rawUrl.startsWith('http') ? rawUrl : rawUrl;
                const hasUrl = !!imageUrl;
                return (
                  <>
                    <img
                      src={imageUrl || ''}
                      alt={profile?.name || user.familyName}
                      className="w-full h-full object-cover bg-transparent"
                      style={{ display: hasUrl ? 'block' : 'none' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div
                      className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white items-center justify-center font-bold text-xl select-none"
                      style={{ display: hasUrl ? 'none' : 'flex' }}
                    >
                      {profile?.name?.charAt(0)?.toUpperCase() || user.familyName?.charAt(0)?.toUpperCase() || 'M'}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Profile Info */}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">
                {user.familyName || 'Member'}
              </h3>
              <p className="text-sm text-blue-600 font-medium">
                {profile?.name || 'User'}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          {profile ? (
            <div className="py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="text-sm text-gray-900">{profile.email || 'Not set'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Sub Family</span>
                <span className="text-sm text-gray-900">{profile.subFam || 'Not set'}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Birthday</span>
                <span className="text-sm text-gray-900">{profile.birthday ? formatDate(profile.birthday) : 'Not set'}</span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">
              <p className="text-sm">Profile information not available</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
