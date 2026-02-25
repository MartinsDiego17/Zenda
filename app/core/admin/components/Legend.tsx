
export const Legend = () => {
    return (
        <div className="legends-container mt-6">
            <h2 className="font-bold text-[.8rem] opacity-90 tracking-[1px]">LEYENDA</h2>
            <div className="flex flex-col gap-y-2 mt-3">
                <p className="flex place-items-center gap-x-2">
                    <div className="w-3 h-3 rounded-full bg-(--color-primary-transparent) border border-(--color-primary)"></div>
                    <span className="text-[.8rem]">Sesión</span>
                </p>
                <p className="flex place-items-center gap-x-2">
                    <div className="w-3 h-3 rounded-full bg-(--color-error-muted) border border-(--color-error)"></div>
                    <span className="text-[.8rem]">Bloqueo manual</span>
                </p>
            </div>
        </div>
    );
};
