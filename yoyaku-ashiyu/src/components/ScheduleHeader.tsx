import { TimeHeader } from "./TimeHeader";
import { FacilityHeader } from "./FacilityHeader";

import "./ScheduleHeader.css";

const ScheduleHeader = (): React.ReactNode => {
    return (
        <div
            className="schedule-header line-items"
        >
            <TimeHeader />
            <div className="facility-columns">
                <FacilityHeader targetName="A" />
                <FacilityHeader targetName="B" />
                <FacilityHeader targetName="C" />
                <FacilityHeader targetName="D" />
            </div>
        </div>
    );
}

export { ScheduleHeader };
