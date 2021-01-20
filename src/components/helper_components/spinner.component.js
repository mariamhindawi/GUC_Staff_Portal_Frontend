import React from "react";
import { Spinner } from "reactstrap";

const CustomSpinner = () => {

    return (
        <>
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="dark" />
            <Spinner type="grow" color="danger" />
        </>
    );
}

export default CustomSpinner;