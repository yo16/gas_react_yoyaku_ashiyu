import { TimeItem } from "./TimeItem";
import { FacilityItem } from "./FacilityItem";

const ScheduleBodyLine = (): React.ReactNode => {
    return (
        <div className="line-items body-line-items">
            <TimeItem />
            <FacilityItem />
            <FacilityItem />
            <FacilityItem />
            <FacilityItem />
        </div>
    );
}

export { ScheduleBodyLine };
