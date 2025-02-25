import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../lib/axios";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
    authUser: null,
    signupLoading: false,
    loginLoading: false,
    updateLoading: false,
    checkingAuth: true,

    checkAuth: async () => {
        try {
            const { data } = await api.get('/auth/me');
            if (data.success) {
                set({ authUser: data.user });
                initializeSocket(data.user);
                toast.success("You are logged in");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ checkingAuth: false });
        }
    },

    signup: async (userData) => {
        try {
            set({ signupLoading: true });
            const { data } = await api.post('/auth/signup', userData);
            if (data.success) {
                set({ authUser: data.user });
                initializeSocket(data.user);
                toast.success("You are logged in");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ signupLoading: false });
        }
    },

    login: async (userData) => {
        try {
            set({ loginLoading: true });
            const { data } = await api.post('/auth/login', userData);
            if (data.success) {
                set({ authUser: data.user });
                initializeSocket(data.user);
                toast.success("You are logged in");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loginLoading: false });
        }
    },

    logout: async () => {
        try {
            const { data } = await api.post('/auth/logout');
            if (data.success) {
                disconnectSocket();
                set({ authUser: null });
                toast.success("You are logged out");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    update: async (updateData) => {
        try {
            set({ loading: true });
            const { data } = await api.put('/auth/update', updateData);

            if (data.success) {
                set({ authUser: data.user });
                toast.success("Profile Updated!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },
}));
