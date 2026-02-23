
export const Chip = ({ text }: { text: string }) => {
    return (
        <div className="chip-container text-(--color-primary) bg-(--color-secondary-transparent) w-fit px-4 py-1 text-[.9rem] rounded-full">
            {text}
        </div>
    );
};
