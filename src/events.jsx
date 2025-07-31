import "./events.css"

function Events() {
    return (
        <div id="events-container" className="flex-grow flexbox-column">
            <div id="events-header" className="flexbox">
                <div className="flex-grow">Events</div>
                <button>+</button>
            </div>
            <div className="flex-grow"></div>
        </div>
    )
}

export default Events;