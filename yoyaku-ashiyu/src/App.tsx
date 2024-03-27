import './App.css'
import { formatDtAsMMDD } from "./common/dateTool"
import { ScheduleBoard } from './components/ScheduleBoard'

function App() {
  return (
    <>
      <h1>シャワー予約</h1>
      <h2>今日は{ formatDtAsMMDD(new Date) }</h2>
      <ScheduleBoard />
    </>
  );
}

export default App
