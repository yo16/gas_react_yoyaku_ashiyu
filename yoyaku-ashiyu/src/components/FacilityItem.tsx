import React, { useState } from "react";
import { useCookies } from 'react-cookie';

import { BookButton } from "./BookButton";
import { BookingDialog } from "./BookingDialog";
import { BookingEditDialog } from "./BookingEditDialog";
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
    onSubmitCancelBooking: (facilityIndex: number) => void;
}

const FacilityItem: React.FC<Props> = (props): React.ReactNode => {
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const [openBookingEditDialog, setOpenBookingEditDialog] = useState(false);
    const [cookies] = useCookies([COOKIE_USERNAME, COOKIE_PHONENUMBER]);

    // 予約登録ボタン
    const handleOnBookBtnClick = () => {
        setOpenBookingDialog(true);
    };
    // 予約登録画面クローズ
    const handleOnCloseBookingDialog = () => {
        setOpenBookingDialog(false);
    }
    // 予約登録実施
    const handleOnSubmitBooking = (userName: string, phoneNumber: string): void => {
        // ダイアログを閉じる
        setOpenBookingDialog(false);

        // 予約実行
        props.onSubmit(props.info.index, userName, phoneNumber);
    }

    // 編集ボタン
    const handleOnEditBtnClick = () => {
        setOpenBookingEditDialog(true);
    }
    // 編集画面クローズ
    const handleOnCloseEditBtnClick = () => {
        setOpenBookingEditDialog(false);
    }
    // 編集実施
    const handleOnSubmitEditBooking = (userName: string, phoneNumber: string): void => {
        // 編集ダイアログを閉じる
        setOpenBookingEditDialog(false);

        // 編集実行（予約と同じ）
        props.onSubmit(props.info.index, userName, phoneNumber);
    }
    // 取り消し実施
    const handleOnCancelBooking = (): void => {
        // 取り消しは、確認する
        if (window.confirm("予約を取り消してもいいですか？")){
            // ダイアログを閉じる
            setOpenBookingEditDialog(false);

            // 取り消し実行
            props.onSubmitCancelBooking(props.info.index);
        }
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
                open={openBookingDialog}
                onClose={handleOnCloseBookingDialog}
                bookingDate={props.curDate}
                bookingTime={props.bookingTime}
                facilityName={FASILITIES[props.facilityIndex]}
                onSubmit={handleOnSubmitBooking}
            />
            <BookingEditDialog
                bookingDate={props.curDate}
                bookingTime={props.bookingTime}
                facilityName={FASILITIES[props.facilityIndex]}
                userName={props.info.userName}
                phoneNumber={props.info.phoneNumber}
                open={openBookingEditDialog}
                onClose={handleOnCloseEditBtnClick}
                onSubmit={handleOnSubmitEditBooking}
                onCancelBooking={handleOnCancelBooking}
            />
        </>
    );
}

export {
    FacilityItem
};
