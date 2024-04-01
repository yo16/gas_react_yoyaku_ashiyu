import "./BookButton.css";

interface Props {
    isBooking: boolean;
    userName?: string;
    phoneNumber?: string;
    memo?: string;
    isAdmin?: boolean;
    onClick: ()=>void;
}

const BookButton: React.FC<Props> = (props) => {
    const handleOnClick = () => {
        props.onClick();
    };

    // テキスト
    const buttonText = props.isBooking
        ? "予約"
        : props.isAdmin
            ? (
                <div>
                    {props.userName}<br />
                    {props.phoneNumber}
                    {props.memo ? <br /> + props.memo : ""}
                </div>
            )
            : (
                <div>
                    <span className="spnDoBooked">予約済み</span><br />
                    {props.userName}
                </div>
            )
    ;

    // クラス
    const className = "btnBooking "
        + (
            props.isBooking
                ? "btnBoookEntry"
                : "btnBookEdit"
        )
    ;

    return (
        <>
            <button
                onClick={handleOnClick}
                className={className}
            >{buttonText}</button>
        </>
    );
};

export {
    BookButton
};
