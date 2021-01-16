import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "../axios";


const DeleteFaculty = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    async function Deletefaculty(e) {
        await axios({
            method: "delete",
            url: `/hr/delete-faculty/${props.faculty.name}`,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                this.updateFaculties();
            })
            .catch(error => {
                if (error.response) {
                    setMessageStyle("form-error-message");
                    setMessage(error.response.data);
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    };


    return (
        <div>
            <div>Are you sure?</div>
            <Link to="/staff/hr/faculties">
                <Button className="rounded bg-danger" onClick={Deletefaculty}>Yes</Button>
            </Link>
            <div>   </div>
            <Link to="/staff/hr/faculties">
                <Button className="rounded bg-secondary" >No</Button>
            </Link>
        </div>

    );
}

export default DeleteFaculty;