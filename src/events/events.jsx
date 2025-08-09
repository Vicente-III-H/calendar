import { useState } from "react";
import Modal from "./modal";
import "./events.css"

function EventCard({ event }) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    };
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    };

    return (
        <div className="event-card flexbox-column">
            <div className="event-card-header">
                <div style={{backgroundColor: event.color}} className="colour-box"></div>
                <div>{event.name}</div>
            </div>
            <div>
                {formatDate(event.date)}
            </div>
            <div>
                {formatTime(event.date)}
            </div>
            <div>
                {event.notes}
            </div>
        </div>
    )
}

function EventSection({ title, events }) {
    
    return (
        <div>
            <div>{title}</div>
            <div className="flex-grow">
                {events.map((event) => <EventCard key={event.id} event={event}></EventCard>)}
            </div>
        </div>
    )
}

function Events({ events, setEvents }) {
    const [showModal, setShowModal] = useState(false);
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
                <EventSection title="Past" events={[]}></EventSection>
                <EventSection title="Today" events={events}></EventSection>
                <EventSection title="Future" events={[]}></EventSection>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} addToEvents={addToEvents}></Modal>
        </>
    )
}

export default Events;