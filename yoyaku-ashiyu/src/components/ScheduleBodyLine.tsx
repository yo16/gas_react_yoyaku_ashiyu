import { TimeItem } from "./TimeItem";
import { FacilityItem, FacilityItemInfo } from "./FacilityItem";

interface Props {
    rowData: string[];
    isAdmin: boolean;
    curDate: Date;
    onSubmit: (timeStr: string, facilityIndex: number, userName: string, phoneNumber: string) => void;
}

const ScheduleBodyLine: React.FC<Props> = (props): React.ReactNode => {
    // facilityの数を配列から計算する （１施設ごとに３列）
    const facilityCount = Math.floor((props.rowData.length - 2) / 3);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const facilities: FacilityItemInfo[] = [...Array(facilityCount)].map(
        (_, i): FacilityItemInfo => {
            return {
                index: i,
                userName: props.rowData[2 + i*3],
                phoneNumber: props.rowData[2 + i*3 + 1],
                memo: props.rowData[2 + i*3 + 2],
            };
        }
    );

    const handleOnSubmit = (facilityIndex: number, userName: string, phoneNumber: string): void => {
        // 予約実行
        props.onSubmit(props.rowData[1], facilityIndex, userName, phoneNumber);
    }

    return (
        <div className="line-items body-line-items">
            <TimeItem
                time={props.rowData[1]}
            />
            <div className="facility-columns">
                {facilities.map((f, i) => 
                    <FacilityItem
                        key={`fi_${i}`}
                        info={f}
                        isAdmin={props.isAdmin}
                        curDate={props.curDate}
                        bookingTime={props.rowData[1]}
                        facilityIndex={i}
                        onSubmit={handleOnSubmit}
                    />
                )}
            </div>
        </div>
    );
}

export { ScheduleBodyLine };
