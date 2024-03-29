import { ScheduleHeader } from "./ScheduleHeader";
import { ScheduleBody } from "./ScheduleBody";

import "./ScheduleBoard.css";

interface Props {
    timeTable: string[][];
    isAdmin: boolean;
    curDate: Date;
    setTableDate: (dt: Date) => void;
}

const ScheduleBoard: React.FC<Props> = (props) => {
    return (
        <div>
            <ScheduleHeader
                curDate={props.curDate}
                setTableDate={props.setTableDate}
            />
            <ScheduleBody
                timeTable={props.timeTable}
                isAdmin={props.isAdmin}
            />
        </div>
    );
}

export { ScheduleBoard };
