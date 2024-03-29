import { useState, useEffect } from 'react';

import './App.css'
import { formatDtAsMMDD, formatDtAsyyyymmdd } from './common/dateTool';
import { ScheduleBoard } from './components/ScheduleBoard';
import { GASClient } from 'gas-client';

const { serverFunctions } = new GASClient();

/* eslint @typescript-eslint/no-unused-vars: 0 */

function App() {
  const [curDatesTimeTable, setCurDatesTimeTable] = useState<object[][]>([]);
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [isAdmin] = useState<boolean>(true);

  // スプレッドシートから、今日の予約状況を取得
  useEffect(() => {
    serverFunctions
      .getBookingInfo(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        curDate.getDate()
      )
      .then((res: object[][]) => {
        displayBookingInfo(res);
      })
      .catch((err: unknown) => {
        console.error(err);
      })
    ;
  }, [curDate]);

  const displayBookingInfo = (values: object[][]) => {
    console.log({values});
    setCurDatesTimeTable(values);
  }

  //const handleTest = () => {
  //  serverFunctions
  //    .getMonthlySeet(2024,3)
  //    .then((res: unknown) => console.log(res))
  //    .catch((err: unknown) => console.error(err) )
  //  ;
  //};

  return (
    <>
      <h1>シャワー予約</h1>
      <div>今日は{ formatDtAsMMDD(new Date) }</div>
      <hr />
      <h1>予約状況</h1>
      {/* <button onClick={handleTest}>テスト</button> */}
      <input
        type="date"
        value={formatDtAsyyyymmdd(curDate, '-')}
        onChange={e => setCurDate(new Date(e.target.value))}
        className="iptCalender"
      />
      <ScheduleBoard
        timeTable={curDatesTimeTable}
        isAdmin={isAdmin}
      />
    </>
  );
}

export default App
