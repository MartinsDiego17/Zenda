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

export const ProfessionalSettings = () => {

    const currentProfessionalSettings = useProfessionalSettingsStore(state => state.professional_settings);
    const [localSettings, setLocalSettings] = useState<ProfessionalSettingsType | undefined>(undefined);

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
        setLocalSettings({
            ...localSettings,
            session_modalities: modalities
        })
    }
    const handleWorkDays = (workDays: string[]) => {
        const finalWorkDays = getUIToCoded(workDays);
        setLocalSettings({
            ...localSettings,
            work_days: finalWorkDays
        });
    };

    const handleWindowDays = (windowDays: number) => {
        setLocalSettings({
            ...localSettings,
            reservation_window_days: windowDays
        });
    };

    const handleDuration = (minutes: number) => {
        setLocalSettings({
            ...localSettings,
            session_duration_minutes: minutes
        });
    };


    return (
        <section className="w-[70vw] h-[60vh] flex justify-between gap-x-4">

            <article className="w-[50%] h-full flex flex-col gap-y-4">
                <ModalitiesSection modalities={session_modalities} onChange={handleChangeModalities} />
                <LocationSection address={office_address || ""}  isPresencial={session_modalities !== "Virtual"} />
                <DaysSection days={getCodedToUi(work_days)} handler={handleWorkDays} />
                <WindowDaysSection
                    value={reservation_window_days }
                    onChange={handleWindowDays}
                />
            </article>

            <article className="w-[50%] h-full flex flex-col gap-y-4">
                <DurationSection
                    sessionDurationMinutes={session_duration_minutes}
                    onChange={handleDuration}
                />
                <AtentionSection />
                <ConfirmSection />
            </article>

        </section>
    );
};