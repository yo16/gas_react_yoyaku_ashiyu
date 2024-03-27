import { TimeHeader } from "./TimeHeader";
import { TargetHeader } from "./FacilityHeader";

import "./ScheduleHeader.css";

const ScheduleHeader = (): React.ReactNode => {
    return (
        <div
            className="schedule-header line-items"
        >
            <TimeHeader />
            <TargetHeader targetName="A" />
            <TargetHeader targetName="B" />
            <TargetHeader targetName="C" />
            <TargetHeader targetName="D" />
        </div>
    );
}

export { ScheduleHeader };
