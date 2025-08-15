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
                <div id="modal" className="flexbox-column background">
                    <div id="modal-row-header" className="flexbox-center-items">
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
                        <div className="input-background flex-grow">
                            <input
                                type="text"
                                placeholder="Event Name..."
                                value={event.name}
                                onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}
                                id="event-name"
                                className="flex-grow"
                            />
                        </div>
                    </div>
                    <div id="modal-row-date" className="flexbox-center-items">
                        <label htmlFor="event-date">Date:</label>
                        <div className="input-background">
                            <input
                                type="datetime-local"
                                value={event.date}
                                onChange={(inputEvent) => updateEvent("date", inputEvent.target.value)}
                                id="event-date"
                            />
                        </div>
                    </div>
                    <div id="modal-row-notes" className="flexbox-column">
                        <label htmlFor="notes">Notes:</label>
                        <div className="input-background">
                            <textarea
                                rows={4}
                                cols={40}
                                value={event.notes}
                                onChange={(inputEvent) => updateEvent("notes", inputEvent.target.value)}
                                id="notes"
                            />
                        </div>
                    </div>
                    <div id="modal-row-buttons">
                        <button onClick={() => {verifyEvent()}}>Add</button>
                        <button onClick={() => {setShowModal(false); updateEvent();}}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal