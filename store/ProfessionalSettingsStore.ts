import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfessionalSettings } from "@/schemas/professional_settings";
import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

interface ProfessionalSettingsStore {
  professional_settings: ProfessionalSettings | null;
  getProfessionalSettings: () => Promise<ProfessionalSettings>;
}

export const useProfessionalSettingsStore = create<ProfessionalSettingsStore>()(
  persist(
    (set) => ({
      professional_settings: null,
      getProfessionalSettings: async () => {
        const localUrl = serverConfig.professionalSettings.get;
        try {
          const response = await axios(localUrl);
          const localProfessionalSettings: ProfessionalSettings =
            response.data.data[0];
          set({ professional_settings: localProfessionalSettings });
          return localProfessionalSettings;
        } catch (error) {
          set({ professional_settings: null });
          throw error;
        }
      },
    }),
    {
      name: "professional-settings-storage", // clave en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        professional_settings: state.professional_settings, // solo persiste este campo
      }),
    }
  )
);