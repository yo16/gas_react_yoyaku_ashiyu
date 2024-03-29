import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleBody } from "./ScheduleBody";

import "./ScheduleBoard.css";

const ScheduleBoard = (props: {timeTable: object[][], isAdmin: boolean}): React.ReactNode => {
    console.log("ScheduleBoard");
    console.log(props.timeTable);
    return (
        <div>
            <ScheduleHeader />
            <ScheduleBody
                timeTable={props.timeTable}
                isAdmin={props.isAdmin}
            />
        </div>
    );
}

export { ScheduleBoard };
