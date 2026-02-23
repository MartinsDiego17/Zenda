import { ProfessionalSettings } from "@/schemas/professional_settings"
import { ButtonPrimary } from "../../web-components/ButtonPrimary"
import { SessionModalityToUser } from "@/schemas/reservations"
import { ArrowRight, MapPin, Video } from "lucide-react";

interface Props {
  currentProfessionalSettings: ProfessionalSettings | null
  canContinue: boolean
  handleModalitie: ({ modalitie }: { modalitie: SessionModalityToUser }) => void
  currentModalitie: string
  handleContinue: () => void
}

export const ModalitiesReserve = ({
  currentProfessionalSettings,
  canContinue,
  handleModalitie,
  currentModalitie,
  handleContinue
}: Props) => {
  if (!currentProfessionalSettings) return null

  const { session_modalities } = currentProfessionalSettings;

  const isBoth = session_modalities === "BOTH"
  const isVirtualOnly = session_modalities === "Virtual"
  const isPresentialOnly = session_modalities === "Presencial"

  return (
    <div
      id="modalities-reserve"
      className="w-full h-full flex flex-col place-items-center"
    >
      <div className="w-full modalities-container">
        <h3 className="font-bold text-[.9rem] mb-10">Modalidad</h3>
        {(isBoth || isVirtualOnly) && (
          <button
            onClick={() => handleModalitie({ modalitie: "Virtual" })}
            className={`mb-4 w-full flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 text-left transition-all ${currentModalitie === "Virtual"
              ? "border-(--color-primary) bg-(--color-terciary-transparent) shadow-sm"
              : "border-border hover:border-(--color-primary-transparent) hover:bg-(--color-secondary-transparent)"
              }`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${currentModalitie === "Virtual"
                ? "bg-(--color-primary) text-white"
                : "bg-(--color-terciary-transparent) text-[#555]"
                }`}
            >
              <Video className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Virtual</p>
              <p className="text-xs text-muted-foreground">Sesión por videollamada</p>
            </div>
          </button>
        )}
        {(isBoth || isPresentialOnly) && (
          <button
            onClick={() => handleModalitie({ modalitie: "Presencial" })}
            className={`w-full flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 text-left transition-all ${currentModalitie === "Presencial"
                ? "border-(--color-primary) bg-(--color-primary-transparent) shadow-sm"
                : "border-border hover:border-(--color-primary-transparent) hover:bg-(--color-secondary-transparent)"
              }`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-lg ${currentModalitie === "Presencial"
                  ? "bg-(--color-primary) text-white"
                  : "bg-(--color-terciary-transparent) text-[#555]"
                }`}
            >
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Presencial</p>
              <p className="text-xs text-muted-foreground">Sesión en consultorio</p>
            </div>
          </button>
        )}
      </div>

      <div className="mt-20 w-full">

        <ButtonPrimary handler={handleContinue} disabled={!canContinue}>
          <span>Continuar</span>
          <span><ArrowRight /></span>
        </ButtonPrimary>

      </div>

    </div>
  )
}
