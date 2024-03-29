
const TimeItem = (props: {time: string}): React.ReactNode => {
    const timeStr = `0${props.time}`.slice(-5);
    const h = Number(timeStr.substring(0, 2));
    const m = timeStr.substring(3,5);
    const hm = `${h}:${m}～`;

    return (
        <div
            className="line-item body-item time-column"
        >
            { hm }
        </div>
    );
}

export { TimeItem };
