import { useState } from "react";
import "./events.css"

function Modal({ showModal, setShowModal }) {
    const [event, setEvent] = useState({
        name: "",
        color: "#ee6115",
        startTime: (new Date()).toISOString(),
        endTime: (new Date()).toISOString(),
        notes: ""
    });

    const updateEvent = (property = "clear", value) => {
        if (property === "clear") {
            const resetEvent = {
                name: "",
                color: "#ee6115",
                startTime: (new Date()).toISOString(),
                endTime: (new Date()).toISOString(),
                notes: ""
            };
            setEvent(resetEvent);
            return;
        }

        let updatedEvent = {...event};
        updatedEvent[property] = value;
        setEvent(updatedEvent);
    }

    if (showModal) {
        return (
            <div id="modal-background" className="flexbox">
                <div id="modal" className="flexbox-column">
                    <button onClick={() => {setShowModal(false); updateEvent()}}>-</button>
                    <input type="text" value={event.name} onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}></input>
                    <input type="color" value={event.color} onChange={(inputEvent) => updateEvent("color", inputEvent.target.value)}></input>
                    <input type="datetime-local" value={event.startTime} onChange={(inputEvent) => updateEvent("startTime", inputEvent.target.value)}></input>
                    <input type="datetime-local" value={event.endTime} onChange={(inputEvent) => updateEvent("endTime", inputEvent.target.value)}></input>
                    <input type="text" value={event.notes} onChange={(inputEvent) => updateEvent("notes", inputEvent.target.value)}></input>
                    <button onClick={() => {updateEvent()}}>Save</button>
                </div>
            </div>
        )
    } else { return null }
}

function Events() {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <div id="events-container" className="flex-grow flexbox-column">
                <div id="events-header" className="flexbox">
                    <div className="flex-grow">Events</div>
                    <button onClick={() => {setShowModal(true)}}>+</button>
                </div>
                <div className="flex-grow">
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}></Modal>
        </>
    )
}

export default Events;