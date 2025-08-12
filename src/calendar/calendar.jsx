import { useState } from 'react'
import './calendar.css'

function CalendarHeader({ year, month, changeMonth }) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <>
            <div id='calendar-header' className='flexbox flexbox-center-items'>
                <h1 className='flex-grow'>{monthNames[month] + " " + year}</h1>
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

function Day({ day, currentMonth, events, today }) {
    const includedInMonth = currentMonth === day.getMonth();
    const isToday = day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth() && day.getDate() === today.getDate();

    let overloadedEvents = false;
    if (events.length > 5) {
        events = events.slice(0, 5);
        overloadedEvents = true;
    }

    return (
        <div className='day flexbox-column'>
            <div className={(includedInMonth ? "" : "not-included") + (isToday ? " today" : "") + " day-number"}>{day.getDate()}</div>
            <div className="space flex-grow flexbox">
                {events.map((event) => includedInMonth ? <div key={event.id} style={{backgroundColor: event.color}} className="day-event flex-grow"></div> : null)}
                {includedInMonth && overloadedEvents ? <div>and more...</div> : null}
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