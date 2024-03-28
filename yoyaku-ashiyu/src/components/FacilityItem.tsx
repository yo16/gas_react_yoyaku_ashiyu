
export type FacilityItemInfo = {
    userName: string;
    telNumber: string;
    memo: string;
}

const FacilityItem = (props: {info: FacilityItemInfo, isAdmin: boolean}): React.ReactNode => {
    const dispItem = props.isAdmin
        ? (
            props.info.userName
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
