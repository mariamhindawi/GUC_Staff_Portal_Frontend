import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddButton = (props) => {

    return (
        <Button color="success" onClick={props.onClick}>
            {props.buttonText}<FontAwesomeIcon className="ml-2" icon="plus"  />
        </Button>
    );
}

export default AddButton;