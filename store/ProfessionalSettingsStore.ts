import { create } from "zustand";
import { ProfessionalSettings } from "@/schemas/professional_settings";
import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

interface ProfessionalSettingsStore {
    professional_settings: ProfessionalSettings | null;
    getProfessionalSettings: () => Promise<ProfessionalSettings>;
}

export const useProfessionalSettingsStore = create<ProfessionalSettingsStore>((set) => ({
    professional_settings: null,

    getProfessionalSettings: async () => {
        const localUrl = serverConfig.professionalSettings.get;

        try {
            const response = await axios(localUrl);
            const localProfessionalSettings: ProfessionalSettings = response.data.data[0];
            set({ professional_settings: localProfessionalSettings });

            return localProfessionalSettings;
        } catch (error) {
            set({ professional_settings: null });
            throw error;
        }
    },
}));
