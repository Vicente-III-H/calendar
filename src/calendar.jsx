import { useState } from 'react'
import './calendar.css'

function CalendarHeader({ year, month, changeMonth }) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <>
            <div id='calendar-header' className='flex'>
                <div className='flex-grow'>{monthNames[month] + " " + year}</div>
                <button onClick={() => {changeMonth(-1)}}>{"<"}</button>
                <button onClick={() => {changeMonth()}}>Today</button>
                <button onClick={() => {changeMonth(1)}}>{">"}</button>
            </div>
            <div id='weekdays' className='grid'>
                {weekdayNames.map((day) => (<div key={day}>{day}</div>))}
            </div>
        </>
    )
}

function Day({ day, currentMonth }) {
    return (
        <div className='day flex-column'>
            <div className={(currentMonth !== day.getMonth() ? "not-included": "") + " day-number"}>{day.getDate()}</div>
            <div className="space flex-grow"></div>
        </div>
    )
}

function CalendarDisplay({ calendarDate }) {
    const calendarDays = (() => {
        const startingDay = calendarDate.getDay();
        
        let dates = []
        for (let counter = 0; counter < 42; counter++) {
            dates.push(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1 - startingDay + counter))
        }

        return dates;
    })();

    return (
        <div className="calendar grid flex-grow">
            {calendarDays.map((date) => (<Day key={date} day={date} currentMonth={calendarDate.getMonth()}></Day>))}
        </div>
    )
}

function Calendar() {
    const [calendarMonth, setCalendarMonth] = useState(0);
    const changeMonth = (increment = 0) => {
        setCalendarMonth(increment !== 0 ? calendarMonth + increment : 0);
    }

    const today = new Date();
    const calendarDate = new Date(today.getFullYear(), today.getMonth() + calendarMonth, 1);
    
    return (
        <div className='calendar-container flex-column'>
            <CalendarHeader year={calendarDate.getFullYear()} month={calendarDate.getMonth()} changeMonth={changeMonth}></CalendarHeader>
            <CalendarDisplay calendarDate={calendarDate}></CalendarDisplay>
        </div>
    )
}

export default Calendar