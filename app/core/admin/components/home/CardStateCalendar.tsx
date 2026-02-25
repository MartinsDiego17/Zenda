import { AlertCircle } from "lucide-react";
interface props {
    title: string
    quantityTurns: number
}

export const CardStateCalendar = ({ title, quantityTurns }: props) => {
    return (
        <div className="text-[.8rem] flex justify-between place-items-center">
            <p className="opacity-60 flex place-items-center gap-x-2">
                <span className="text-(--color-primary)"><AlertCircle size={15} /></span>
                <span>{title}</span>
            </p>
            <p>{quantityTurns}</p>
        </div>
    );
};
