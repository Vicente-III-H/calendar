import { useState } from "react";
import Modal from "./modal";
import "./events.css"

function EventCard({ event, deleteEvent }) {
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
                <div className="flex-grow">{event.name}</div>
                <button onClick={() => {deleteEvent(event)}}>-</button>
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

function EventSection({ title, eventList, deleteEvent }) {
    if (eventList.length === 0) {
        return null;
    }

    return (
        <div>
            <div>{title}</div>
            <div className="flex-grow">
                {eventList.map((event) => <EventCard key={event.id} event={event} deleteEvent={deleteEvent}></EventCard>)}
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
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let newEventLists = {...eventLists};
        
        const key = year + "-" + month;
        if (!(key in newEventLists.events)) {
            newEventLists.events[key] = {};
        }

        if (!(day in newEventLists.events[key])) {
            newEventLists.events[key][day] = [];
        }
        newEventLists.events[key][day].push(event);
        newEventLists.events[key][day].sort((a, b) => { return (new Date(a.date)) - (new Date(b.date)) });

        if (!newEventLists.order.find((value) => value === key)) {
            newEventLists.order.push(key);
            newEventLists.order.sort((a, b) => {
                const [yearA, monthA] = a.split("-");
                const [yearB, monthB] = b.split("-");
                return Number(yearA) - Number(yearB) + ((Number(monthA) - Number(monthB)) / 12);
            });
        }

        setEventLists(newEventLists);
    };
    const deleteEvent = (event) => {
        const date = new Date(event.date);
        let newEventLists = {...eventLists};
        /* need to delete empty year, month, day */
        const deleteIndex = newEventLists.events[date.getFullYear()][date.getMonth()][date.getDate()].indexOf(event);
        newEventLists.events[date.getFullYear()][date.getMonth()][date.getDate()].splice(deleteIndex, 1);

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
                    <EventSection title="Past" eventList={[]} deleteEvent={deleteEvent}></EventSection>
                    <EventSection title="Today" eventList={[]} deleteEvent={deleteEvent}></EventSection>
                    <EventSection title="Upcoming" eventList={[]} deleteEvent={deleteEvent}></EventSection>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} addToEvents={addToEvents}></Modal>
        </>
    )
}

export default Events;