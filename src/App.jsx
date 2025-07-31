import { useState } from 'react'
import './App.css'
import Calendar from './calendar'

function App() {
  const [calendarMonth, setCalendarMonth] = useState(0);
  
  const changeMonth = (increase = true) => {
    const newMonth = increase ? calendarMonth + 1 : calendarMonth - 1;
    setCalendarMonth(newMonth);
  }

  return (
    <div className='container'>
      <Calendar monthOffset={calendarMonth}></Calendar>
      <button onClick={() => {changeMonth(false)}}>prev. month</button>
      <button onClick={() => {setCalendarMonth(0)}}>today</button>
      <button onClick={changeMonth}>next month</button>
    </div>
  )
}

export default App
