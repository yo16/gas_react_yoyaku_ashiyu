const props = PropertiesService.getScriptProperties();
const SHEET_ID: string | null = props.getProperty('ss_id');
const ADMIN_PASSWORD: string | null = props.getProperty('admin_password');

const FASILITIES = ['A', 'B', 'C', 'D'];
const TIMETABLE: string[] = [
  '0900',
  '0930',
  '1000',
  '1030',
  '1100',
  '1130',
  '1200',
  '1230',
  '1300',
  '1330',
  '1400',
  '1430',
  '1500',
  '1530',
  '1600',
  '1630',
  '1700',
  '1730',
  '1800',
  '1830',
  '1900',
  '1930',
  '2000',
  '2030',
];

export function doGet() {
    return HtmlService.createHtmlOutputFromFile("hosting/index.html")
      .addMetaTag("viewport", "width=device-width, initial-scale=1")
      .setTitle("♨シャワー予約♨");
}

// 指定した日の予約状況を返す
export function getBookingInfo(y: number, m: number, d: number): object[][] {
  // シートを取得
  const sh = getMonthlySeet(y, m);

  // 日付範囲を取得
  const timetableCount = TIMETABLE.length;
  const facilityCount = FASILITIES.length;
  const curDtRange = sh.getRange(
    4 + (d - 1) * timetableCount,
    1,
    timetableCount,
    2 + 3 * facilityCount
  );
  //const vals = curDtRange.getValues();
  const vals = curDtRange.getDisplayValues();
  return vals;
}

// 月のシートを得る
function getMonthlySeet(year: number, month: number) {
  const monthStr = `0${month}`.slice(-2);
  const sheetName = `${year}${monthStr}`;
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const shOld = ss.getSheetByName(sheetName);
  // 存在する場合はアクティブにして返す
  if (shOld) {
    shOld.activate();
    return shOld;
  }

  // 作成
  const sh = ss.insertSheet();
  sh.setName(sheetName);
  sh.activate();
  ss.moveActiveSheet(1);    // まず先頭に移動

  // 適切な場所へ移動
  const sheets = ss.getSheets();
  // sheetsの間の数値になる. 1～sheets.length+1 （最初は１）
  const insPos = sheets.reduce((curPos, s, i) => {
    // 先頭は自分なので何もせずスキップ
    if (i === 0) { return curPos;}
    // 交換する場所を探す
    let retPos = curPos;
    if (s.getName() < sheetName) {
      // 今見ているシートの位置を指定
      retPos = i + 1;
    }
    return retPos;
  }, 1);
  ss.moveActiveSheet(insPos);

  // ヘッダー
  sh.getRange(1, 1).setValue(`${year}年${month}月予約表`);
  sh.getRange(3, 1).setValue('日にち');
  sh.getRange(3, 2).setValue('時刻');
  const facilityCount = FASILITIES.length;
  for( let i=0; i<facilityCount; i++ ){
    sh.getRange(2, i*3+3).setValue(FASILITIES[i]);
    sh.getRange(3, i*3+3).setValue('氏名');
    sh.getRange(3, i*3+4).setValue('連絡先');
    sh.getRange(3, i*3+5).setValue('備考');
  }
  sh.setFrozenRows(3);
  sh.setFrozenColumns(2);

  // 日にち
  const firstDt = new Date(year, month-1, 1);
  const lastDt = new Date(year, month, 0);
  const daysCount = lastDt.getDate() - firstDt.getDate() + 1;
  const timetableCount = TIMETABLE.length;
  for (let d=0; d<daysCount; d++) {
    TIMETABLE.forEach((tm: string, i) => {
      const curRow = 4 + d * timetableCount + i;
      sh.getRange(curRow, 1).setValue(`${year}/${month}/${d+1}`);
      sh.getRange(curRow, 2).setValue(formatTime2Str(tm));
    });
  }

  // 日ごとの罫線
  for (let d=0; d<daysCount; d++) {  // １日目の上から
    const firstTimeRow = 4 + d * timetableCount;
    sh.getRange(firstTimeRow, 1, 1, 2 + facilityCount * 3)
      .setBorder(true, null, null, null, null, null);
  }
  // Facilityごとの罫線
  for (let f=0; f<facilityCount; f++) {
    const firstCol = 3 + f * 3;
    sh.getRange(2, firstCol, 2 + daysCount * timetableCount, 1)
      .setBorder(null, true, null, null, null, null);
  }

  // 列の書式を「書式なしテキスト」に設定
  sh.getRange(4, 3, timetableCount * daysCount, 3 * facilityCount)
    .setNumberFormat('@');

  return sh;
}

// 予約実行
// timeは、hh:mm
export function makeABooking(
  year: number,
  month: number,
  date: number,
  time: string,
  facilityIndex: number,
  userName: string,
  phoneNumber: string
): boolean {
  // シートを取得
  const sh = getMonthlySeet(year, month);

  const timetableCount = TIMETABLE.length;
  const fristTimeRow = 4 + (date - 1) * timetableCount;
  const targetRow = fristTimeRow + getTimeIndex(time);
  sh.getRange(targetRow, 3 + facilityIndex * 3).setValue(userName);
  sh.getRange(targetRow, 3 + facilityIndex * 3 + 1).setValue(phoneNumber);

  return true;
}

// 予約取り消し
// timeは、hh:mm
export function cancelABooking(
  year: number,
  month: number,
  date: number,
  time: string,
  facilityIndex: number
): boolean {
  // シートを取得
  const sh = getMonthlySeet(year, month);

  const timetableCount = TIMETABLE.length;
  const fristTimeRow = 4 + (date - 1) * timetableCount;
  const targetRow = fristTimeRow + getTimeIndex(time);
  sh.getRange(targetRow, 3 + facilityIndex * 3).setValue("");
  sh.getRange(targetRow, 3 + facilityIndex * 3 + 1).setValue("");

  return true;
}


// hh:mmの時刻のindexを取得
function getTimeIndex(tm: string): number {
  // コロンを消して、念のため前ゼロ
  const hhmm = ('0' + tm.replace(':','')).slice(-4);

  return TIMETABLE.indexOf(hhmm);
}

// 管理者の確認
export function isValidAdmin(adminPassword: string): boolean {
  if (!ADMIN_PASSWORD) return false;

  return (adminPassword === ADMIN_PASSWORD );
}


// -----------
// hhdd形式の文字列を、hh:ddに変える

function formatTime2Str(tm: string) {
  return `${tm.substring(0,2)}:${tm.substring(2)}`;
}
