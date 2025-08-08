import './App.css'
import Calendar from './calendar/calendar'
import Events from './events/events'

function App() {
  return (
    <div id='container' className='flexbox'>
      <Calendar></Calendar>
      <Events></Events>
    </div>
  )
}

export default App
