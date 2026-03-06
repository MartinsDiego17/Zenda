import { axiosClient } from "@/lib/axiosClient";
import { serverConfig } from "@/lib/serverConfig";

export const getAllUsers = async () => {
    const localUrl = serverConfig.profile.findAll;

    try {
        const { data } = await axiosClient(localUrl);
        return data.data;
    } catch (error) {
        throw error;
    }
};