import { ScheduleBodyLine } from "./ScheduleBodyLine";

const ScheduleBody = (props: {timeTable: string[][], isAdmin: boolean}): React.ReactNode => {
    if (!props.timeTable) {return <></>;}
    return (
        <div>
            {
                props.timeTable.map((row, i) =>
                    <ScheduleBodyLine
                        key={`sbl_${i}`}
                        rowData={row}
                        isAdmin={props.isAdmin}
                    />
                )
            }
        </div>
    );
}

export { ScheduleBody };
