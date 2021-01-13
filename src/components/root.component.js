import React from "react";
import { useHistory } from "react-router-dom";

const Root = () => {
    const history = useHistory();
    sessionStorage.token ? history.push("/home") : history.push("/login");
    return <></>;
}

export default Root;