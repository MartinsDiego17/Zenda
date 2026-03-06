import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfessionalSettings } from "@/schemas/professional_settings";
import { serverConfig } from "@/lib/serverConfig";
import { axiosClient } from "@/lib/axiosClient";

interface ProfessionalSettingsStore {
  professional_settings: ProfessionalSettings | null;
  getProfessionalSettings: () => Promise<ProfessionalSettings>;
  updateProfessionalSettings: (newSettings: ProfessionalSettings) => Promise<ProfessionalSettings>;
}

export const useProfessionalSettingsStore = create<ProfessionalSettingsStore>()(
  persist(
    (set) => ({
      professional_settings: null,

      getProfessionalSettings: async () => {
        const localUrl = serverConfig.professionalSettings.get;
        try {
          const response = await axiosClient(localUrl);
          const localProfessionalSettings: ProfessionalSettings = response.data.data[0];
          set({ professional_settings: localProfessionalSettings });
          return localProfessionalSettings;
        } catch (error) {
          set({ professional_settings: null });
          throw error;
        }
      },

      updateProfessionalSettings: async (newSettings: ProfessionalSettings) => {
        const localUrl = serverConfig.professionalSettings.patch({ id: newSettings.user_id });
        try {
          const { data } = await axiosClient.patch(localUrl, newSettings);
          set({ professional_settings: data.data });
          return data.data;
        } catch (error) {
          throw error;
        }
      },

    }),
    {
      name: "professional-settings-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        professional_settings: state.professional_settings,
      }),
    }
  )
);