import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateButton = (props) => {

    return (
        <Button className="edit-button" outline color="primary" onClick={props.onClick}>
            <FontAwesomeIcon icon="edit" color="#3099f5" />
        </Button>
    );
}

export default UpdateButton;