"use client";
import { ProfessionalSettings as ProfessionalSettingsType, SessionModality } from "@/schemas/professional_settings";
import { AtentionSection } from "./AtentionSection";
import { ConfirmSection } from "./ConfirmSection";
import { DaysSection } from "./DaysSection";
import { DurationSection } from "./DurationSection";
import { LocationSection } from "./LocationSection";
import { ModalitiesSection } from "./ModalitiesSection";
import { WindowDaysSection } from "./WindowDaysSection";
import { useProfessionalSettingsStore } from "@/store/ProfessionalSettingsStore";
import { useEffect, useState } from "react";
import { getCodedToUi } from "../../utils/settings/getCodedToUi";
import { getUIToCoded } from "../../utils/settings/getUIToCoded";
import { disabledConfirmSection } from "../../utils/settings/disabledConfirmSection";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ProfessionalSettings = () => {

    const currentProfessionalSettings = useProfessionalSettingsStore(state => state.professional_settings);
    const updateProfessionalSettings = useProfessionalSettingsStore(state => state.updateProfessionalSettings);
    const [localSettings, setLocalSettings] = useState<ProfessionalSettingsType | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (currentProfessionalSettings && !localSettings) {
            setLocalSettings(currentProfessionalSettings);
        }
    }, [currentProfessionalSettings]);

    if (!localSettings) return null;

    const {
        session_modalities,
        office_address,
        work_days,
        reservation_window_days,
        session_duration_minutes,
        work_start_time,
        work_end_time,
        requires_deposit,
        deposit_amount,
    } = localSettings;

    const handleChangeModalities = (modalities: SessionModality) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, session_modalities: modalities });
    };
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, office_address: e.target.value });
    };
    const handleWorkDays = (workDays: string[]) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, work_days: getUIToCoded(workDays) });
    };
    const handleWindowDays = (windowDays: number) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, reservation_window_days: windowDays });
    };
    const handleDuration = (minutes: number) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, session_duration_minutes: minutes });
    };
    const handleRequiresDeposit = (value: boolean) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, requires_deposit: value });
    };
    const handleDepositAmount = (amount: number) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, deposit_amount: amount });
    };
    const handleStartTime = (time: string) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, work_start_time: time });
    };
    const handleEndTime = (time: string) => {
        setIsSaved(false);
        setLocalSettings({ ...localSettings, work_end_time: time });
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const updatedSettings = await updateProfessionalSettings(localSettings);
            if (updatedSettings) setLocalSettings(updatedSettings);
            setIsSaved(true);
            toast.success("Configuraciones guardadas correctamente");
        } catch (error) {
            toast.error("Error al guardar las configuraciones, intentá de nuevo");
        } finally {
            setIsLoading(false);
        }
    };

    const requiresAddress = session_modalities === "Presencial" || session_modalities === "BOTH";
    const isAddressEmpty = requiresAddress && !office_address?.trim();
    const isDepositInvalid = requires_deposit && (!deposit_amount || deposit_amount < 1);

    const isConfirmDisabled = isDepositInvalid || isAddressEmpty || isSaved || disabledConfirmSection({
        originalSettings: currentProfessionalSettings,
        newSettings: localSettings
    });

    return (
        <section className="professional-settings-section flex justify-between gap-x-4">
            <article className="settings-article flex flex-col gap-y-4">
                <ModalitiesSection modalities={session_modalities} onChange={handleChangeModalities} />
                <LocationSection onChange={handleChangeAddress} address={office_address || ""} isPresencial={session_modalities !== "Virtual"} />
                <DaysSection days={getCodedToUi(work_days) || [""]} handler={handleWorkDays} />
                <WindowDaysSection value={reservation_window_days} onChange={handleWindowDays} />
            </article>

            <article className="settings-article flex flex-col gap-y-4">
                <DurationSection
                    sessionDurationMinutes={session_duration_minutes}
                    onChange={handleDuration}
                    requiresDeposit={requires_deposit}
                    depositAmount={deposit_amount || 0}
                    onChangeRequiresDeposit={handleRequiresDeposit}
                    onChangeDepositAmount={handleDepositAmount}
                />
                <AtentionSection
                    workStartTime={work_start_time || ""}
                    workEndTime={work_end_time || ""}
                    onChangeStartTime={handleStartTime}
                    onChangeEndTime={handleEndTime}
                />
                <ConfirmSection
                    isDisabled={isConfirmDisabled}
                    isLoading={isLoading}
                    onConfirm={handleConfirm}
                />
            </article>
        </section>
    );
};