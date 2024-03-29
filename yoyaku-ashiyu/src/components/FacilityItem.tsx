import React, { useState } from "react";
import { BookButton } from "./BookButton";
import { BookingDialog } from "./BookingDialog";
import { FASILITIES } from "./ScheduleHeader";

export type FacilityItemInfo = {
    index: number;
    userName: string;
    phoneNumber: string;
    memo: string;
}

interface Props {
    info: FacilityItemInfo;
    isAdmin: boolean;
    curDate: Date;
    bookingTime: string;
    facilityIndex: number;
    onSubmit: (facilityIndex: number, userName: string, phoneNumber: string) => void;
}

const FacilityItem: React.FC<Props> = (props): React.ReactNode => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnClick = () => {
        setOpenDialog(true);
    };

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnSubmit = (userName: string, phoneNumber: string): void => {
        // ダイアログを閉じる
        setOpenDialog(false);

        // 予約実行
        props.onSubmit(props.info.index, userName, phoneNumber);
    }

    const dispItem = (props.info.userName === "")
        ? <BookButton onClick={handleOnClick} />
        : props.isAdmin
            ? (
                <div>
                    <div>{props.info.userName}</div>
                    <div>{props.info.phoneNumber}</div>
                    <div>{props.info.memo}</div>
                </div>
            )
            : <span className="material-symbols-outlined">close</span>
    ;

    return (
        <>
            <div
                className="line-item body-item facility-column"
            >
                { dispItem }
            </div>
            <BookingDialog
                open={openDialog}
                onClose={handleOnClose}
                bookingDate={props.curDate}
                bookingTime={props.bookingTime}
                facilityName={FASILITIES[props.facilityIndex]}
                onSubmit={handleOnSubmit}
            />
        </>
    );
}

export {
    FacilityItem
};
