import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
 
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setSelectedImg(base64Image); // Show preview immediately
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        // Reset the selected image if upload fails
        setSelectedImg(null);
        console.error("Profile update failed:", error);
      }
    };
  };

  return (
    <div className="h-full pt-20 bg-slate-900/95 relative">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="profile-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#profile-grid)" />
        </svg>
      </div>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-8 backdrop-blur-sm shadow-2xl border border-white/10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-300 font-medium">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-white/20 hover:bg-white/30
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-white/10 rounded-xl border border-white/20 text-gray-200 text-sm sm:text-base backdrop-blur-sm">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-white/10 rounded-xl border border-white/20 text-gray-200 text-sm sm:text-base backdrop-blur-sm">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-white/5 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Account Information</h2>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-gray-300">Member Since</span>
                <span className="text-gray-200">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-300">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;