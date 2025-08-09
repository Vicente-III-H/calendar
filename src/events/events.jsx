import { useState } from "react";
import Modal from "./modal";
import "./events.css"

function EventCard({ event }) {
    /* finish */
    return (
        <div>
            {event.name}
        </div>
    )
}

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const addToEvents = (value) => {
        let newArray = [...events, value];
        newArray.sort((a, b) => { return (new Date(a.date)) - (new Date(b.date)) });
        setEvents(newArray);
    };
    
    return (
        <>
            <div id="events-container" className="flex-grow flexbox-column">
                <div id="events-header" className="flexbox">
                    <div className="flex-grow">Events</div>
                    <button onClick={() => {setShowModal(true)}}>+</button>
                </div>
                <div className="flex-grow">
                    {events.map((event) => <EventCard key={event.id} event={event}></EventCard>)}
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} addToEvents={addToEvents}></Modal>
        </>
    )
}

export default Events;