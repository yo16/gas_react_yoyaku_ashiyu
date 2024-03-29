
const FacilityHeader = (
    props: {targetName: string}
): React.ReactNode => {
    return (
        <div
            className="line-item header-item facility-column"
        >
            { props.targetName }
        </div>
    );
}

export { FacilityHeader };
