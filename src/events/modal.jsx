import { useState } from "react";

function Modal({ showModal, setShowModal, addToEvents }) {
    const DEFAULT_EVENT = {
        name: "",
        color: "#1786ee",
        date: "",
        notes: ""
    };
    const DEFAULT_INVALID_INPUTS = {
        showMessage: false,
        name: false,
        date: false
    };

    const [event, setEvent] = useState({...DEFAULT_EVENT});
    const [invalidInputs, setInvalidInputs] = useState({...DEFAULT_INVALID_INPUTS});

    const removeInvalid = (input) => {
        switch (input) {
            case "name":
                if (invalidInputs.name) {
                    setInvalidInputs({...invalidInputs, name: false});
                }
                return;
            case "date":
                if (invalidInputs.date) {
                    setInvalidInputs({...invalidInputs, date: false});
                }
                return;
            default:
                return;
        }
    };
    const checkInvalidInputs = () => {
        let invalid = false;
        let newInvalidInputs = {...invalidInputs};

        for (const input in newInvalidInputs) {
            switch (input) {
                case "name":
                    if (event.name.trim() === "") {
                        newInvalidInputs.name = true;
                        invalid = true;
                    } else {
                        newInvalidInputs.name = false;
                    }
                    continue;
                case "date":
                    const validDate = new Date(event.date);
                    if (validDate.toString() === "Invalid Date") {
                        newInvalidInputs.date = true;
                        invalid = true;
                    } else {
                        newInvalidInputs.date = false;
                    }
                    continue;
                default:
                    continue;
            }
        }

        newInvalidInputs.showMessage = invalid;

        setInvalidInputs(newInvalidInputs);
        return invalid;
    };
    const updateEvent = (property = "clear", value) => {
        if (property === "clear") {
            setEvent({...DEFAULT_EVENT, color: event.color});
            return;
        }

        let updatedEvent = {...event};
        updatedEvent[property] = value;
        setEvent(updatedEvent);
    };
    const verifyEvent = () => {
        if (checkInvalidInputs()) { return };

        closeModal(() => {
            let finalEvent = {...event};
            finalEvent.name = finalEvent.name.trim();
            finalEvent.notes = finalEvent.notes.trim();
            finalEvent.id = crypto.randomUUID();
            addToEvents(finalEvent);
        });
    }
    const closeModal = (callback = null) => {
        setShowModal(false);
        if (typeof callback === "function") {
            callback();
        }
        updateEvent();
        setInvalidInputs({...DEFAULT_INVALID_INPUTS});
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
                        <div className={"input-background flex-grow" + (invalidInputs.name ? " invalid-input" : "")}>
                            <input
                                type="text"
                                placeholder="Event Name..."
                                value={event.name}
                                onChange={(inputEvent) => updateEvent("name", inputEvent.target.value)}
                                onClick={() => {removeInvalid("name")}}
                                id="event-name"
                                className="flex-grow"
                            />
                        </div>
                    </div>
                    <div id="modal-row-date" className="flexbox-center-items">
                        <label htmlFor="event-date">Date:</label>
                        <div className={"input-background" + (invalidInputs.date ? " invalid-input" : "")}>
                            <input
                                type="datetime-local"
                                value={event.date}
                                onChange={(inputEvent) => updateEvent("date", inputEvent.target.value)}
                                onClick={() => {removeInvalid("date")}}
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
                    <div id="modal-invalid-message" className="prevent-select">
                        {invalidInputs.showMessage ? "Please fill in fields marked in red" : ""}
                    </div>
                    <div id="modal-row-buttons">
                        <button className="highlighted-button" onClick={() => {verifyEvent()}}>Add</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    } else { return null }
}

export default Modal