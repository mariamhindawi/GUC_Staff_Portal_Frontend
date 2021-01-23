import React from "react";
import { Spinner } from "reactstrap";

const CustomSpinner = () => {

    return (
        <div className="spinner">
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="dark" />
            <Spinner type="grow" color="danger" />
        </div>
    );
}

export default CustomSpinner;