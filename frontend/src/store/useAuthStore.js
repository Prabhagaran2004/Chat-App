import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser : null, 
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth: true,

    checkAuth : async() => {
        try { 
            const res = await axiosInstance.get('/auth/check-auth')
            set({ authUser : res.data })
        } catch (error) {
            console.log('Error checking auth:', error);
            set({ authUser: null})
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup : async(data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            toast.success("Account created successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ isSigningUp: false });
        }finally{
            set({ isSigningUp: false });
        }
    },

    login : async( data ) => {
        set({isLoggingIn : true})
        try {
            const res = await axiosInstance.post("/auth/login" , data)
            toast.success("Logged in successfully");
            set({authUSer : res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({ isLoggingIn : false})
        }
    },

    logout : async() => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser : null})
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("auth/profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error("Error in update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    

}))