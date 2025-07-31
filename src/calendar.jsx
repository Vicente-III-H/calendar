import './calendar.css'

function Day(props) {
    return (
        <div className='day'>
            <div className={(props.currentMonth !== props.day.getMonth() ? "not-included": "") + " day-number"}>{props.day.getDate()}</div>
            <div className="space"></div>
        </div>
    )
}

function Calendar(props) {
    const today = new Date();
    const calendarDate = new Date(today.getFullYear(), today.getMonth() + props.monthOffset, 1);

    const calendarDays = (() => {
        const startingDay = calendarDate.getDay();
        
        let dates = []
        for (let counter = 0; counter < 42; counter++) {
            dates.push(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1 - startingDay + counter))
        }

        return dates;
    })();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <>
            <div>{monthNames[calendarDate.getMonth()]}</div>
            <div className="calendar">
                {calendarDays.map((day) => (<Day key={day} day={day} currentMonth={calendarDate.getMonth()}></Day>))}
            </div>
        </>
    )
}

export default Calendar