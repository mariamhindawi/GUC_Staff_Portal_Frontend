import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const Root = () => {

    const history = useHistory();

    const componentDidMount = () => {
        if (!sessionStorage.token) {
            history.push("/login");
            return;
        }

        const token = jwt.decode(sessionStorage.token);
        switch (token.role) {
            case "HR": history.push("/staff/hr"); break;
            case "Head of Department": history.push("/staff/hod"); break;
            case "Course Instructor": history.push("/staff/ci"); break;
            case "Course Coordinator": history.push("/staff/cc"); break;
            case "Teaching Assistant": history.push("/staff/ta"); break;
        }
    }
    useEffect(componentDidMount, []);

    return <></>;
}

export default Root;