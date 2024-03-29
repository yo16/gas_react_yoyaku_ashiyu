import { BookButton } from "./BookButton";

export type FacilityItemInfo = {
    userName: string;
    telNumber: string;
    memo: string;
}

const FacilityItem = (props: {info: FacilityItemInfo, isAdmin: boolean}): React.ReactNode => {
    const handleOnClick = () => {
        console.log("clicked!");
    };

    const dispItem = (props.info.userName === "")
        ? <BookButton onClick={handleOnClick} />
        : props.isAdmin
            ? (
                <div>
                    <div>{props.info.userName}</div>
                    <div>{props.info.telNumber}</div>
                    <div>{props.info.memo}</div>
                </div>
            )
            : <span className="material-symbols-outlined">close</span>
    ;

    return (
        <div
            className="line-item body-item facility-column"
        >
            { dispItem }
        </div>
    );
}

export {
    FacilityItem
};
