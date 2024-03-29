import "./BookButton.css";

interface Props {
    onClick: ()=>void;
}

const BookButton: React.FC<Props> = (props) => {
    const handleOnClick = () => {
        props.onClick();
    };
    return (
        <>
            <button
                onClick={handleOnClick}
                className="btnBooking"
            >予約</button>
        </>
    );
};

export {
    BookButton
};
