import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleBody } from "./ScheduleBody";

import "./ScheduleBoard.css";

const ScheduleBoard = (): React.ReactNode => {
    return (
        <>
            <ScheduleHeader />
            <ScheduleBody />
        </>
    );
}

export { ScheduleBoard };
