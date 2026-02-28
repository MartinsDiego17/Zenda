import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

export const getAllUsers = async () => {
    const localUrl = serverConfig.profile.findAll;

    try {
        const { data } = await axios(localUrl);
        return data.data;
    } catch (error) {
        throw error;
    }
};