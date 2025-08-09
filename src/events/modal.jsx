import { useState } from "react";

function Modal({ showModal, setShowModal, addToEvents }) {
    const DEFAULT_EVENT = {
        name: "",
        color: "#ee6115",
        date: "",
        notes: ""
    };

    const [event, setEvent] = useState({...DEFAULT_EVENT});

    const updateEvent = (property = "clear", value) => {
        if (property === "clear") {
            const resetEvent = {...DEFAULT_EVENT};
            setEvent(resetEvent);
            return;
        }

        let updatedEvent = {...event};
        updatedEvent[property] = value;
        setEvent(updatedEvent);
    };
    const verifyEvent = () => {
        const validDate = new Date(event.date);
        if (validDate.toString() === "Invalid Date") {
            return;
        }
        setShowModal(false);
        event.id = crypto.randomUUID();
        addToEvents(event);
    }

    if (showModal) {
        return (
            <div id="modal-background" className="flexbox">
                <div id="modal" className="flexbox-column">
                    <div>
                        <input
                            type="color"
                            value={event.color}
                            onChange={(inputEvent) => updateEvent("color", inputEvent.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Event Name"
                            value={event.name}
                            onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}
                            className="flex-grow"
                        />
                        <button onClick={() => {
                            setShowModal(false);
                            updateEvent();
                            }}>-</button>
                    </div>
                    <div>
                        <label htmlFor="event-date">Date</label>
                        <input
                            type="datetime-local"
                            value={event.date}
                            onChange={(inputEvent) => updateEvent("date", inputEvent.target.value)}
                            id="event-date"
                        />
                    </div>
                    <label htmlFor="notes">Notes:</label>
                    <input
                        type="text"
                        value={event.notes}
                        onChange={(inputEvent) => updateEvent("notes", inputEvent.target.value)}
                        id="notes"
                    />
                    <button onClick={() => {verifyEvent()}}>Save</button>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal