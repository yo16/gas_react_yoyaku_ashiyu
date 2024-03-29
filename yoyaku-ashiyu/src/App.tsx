import { useState, useLayoutEffect } from 'react';

import './App.css'
import { ScheduleBoard } from './components/ScheduleBoard';
import { GASClient } from 'gas-client';

const { serverFunctions } = new GASClient();

/* eslint @typescript-eslint/no-unused-vars: 0 */

function App() {
  const [curDatesTimeTable, setCurDatesTimeTable] = useState<string[][]>([]);
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [isAdmin] = useState<boolean>(true);

  const displayBookingInfo = (values: string[][]) => {
    setCurDatesTimeTable(values);
  }

  // 初期処理
  // Google SpreadSheetからデータを読み込んで更新
  useLayoutEffect(() => {
    handleSetTableDate(new Date());
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  // スプレッドシートから、今日の予約状況を取得
  const handleSetTableDate = (newDate: Date) => {
    serverFunctions
      .getBookingInfo(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        newDate.getDate()
      )
      .then((res: string[][]) => {
        displayBookingInfo(res);
        setCurDate(() => newDate);
      })
      .catch((err: unknown) => {
        console.error(err);
      })
    ;
  }

  return (
    <>
      <ScheduleBoard
        timeTable={curDatesTimeTable}
        isAdmin={isAdmin}
        curDate={curDate}
        setTableDate={handleSetTableDate}
      />
    </>
  );
}

export default App
