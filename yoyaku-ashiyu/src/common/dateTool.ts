/* 日付関連 */

const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'];

// Dateを M月D日(曜日) の形式にする
const formatDtAsMMDD = (dt: Date): string => {
    const m: number = dt.getMonth() + 1;
    const d: number = dt.getDate();
    const wd: string = WEEKDAY[dt.getDay()];

    return `${m}月${d}日(${wd})`;
}

// Dateを yyyy-mm-dd の形式にする mm、ddは前ゼロ
const formatDtAsyyyymmdd = (dt: Date, sepalator: string): string => {
    const y: number = dt.getFullYear();
    const m: number = dt.getMonth() + 1;
    const mStr: string = `0${m}`.slice(-2);
    const d: number = dt.getDate();
    const dStr: string = `0${d}`.slice(-2);
    
    return `${y}${sepalator}${mStr}${sepalator}${dStr}`;
}

type HM = {
    hour: number;
    hourStr: string;
    hour0Str: string;
    minute: number;
    // minuteStr: string;   // 使わないから作らない
    minute0Str: string;
}
const getHM = (hhmm: string): HM => {
    const tokens = hhmm.split(":");
    const h = Number(tokens[0]);
    const m = Number(tokens[1]);
    const retHm: HM = {
        hour: h,
        hourStr: "",
        hour0Str: "",
        minute: m,
        minute0Str: "",
    };
    makeHMStr(retHm);

    return retHm;
}
const makeHMStr = (hm: HM): void => {
    hm.hourStr = String(hm.hour);
    hm.hour0Str = `0${hm.hour}`.slice(-2);
    hm.minute0Str = `0${hm.minute}`.slice(-2);
}

// 時刻のhh:mmを h:mm～ の形式にする
const formatTimeForDisp = (hhmm: string): string => {
    const hm = getHM(hhmm);
    return `${hm.hourStr}:${hm.minute0Str}～`;
}

// 時刻のhh:mm(開始時刻)を h:mm～h:mm の形式にする toは30分後
const formatTimeForDispFromTo = (hhmm: string): string => {
    const fromHM: HM = getHM(hhmm);
    const toHM: HM = getHM(hhmm);
    
    toHM.minute += 30;
    toHM.hour += Math.floor(toHM.minute / 60);
    toHM.minute = toHM.minute % 60;
    makeHMStr(toHM);

    return `${fromHM.hourStr}:${fromHM.minute0Str}～${toHM.hourStr}:${toHM.minute0Str}`;
}

export {
    formatDtAsMMDD,
    formatDtAsyyyymmdd,
    formatTimeForDisp,
    formatTimeForDispFromTo,
};
