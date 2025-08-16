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
        <div className="event-card flexbox-column text-select">
            <div className="event-card-header flexbox flexbox-center-items">
                <div style={{backgroundColor: event.color}} className="colour-box prevent-select"></div>
                <div className="event-name flex-grow regular-title">{event.name}</div>
                <button className="delete-button" onClick={() => {deleteEvent(event)}}>-</button>
            </div>
            <div>
                {formatDate(event.date)}
            </div>
            <div>
                {formatTime(event.date)}
            </div>
            <div style={event.notes === "" ? {} : {paddingTop: "0.1em"}} className="event-notes">
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
            <div className="event-section-title">
                <h2 className="minor-title">{title}</h2>
            </div>
            <div className="event-section flexbox-column flex-grow">
                {eventList.map((event) => <EventCard key={event.id} event={event} deleteEvent={deleteEvent}></EventCard>)}
            </div>
        </div>
    )
}

function Events({ eventList, setEventList }) {
    const [showModal, setShowModal] = useState(false);

    const addToEvents = (event) => {
        const date = new Date(event.date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let newEventList = {...eventList};
        
        const key = year + "-" + month;
        if (!(key in newEventList.events)) {
            newEventList.events[key] = {};
        }

        if (!(day in newEventList.events[key])) {
            newEventList.events[key][day] = [];
        }
        newEventList.events[key][day].push(event);
        newEventList.events[key][day].sort((a, b) => { return (new Date(a.date)) - (new Date(b.date)) });

        if (!newEventList.order.find((value) => value === key)) {
            newEventList.order.push(key);
            newEventList.order.sort((a, b) => {
                const [yearA, monthA] = a.split("-");
                const [yearB, monthB] = b.split("-");
                return Number(yearA) - Number(yearB) + ((Number(monthA) - Number(monthB)) / 12);
            });
        }

        setEventList(newEventList);
    };
    const deleteEvent = (event) => {
        const date = new Date(event.date);
        const key = date.getFullYear() + "-" + date.getMonth();
        const day = date.getDate();
        let newEventList = {...eventList};
        
        const deleteIndex = newEventList.events[key][day].indexOf(event);
        newEventList.events[key][day].splice(deleteIndex, 1);

        if (newEventList.events[key][day].length === 0) {
            delete newEventList.events[key][day];
        }
        if (Object.keys(newEventList.events[key]).length === 0) {
            delete newEventList.events[key];
            const deleteKeyIndex = newEventList.order.indexOf(key);
            newEventList.order.splice(deleteKeyIndex, 1);
        }
        
        setEventList(newEventList);
    };

    const getTodaysEvents = () => {
        const key = eventList.date.getFullYear() + "-" + eventList.date.getMonth();
        if (key in eventList.events && eventList.date.getDate() in eventList.events[key]) {
            return eventList.events[key][eventList.date.getDate()];
        }
        return [];
    };
    const getPastEvents = () => {
        let res = [];
        const year = eventList.date.getFullYear();
        const month = eventList.date.getMonth();
        const day = eventList.date.getDate();

        eventList.order.forEach((key) => {
            const [keyYear, keyMonth] = key.split("-");
            if ((+keyYear > year) || (+keyYear === year && +keyMonth > month)) { return }

            let daysInMonth = Object.keys(eventList.events[key]).sort((a, b) => a - b);
            if (+keyYear === year && +keyMonth === month) {
                daysInMonth = daysInMonth.filter((keyDay) => +keyDay < day);
            }
            daysInMonth.forEach((day) => {
                res = res.concat(eventList.events[key][day]);
            });
        });
        return res;
    };
    const getUpcomingEvents = () => {
        let res = [];
        const year = eventList.date.getFullYear();
        const month = eventList.date.getMonth();
        const day = eventList.date.getDate();

        eventList.order.forEach((key) => {
            const [keyYear, keyMonth] = key.split("-");
            if ((+keyYear < year) || (+keyYear === year && +keyMonth < month)) { return }

            let daysInMonth = Object.keys(eventList.events[key]).sort((a, b) => a - b);
            if (+keyYear === year && +keyMonth === month) {
                daysInMonth = daysInMonth.filter((keyDay) => +keyDay > day);
            }
            daysInMonth.forEach((day) => {
                res = res.concat(eventList.events[key][day]);
            });
        });
        return res;
    };
    
    return (
        <>
            <div id="events-container" className="flex-grow flexbox-column background prevent-select">
                <div id="events-header" className="flexbox flexbox-center-items">
                    <h1 className="major-title flex-grow">Events</h1>
                    <button className="highlighted-button" onClick={() => {setShowModal(true)}}>+</button>
                </div>
                <div id="events-section-container" className="flex-grow">
                    <EventSection title="Past" eventList={getPastEvents()} deleteEvent={deleteEvent}></EventSection>
                    <EventSection title="Today" eventList={getTodaysEvents()} deleteEvent={deleteEvent}></EventSection>
                    <EventSection title="Upcoming" eventList={getUpcomingEvents()} deleteEvent={deleteEvent}></EventSection>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} addToEvents={addToEvents}></Modal>
        </>
    )
}

export default Events;