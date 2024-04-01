import "./BookEditButton.css";

interface Props {
    userName: string;
    phoneNumber: string;
    memo: string;
    isAdmin: boolean;
    onClick : () => void;
}

const BookEditButton: React.FC<Props> = (props) => {
    const handleOnClick = () => {
        props.onClick();
    }

    return (
        <button
            onClick={handleOnClick}
        >
            予約済<br />
            {props.userName}
        </button>
    );
};

export { BookEditButton };
