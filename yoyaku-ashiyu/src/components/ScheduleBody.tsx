import { ScheduleBodyLine } from "./ScheduleBodyLine";

const ScheduleBody = (props: {timeTable: object[][], isAdmin: boolean}): React.ReactNode => {
    console.log("ScheduleBody");
    console.log(props.timeTable);
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
