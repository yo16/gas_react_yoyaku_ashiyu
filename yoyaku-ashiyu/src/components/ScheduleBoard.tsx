import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleBody } from "./ScheduleBody";

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
}

const ScheduleBoard: React.FC<Props> = (props): React.ReactNode => {
    const handleOnSubmit = (
        targetDate: Date,
        timeStr: string,
        facilityIndex: number,
        userName: string,
        phoneNumber: string
    ): void => {
        // 予約実行
        props.onSubmit(
            targetDate,
            timeStr,
            facilityIndex,
            userName,
            phoneNumber
        );
    }

    return (
        <div>
            <ScheduleHeader
                curDate={props.curDate}
                setTableDate={props.setTableDate}
            />
            <ScheduleBody
                timeTable={props.timeTable}
                isAdmin={props.isAdmin}
                curDate={props.curDate}
                onSubmit={handleOnSubmit}
            />
        </div>
    );
}

export { ScheduleBoard };
