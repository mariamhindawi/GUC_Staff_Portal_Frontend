import React from "react";

class Slot extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h6>Day:</h6>
            <p>{props.data.day}</p>
            <h6>Slot:</h6>
            <p>{props.data.slotNumber}</p>
            <h6>Room:</h6>
            <p>{props.data.room}</p>
            <h6>Course:</h6>
            <p>{props.data.course}</p>
            <h6>Staff Member:</h6>
            <p>{props.data.staffMember}</p>
            <h6>Type:</h6>
            <p>{props.data.type}</p>
            </div>
        );
    }
}

export default Slot;