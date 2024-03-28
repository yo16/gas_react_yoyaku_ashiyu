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

export {
    formatDtAsMMDD,
    formatDtAsyyyymmdd,
};
