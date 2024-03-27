import { TimeHeader } from "./TimeHeader";
import { TargetHeader } from "./TargetHeader";

const ScheduleHeader = (): React.ReactNode => {
    return (
        <>
            <TimeHeader />
            <TargetHeader targetName="A" />
            <TargetHeader targetName="B" />
            <TargetHeader targetName="C" />
            <TargetHeader targetName="D" />
        </>
    );
}

export { ScheduleHeader };
