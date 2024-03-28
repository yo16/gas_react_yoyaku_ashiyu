

const TimeItem = (props: {time: string}): React.ReactNode => {
    const timeStr = `0${props.time}`.slice(-4);
    const h = Number(timeStr.substring(0, 2));
    const m = timeStr.substring(2,4);
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
