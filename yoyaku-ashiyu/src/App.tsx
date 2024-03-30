import { useState, useEffect, useLayoutEffect } from 'react';

import './App.css'
import { ScheduleBoard } from './components/ScheduleBoard';
import { GASClient } from 'gas-client';

import { formatDtAsMMDD, formatTimeForDispFromTo } from './common/dateTool';
import { MessageDialog } from './components/MessageDialog';
import { FASILITIES } from './components/ScheduleHeader';

const { serverFunctions } = new GASClient();

/* eslint @typescript-eslint/no-unused-vars: 0 */

function App() {
  const [curDatesTimeTable, setCurDatesTimeTable] = useState<string[][]>([]);
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [openMessageDialog, setOpenMessageDialog] = useState<boolean>(false);

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
        setCurDate(newDate);
      })
      .catch((err: unknown) => {
        console.error(err);
      })
    ;
  }

  // 予約登録
  const handleOnSubmit = (
    targetDate: Date,
    timeStr: string,
    facilityIndex: number,
    userName: string,
    phoneNumber: string
  ): void => {
      // 予約実行
      serverFunctions
        .makeABooking(
          targetDate.getFullYear(),
          targetDate.getMonth() + 1,
          targetDate.getDate(),
          timeStr,
          facilityIndex,
          userName,
          phoneNumber
        )
        .then((res: boolean) => {
          // 予約完了
          handleSetTableDate(targetDate);
          if (res) {
            setMessages(
              [
                `${userName} 様`,
                `【日時】 ${formatDtAsMMDD(targetDate)} ${formatTimeForDispFromTo(timeStr)}`,
                `【設備】 ${FASILITIES[facilityIndex]}`,
              ]
            );
          }
        })
        .catch((err: unknown) => {
          console.error(err);
        })
      ;
  }

  useEffect(() => {
    if (messages.length > 0) {
        setOpenMessageDialog(true);
    }
  }, [messages]);

  const handleOnCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  }

  const handleOnInputAdminPass = (adminPassword: string): void => {
    serverFunctions
      .isValidAdmin(adminPassword)
      .then((isValidAdmin: boolean) => {
        if (isValidAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
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
        onSubmit={handleOnSubmit}
        onInputAdminPass={handleOnInputAdminPass}
      />
      <MessageDialog
        messages={messages}
        open={openMessageDialog}
        onClose={handleOnCloseMessageDialog}
      />
    </>
  );
}

export default App
