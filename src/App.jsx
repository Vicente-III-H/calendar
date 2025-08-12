import { useState } from 'react';
import './App.css'
import Calendar from './calendar/calendar'
import Events from './events/events'

function App() {
  const [eventList, setEventList] = useState({
    date: new Date(),
    events: {},
    order: []
  });

  return (
    <div id='container' className='flexbox'>
      <Calendar></Calendar>
      <Events eventList={eventList} setEventList={setEventList}></Events>
    </div>
  )
}

export default App
