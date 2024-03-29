import { formatTimeForDisp } from "../common/dateTool";

// timeは、hh:mm 形式で入っている前提
const TimeItem = (props: {time: string}): React.ReactNode => {
    // hh:mm を h:mm～ へ変換
    const hm = formatTimeForDisp(props.time);

    return (
        <div
            className="line-item body-item time-column"
        >
            { hm }
        </div>
    );
}

export { TimeItem };
