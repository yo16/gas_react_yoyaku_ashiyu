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
}

const ScheduleBody: React.FC<Props> = (props): React.ReactNode => {
    const handleOnSubmit = (timeStr: string, facilityIndex: number, userName: string, phoneNumber: string): void => {
        // 予約実行
        props.onSubmit(props.curDate, timeStr, facilityIndex, userName, phoneNumber);
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
                    />
                )
            }
        </div>
    );
}

export { ScheduleBody };
