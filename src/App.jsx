import { useState } from 'react';
import './App.css'
import Calendar from './calendar/calendar'
import Events from './events/events'

function App() {
  const [eventLists, setEventLists] = useState({
    date: new Date(),
    events: {},
    order: []
  });

  return (
    <div id='container' className='flexbox'>
      <Calendar></Calendar>
      <Events eventLists={eventLists} setEventLists={setEventLists}></Events>
    </div>
  )
}

export default App
