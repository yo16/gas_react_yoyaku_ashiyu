import { ScheduleBodyLine } from "./ScheduleBodyLine";

interface Props {
    timeTable: string[][];
    isAdmin: boolean;
    curDate: Date;
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
}

const ScheduleBody: React.FC<Props> = (props): React.ReactNode => {
    // 予約実行
    const handleOnSubmit = (timeStr: string, facilityIndex: number, userName: string, phoneNumber: string): void => {
        props.onSubmit(props.curDate, timeStr, facilityIndex, userName, phoneNumber);
    }
    // 取り消し実行
    const handleOnSubmitCancel = (timeStr: string, facilityIndex: number): void => {
        props.onSubmitCancel(props.curDate, timeStr, facilityIndex);
    }

    if (!props.timeTable) {return <></>;}
    return (
        <div>
            {
                props.timeTable.map((row, i) =>
                    <ScheduleBodyLine
                        key={`sbl_${i}`}
                        rowData={row}
                        isAdmin={props.isAdmin}
                        curDate={props.curDate}
                        onSubmit={handleOnSubmit}
                        onSubmitCancel={handleOnSubmitCancel}
                    />
                )
            }
        </div>
    );
}

export { ScheduleBody };
