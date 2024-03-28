import './App.css'
import { formatDtAsMMDD } from './common/dateTool';
import { ScheduleBoard } from './components/ScheduleBoard';
import { GASClient } from 'gas-client';

const { serverFunctions } = new GASClient();

function App() {
  const handleTest = () => {
    serverFunctions
      .editSheet()
      .then((res: unknown) => console.log(res))
      .catch((err: unknown) => console.error(err) )
    ;
  };

  return (
    <>
      <h1>シャワー予約</h1>
      <h2>今日は{ formatDtAsMMDD(new Date) }</h2>
      <button onClick={handleTest}>テスト</button>
      <ScheduleBoard />
    </>
  );
}

export default App
