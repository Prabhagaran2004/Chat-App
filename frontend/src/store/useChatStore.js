import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    // Check if user is authenticated before making the request
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
      console.log("User not authenticated, skipping getUsers");
      return;
    }

    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getUsers:", error);
      if (error.response?.status === 401) {
        toast.error("Please log in to view users");
        // Optional: Clear users array on auth error
        set({ users: [] });
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    // Check if user is authenticated before making the request
    const authUser = useAuthStore.getState().authUser;
    if (!authUser) {
      console.log("User not authenticated, skipping getMessages");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getMessages:", error);
      if (error.response?.status === 401) {
        toast.error("Please log in to view messages");
        set({ messages: [] });
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch messages");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const authUser = useAuthStore.getState().authUser;
    
    if (!authUser) {
      toast.error("Please log in to send messages");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in sendMessage:", error);
      if (error.response?.status === 401) {
        toast.error("Please log in to send messages");
      } else {
        toast.error(error.response?.data?.message || "Failed to send message");
      }
    }
  },

  // Uncommented and fixed the socket methods
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessages", (newMessages) => {
      const isMessageSentFromSelectedUser = newMessages.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessages],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessages");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));