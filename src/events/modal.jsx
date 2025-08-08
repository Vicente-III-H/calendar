import { useState } from "react";

function Modal({ showModal, setShowModal }) {
    const DEFAULT_EVENT_COLOUR = "#ee6115";
    const [event, setEvent] = useState({
        name: "",
        color: DEFAULT_EVENT_COLOUR,
        date: "",
        notes: ""
    });

    const updateEvent = (property = "clear", value) => {
        if (property === "clear") {
            const resetEvent = {
                name: "",
                color: DEFAULT_EVENT_COLOUR,
                date: "",
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
                        <button onClick={() => {setShowModal(false); updateEvent()}}>-</button>
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
                    <button onClick={() => {updateEvent()}}>Save</button>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal