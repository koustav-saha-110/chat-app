import toast from "react-hot-toast";
import { create } from "zustand";
import { getSocket } from "../socket/socket.client";
import api from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set) => ({
    onlineUsers: [],
    messages: [],

    getMessages: async (id) => {
        try {
            const { data } = await api.get(`/messages/${id}`);

            if (data.success) {
                set({ messages: data.messages });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    sendMessage: async (message, receiverId) => {
        try {
            set((state) => ({
                messages: [...state.messages, {
                    sender: useAuthStore.getState().authUser._id,
                    receiver: receiverId,
                    message: message,
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                }],
            }));

            const { data } = await api.post(`/messages/send/${receiverId}`, { message: message });

            if (!data.success) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    subscribeToOnlineUsers: () => {
        try {
            const socket = getSocket();
            socket.on("onlineUsers", (users) => {
                set({ onlineUsers: users });
            });
        } catch (error) {
            toast.error(error.message);
        }
    },

    unsubscribeToOnlineUsers: () => {
        try {
            const socket = getSocket();
            socket.off("onlineUsers");
        } catch (error) {
            toast.error(error.message);
        }
    },

    subscribeToNewMessages: () => {
        try {
            const socket = getSocket();
            socket.on("newMessage", (newMessage) => {
                set((state) => ({
                    messages: [...state.messages, newMessage],
                }));
            });
        } catch (error) {
            console.error(error.message);
        }
    },

    unsubscribeToNewMessages: () => {
        try {
            const socket = getSocket();
            socket.off("newMessage");
        } catch (error) {
            console.error(error.message);
        }
    },
}));
