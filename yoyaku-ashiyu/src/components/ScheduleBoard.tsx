import { useState } from "react";

import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleBody } from "./ScheduleBody";
import { ControlMenu } from "./ControlMenu";
import { AdminPassDialog } from "./AdminPassDialog";

import "./ScheduleBoard.css";

interface Props {
    timeTable: string[][];
    isAdmin: boolean;
    curDate: Date;
    setTableDate: (dt: Date) => void;
    onSubmit: (
        targetDate: Date,
        timeStr: string,
        facilityIndex: number,
        userName: string,
        phoneNumber: string
    ) => void;
    onSubmitCancel: (
        targetDate: Date,
        timeStr: string,
        facilityIndex: number
    ) => void;
    onInputAdminPass: (adminPassword: string) => void;
}

const ScheduleBoard: React.FC<Props> = (props): React.ReactNode => {
    const [openAdminPassDialog, setOpenAdinPassDialog] = useState(false);

    // 予約実行
    const handleOnSubmit = (
        targetDate: Date,
        timeStr: string,
        facilityIndex: number,
        userName: string,
        phoneNumber: string
    ): void => {
        props.onSubmit(
            targetDate,
            timeStr,
            facilityIndex,
            userName,
            phoneNumber
        );
    }

    // 取り消し実行
    const handleOnSubmitCancel = (
        targetDate: Date,
        timeStr: string,
        facilityIndex: number
    ): void => {
        props.onSubmitCancel(
            targetDate,
            timeStr,
            facilityIndex
        );
    }

    // 管理者メニュー
    const handleOnLoginAdmin = () => {
        // 管理者ダイアログを開く
        console.log("管理者ログイン!");
        setOpenAdinPassDialog(true);
    }
    // 管理者ダイアログクローズ
    const handleOnCloseAdminDialog = () => {
        setOpenAdinPassDialog(false);
    }
    // 管理者ダイアログからの登録
    const handleOnSubmitAdminDialog = (adminPassword: string) => {
        // 入力チェックしてOKなら管理者モード
        props.onInputAdminPass(adminPassword);

        setOpenAdinPassDialog(false);
    }

    return (
        <div>
            <ControlMenu
                onLoginAdmin={handleOnLoginAdmin}
            />
            <ScheduleHeader
                curDate={props.curDate}
                setTableDate={props.setTableDate}
            />
            <ScheduleBody
                timeTable={props.timeTable}
                isAdmin={props.isAdmin}
                curDate={props.curDate}
                onSubmit={handleOnSubmit}
                onSubmitCancel={handleOnSubmitCancel}
            />
            <AdminPassDialog
                open={openAdminPassDialog}
                onClose={handleOnCloseAdminDialog}
                onSubmit={handleOnSubmitAdminDialog}
            />
        </div>
    );
}

export { ScheduleBoard };
