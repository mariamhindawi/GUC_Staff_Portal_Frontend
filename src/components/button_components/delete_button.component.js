import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = (props) => {

    return (
        <Button className="delete-button" outline color="danger" onClick={props.onClick}>
            <FontAwesomeIcon icon="trash-alt" color="red" />
        </Button>
    );
}

export default DeleteButton;