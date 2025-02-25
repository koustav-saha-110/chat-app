import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../lib/axios";

export const useUserStore = create((set) => ({
    users: [],

    fetchUsers: async () => {
        try {
            const { data } = await api.get("/users");
            if (data.success) {
                set({ users: data.users });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    },

    searchUsers: async (query) => {
        try {
            const { data } = await api.get(`/users/search/${query}`);

            if (data.success) {
                set({ users: data.users });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
}));
