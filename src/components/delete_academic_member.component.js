import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "../axios";


const DeleteAcademic = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    async function DeleteAcademicMember(e) {
        await axios({
            method: "delete",
            url: `/hr/delete-academic-member/${props.academicMember.id}`,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                this.updateHrMembers();
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
            <Link to="/staff/hr/academic-members">
                <button className="rounded" onClick={DeleteAcademicMember}>Yes</button>
            </Link>
            <div>   </div>
            <Link to="/staff/hr/academic-members">
                <button className="rounded">No</button>
            </Link>
        </div>

    );
}

export default DeleteAcademic;