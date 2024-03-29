import { formatDtAsMMDD, formatDtAsyyyymmdd } from '../common/dateTool';

import { TimeHeader } from "./TimeHeader";
import { FacilityHeader } from "./FacilityHeader";

import "./ScheduleHeader.css";

const FASILITIES = ['A', 'B', 'C', 'D'];

interface Props {
    curDate: Date;
    setTableDate: (dt: Date) => void;
}

const ScheduleHeader: React.FC<Props> = (props): React.ReactNode => {
    return (
        <div
            className="schedule-header"
        >
            <div className="divPageHeader">
                <div className="h1">シャワー予約</div>
                <div>今日は{ formatDtAsMMDD(new Date()) }</div>
            </div>

            <hr />

            <div
                className="curDtCtrl"
            >
                <a
                    onClick={() => {
                        const prevDate = new Date(props.curDate.getTime());
                        prevDate.setDate(prevDate.getDate() - 1);
                        props.setTableDate(prevDate);
                    }}
                    className="linkChangeDt"
                ><span className="material-symbols-outlined">
                    arrow_back
                </span></a>
                <input
                    type="date"
                    value={formatDtAsyyyymmdd(props.curDate, '-')}
                    onChange={e => props.setTableDate(new Date(e.target.value))}
                    className="iptCalender"
                />
                <a
                    onClick={() => {
                        const nextDate = new Date(props.curDate.getTime());
                        nextDate.setDate(nextDate.getDate() + 1);
                        props.setTableDate(nextDate);
                    }}
                    className="linkChangeDt"
                ><span className="material-symbols-outlined">
                    arrow_forward
                </span></a>
            </div>
            
            <div
                className="line-items"
            >
                <TimeHeader />
                <div className="facility-columns">
                    {FASILITIES.map((f, i) => <FacilityHeader
                        key={`fh_${i}`}
                        targetName={f}
                    />)}
                </div>
            </div>
        </div>

    );
}

export {
    ScheduleHeader,
    FASILITIES,
};
