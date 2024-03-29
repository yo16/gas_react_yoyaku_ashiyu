import { TimeItem } from "./TimeItem";
import { FacilityItem, FacilityItemInfo } from "./FacilityItem";

const ScheduleBodyLine = (props: {rowData: unknown[], isAdmin: boolean}): React.ReactNode => {
    // facilityの数を配列から計算する （１施設ごとに３列）
    const facilityCount = Math.floor((props.rowData.length - 2) / 3);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const facilities: FacilityItemInfo[] = [...Array(facilityCount)].map(
        (_, i): FacilityItemInfo => {
            return {
                userName: props.rowData[2 + i*3] as string,
                telNumber: props.rowData[2 + i*3 + 1] as string,
                memo: props.rowData[2 + i*3 + 2] as string,
            };
        }
    );

    return (
        <div className="line-items body-line-items">
            <TimeItem
                time={props.rowData[1] as string}
            />
            <div className="facility-columns">
                {facilities.map((f, i) => 
                    <FacilityItem
                        key={`fi_${i}`}
                        info={f}
                        isAdmin={props.isAdmin}
                    />
                )}
            </div>
        </div>
    );
}

export { ScheduleBodyLine };
