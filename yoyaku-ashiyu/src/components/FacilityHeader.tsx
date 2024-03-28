
const TargetHeader = (
    props: {targetName: string}
): React.ReactNode => {
    return (
        <div
            className="line-item header-item facility-column"
        >
            Target header { props.targetName }
        </div>
    );
}

export { TargetHeader };
