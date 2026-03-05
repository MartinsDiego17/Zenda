import { ProfessionalSettings } from "@/schemas/professional_settings"

interface DisabledConfirmSectionProps {
    originalSettings: ProfessionalSettings | null
    newSettings: ProfessionalSettings
}

export const disabledConfirmSection = ({ originalSettings, newSettings }: DisabledConfirmSectionProps): boolean => {
    if (!originalSettings) return false;
    return JSON.stringify(originalSettings) === JSON.stringify(newSettings);
}