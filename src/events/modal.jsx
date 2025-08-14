import { useState } from "react";

function Modal({ showModal, setShowModal, addToEvents }) {
    const DEFAULT_EVENT = {
        name: "",
        color: "#1786ee",
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

        if (event.name.trim() === "") {
            return;
        }

        setShowModal(false);
        let finalEvent = {...event};
        finalEvent.name = finalEvent.name.trim();
        finalEvent.notes = finalEvent.notes.trim();
        finalEvent.id = crypto.randomUUID();
        addToEvents(finalEvent);
        updateEvent();
    }

    if (showModal) {
        return (
            <div id="modal-background" className="flexbox flexbox-center-items">
                <div id="modal" className="flexbox-column">
                    <div>
                        <label htmlFor="event-colour">
                            <div id="event-colour-container">
                                <div id="event-colour-cover" style={{backgroundColor: event.color}}></div>
                                <input
                                    type="color"
                                    value={event.color}
                                    onChange={(inputEvent) => updateEvent("color", inputEvent.target.value)}
                                    id="event-colour"
                                />
                            </div>
                        </label>
                        <input
                            type="text"
                            placeholder="Event Name"
                            value={event.name}
                            onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}
                            className="flex-grow"
                        />
                    </div>
                    <div>
                        <label htmlFor="event-date">Date:</label>
                        <input
                            type="datetime-local"
                            value={event.date}
                            onChange={(inputEvent) => updateEvent("date", inputEvent.target.value)}
                            id="event-date"
                        />
                    </div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        rows={2}
                        cols={20}
                        value={event.notes}
                        onChange={(inputEvent) => updateEvent("notes", inputEvent.target.value)}
                        id="notes"
                    />
                   <div>
                        <button onClick={() => {verifyEvent()}}>Save</button>
                        <button onClick={() => {setShowModal(false); updateEvent();}}>Cancel</button>
                   </div>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal