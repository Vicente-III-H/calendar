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

function EventSection({ title, eventList }) {
    if (eventList.length === 0) {
        return null;
    }

    return (
        <div>
            <div>{title}</div>
            <div className="flex-grow">
                {eventList.map((event) => <EventCard key={event.id} event={event}></EventCard>)}
            </div>
        </div>
    )
}

function Events({ eventLists, setEventLists }) {
    const [showModal, setShowModal] = useState(false);

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    };
    const addToEvents = (event) => {
        const date = new Date(event.date);
        let newEventLists = {...eventLists};
        let selectList = "past";

        if (isSameDay(date, eventLists.date)) { selectList = "today" }
        else if (date > eventLists.date) { selectList = "upcoming" };

        newEventLists[selectList].push(event);
        newEventLists[selectList].sort((a, b) => { return (new Date(a.date)) - (new Date(b.date)) });
        setEventLists(newEventLists);
    };
    
    return (
        <>
            <div id="events-container" className="flex-grow flexbox-column">
                <div id="events-header" className="flexbox">
                    <div className="flex-grow">Events</div>
                    <button onClick={() => {setShowModal(true)}}>+</button>
                </div>
                <div id="events-section-container">
                    <EventSection title="Past" eventList={eventLists.past}></EventSection>
                    <EventSection title="Today" eventList={eventLists.today}></EventSection>
                    <EventSection title="Upcoming" eventList={eventLists.upcoming}></EventSection>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} addToEvents={addToEvents}></Modal>
        </>
    )
}

export default Events;