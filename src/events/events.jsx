import { useState } from "react";
import Modal from "./modal";
import "./events.css"

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