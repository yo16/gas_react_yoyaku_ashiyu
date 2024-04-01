import React, { useState } from "react";
import { useCookies } from 'react-cookie';

import { BookButton } from "./BookButton";
import { BookingDialog } from "./BookingDialog";
import { FASILITIES } from "./ScheduleHeader";
import {COOKIE_USERNAME, COOKIE_PHONENUMBER } from "../App";

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
    const [cookies] = useCookies([COOKIE_USERNAME, COOKIE_PHONENUMBER]);

    const handleOnBookBtnClick = () => {
        setOpenDialog(true);
    };

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnEditBtnClick = () => {
        console.log("編集！");
    }

    const handleOnSubmit = (userName: string, phoneNumber: string): void => {
        // ダイアログを閉じる
        setOpenDialog(false);

        // 予約実行
        props.onSubmit(props.info.index, userName, phoneNumber);
    }

    // クッキーのuserName、phoneNumberを取得
    const haveCookies: boolean = (cookies[COOKIE_USERNAME] && cookies[COOKIE_USERNAME].length > 0);

    // 表示する要素
    const dispItem = (props.info.userName === "")
        // 予約なし → 予約ボタン
        ? <BookButton
            isBooking={true}
            onClick={handleOnBookBtnClick}
        />
        // 予約あり
        : props.isAdmin
            // 管理者 → 編集ボタン
            ? (
                <BookButton
                    isBooking={false}
                    userName={props.info.userName}
                    phoneNumber={props.info.phoneNumber}
                    memo={props.info.memo}
                    isAdmin={true}
                    onClick={handleOnEditBtnClick}
                />
            )
            // 一般
            : (haveCookies
                && ( cookies[COOKIE_USERNAME] == props.info.userName )
                && ( cookies[COOKIE_PHONENUMBER] == props.info.phoneNumber )
            )
                // クッキー一致 → 編集ボタン
                ? (
                    <BookButton
                        isBooking={false}
                        userName={props.info.userName}
                        phoneNumber={props.info.phoneNumber}
                        memo={props.info.memo}
                        isAdmin={false}
                        onClick={handleOnEditBtnClick}
                    />
                )
                // クッキー不一致 → close
                : (
                    <span className="material-symbols-outlined">close</span>
                )
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
