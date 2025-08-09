import { useState } from 'react';
import './App.css'
import Calendar from './calendar/calendar'
import Events from './events/events'

function App() {
  const [events, setEvents] = useState([]);

  return (
    <div id='container' className='flexbox'>
      <Calendar></Calendar>
      <Events events={events} setEvents={setEvents}></Events>
    </div>
  )
}

export default App
