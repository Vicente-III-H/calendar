import { useState } from "react";

function Modal({ showModal, setShowModal }) {
    const DEFAULT_EVENT_COLOUR = "#ee6115";
    const [event, setEvent] = useState({
        name: "",
        color: DEFAULT_EVENT_COLOUR,
        startTime: "",
        endTime: "",
        notes: ""
    });

    const updateEvent = (property = "clear", value) => {
        if (property === "clear") {
            const resetEvent = {
                name: "",
                color: DEFAULT_EVENT_COLOUR,
                startTime: "",
                endTime: "",
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
                    <div>
                        <input
                            type="color"
                            value={event.color}
                            onChange={(inputEvent) => updateEvent("color", inputEvent.target.value)}
                        />
                        <input
                            type="text"
                            value={event.name}
                            onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}
                            className="flex-grow"
                        />
                    </div>
                    <div>
                        <label htmlFor="start-time">Start Time</label>
                        <input
                            type="datetime-local"
                            value={event.startTime}
                            onChange={(inputEvent) => updateEvent("startTime", inputEvent.target.value)}
                            id="start-time"
                        />
                    </div>
                    <div>
                        <input
                            type="datetime-local"
                            value={event.endTime}
                            onChange={(inputEvent) => updateEvent("endTime", inputEvent.target.value)}
                            id="end-time"
                        />
                    </div>
                    <input
                        type="text"
                        value={event.notes}
                        onChange={(inputEvent) => updateEvent("notes", inputEvent.target.value)}
                    />
                    <button onClick={() => {updateEvent()}}>Save</button>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal