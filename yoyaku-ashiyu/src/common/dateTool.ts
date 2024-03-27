/* 日付関連 */

const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'];

// Dateを M月D日(曜日) の形式にする
const formatDtAsMMDD = (dt: Date): string => {
    const m: number = dt.getMonth() + 1;
    const d: number = dt.getDate();
    const wd: string = WEEKDAY[dt.getDay()];

    return `${m}月${d}日(${wd})`;
}

export {
    formatDtAsMMDD,
};
