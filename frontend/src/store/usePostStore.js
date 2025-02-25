import toast from "react-hot-toast";
import { create } from "zustand";
import { getSocket } from "../socket/socket.client";
import api from "../lib/axios";

export const usePostStore = create((set) => ({
    posts: [],
    loading: false,

    fetchPosts: async () => {
        try {
            set({ loading: true });
            const { data } = await api.get("/posts");
            if (data.success) {
                set({ posts: data.posts });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },

    createPost: async (postData) => {
        try {
            set({ loading: true });
            const { data } = await api.post("/posts/add", postData);
            if (data.success) {
                toast.success("Post created!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },

    likePost: async (id) => {
        try {
            set({ loading: true });
            const { data } = await api.put(`/posts/like-dislike/${id}`);
            if (data.success) {
                set((state) => ({
                    posts: state.posts.map((post) => (post._id === id ? data.post : post)),
                }));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },

    deletePost: async (id) => {
        try {
            set({ loading: true });
            const { data } = await api.delete(`/posts/delete/${id}`);
            if (data.success) {
                set((state) => ({
                    posts: state.posts.filter((post) => post._id !== id),
                }));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ loading: false });
        }
    },

    subscribeToNewPosts: () => {
        try {
            const socket = getSocket();
            socket.on("newPost", ({ post, msg }) => {
                set((state) => ({
                    posts: [...state.posts, post],
                }));
                toast.success(msg);
            });
        } catch (error) {
            console.error(error.message);
        }
    },

    unsubscribeToNewPosts: () => {
        try {
            const socket = getSocket();
            socket.off("newPost");
        } catch (error) {
            console.error(error.message);
        }
    },
}));
