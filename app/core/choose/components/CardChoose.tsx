interface props {
    title: string
    content: string
}

export const CardChoose = ({ title, content }: props) => {
    return (
        <div className="card-choose-container">
            <h2 className="font-bold text-2xl text-(--color-text-primary) mb-6">{title}</h2>
            <p>{content}</p>
        </div>
    );
};
