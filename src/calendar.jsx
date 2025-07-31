import './calendar.css'

function Day(props) {
    return (
        <div className='day'>
            <div className="day-number">{props.day}</div>
            <div className="space"></div>
        </div>
    )
}

function Calendar(props) {
    const calendarDays = (() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + props.month;

        const startingDay = (new Date(year, month, 1)).getDay();
        
        let dates = []
        for (let counter = 0; counter < 42; counter++) {
            dates.push(new Date(year, month, 1 - startingDay + counter))
        }

        return dates;
    })();

    return (
        <div className="calendar">
            {calendarDays.map((day) => (<Day key={day} day={day.getDate()}></Day>))}
        </div>
    )
}

export default Calendar