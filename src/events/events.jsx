import { useState } from "react";
import Modal from "./modal";
import "./events.css"

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const addToEvents = (value) => {
        let newArray = [...events];
        newArray.push(value);
        newArray.sort((a, b) => { return (new Date(a.date)) - (new Date(b.date)) });
        setEvents(newArray);
    };

    const saveEvent = (event) => {
        event.id = crypto.randomUUID();
        addToEvents(event);
    }
    
    return (
        <>
            <div id="events-container" className="flex-grow flexbox-column">
                <div id="events-header" className="flexbox">
                    <div className="flex-grow">Events</div>
                    <button onClick={() => {setShowModal(true)}}>+</button>
                </div>
                <div className="flex-grow">
                    {events.map((event) => {
                        return (<div key={event.id}>{event.name}</div>)
                    })}
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} saveEvent={saveEvent}></Modal>
        </>
    )
}

export default Events;