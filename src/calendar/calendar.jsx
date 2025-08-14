import { useState } from 'react'
import './calendar.css'

function CalendarHeader({ year, month, changeMonth }) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <>
            <div id='calendar-header' className='flexbox flexbox-center-items'>
                <h1 className='major-title flex-grow'>{monthNames[month] + " " + year}</h1>
                <button onClick={() => {changeMonth(-1)}}>{"<"}</button>
                <button onClick={() => {changeMonth()}}>Today</button>
                <button onClick={() => {changeMonth(1)}}>{">"}</button>
            </div>
            <div id='weekdays' className='grid'>
                {weekdayNames.map((day) => (<div key={day} className='regular-title'>{day}</div>))}
            </div>
        </>
    )
}

function Day({ day, currentMonth, events, today }) {
    const includedInMonth = currentMonth === day.getMonth();
    const isToday = day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth() && day.getDate() === today.getDate();

    return (
        <div className='day flexbox-column'>
            <div className={(includedInMonth ? "regular-title" : "not-included") + (isToday ? " today" : "") + " day-number"}>{day.getDate()}</div>
            <div className="space flex-grow flexbox-column">
                {events.map((event) =>
                    includedInMonth ?
                    <div key={event.id} className="day-event flexbox flexbox-center-items">
                        <div className="day-event-colour" style={{backgroundColor: event.color}}></div>
                        <div className="day-event-name">{event.name}</div>
                    </div> :
                    null)}
            </div>
        </div>
    )
}

function CalendarDisplay({ calendarDate, eventList, today }) {
    const calendarDays = (() => {
        const startingDay = calendarDate.getDay();
        
        let dates = []
        for (let counter = 0; counter < 42; counter++) {
            dates.push(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1 - startingDay + counter))
        }

        return dates;
    })();

    return (
        <div id='calendar' className="grid flex-grow">
            {calendarDays.map((date) => (<Day key={date} day={date} currentMonth={calendarDate.getMonth()} events={date.getDate() in eventList ? eventList[date.getDate()] : []} today={today}></Day>))}
        </div>
    )
}

function Calendar({ eventList }) {
    const [calendarMonth, setCalendarMonth] = useState(0);
    const changeMonth = (increment = 0) => {
        setCalendarMonth(increment !== 0 ? calendarMonth + increment : 0);
    }

    const calendarDate = new Date(eventList.date.getFullYear(), eventList.date.getMonth() + calendarMonth, 1);
    const monthKey = calendarDate.getFullYear() + "-" + calendarDate.getMonth();
    
    return (
        <div id='calendar-container' className='flexbox-column background'>
            <CalendarHeader year={calendarDate.getFullYear()} month={calendarDate.getMonth()} changeMonth={changeMonth}></CalendarHeader>
            <CalendarDisplay calendarDate={calendarDate} eventList={monthKey in eventList.events ? eventList.events[monthKey] : {}} today={eventList.date}></CalendarDisplay>
        </div>
    )
}

export default Calendar