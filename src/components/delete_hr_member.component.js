import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "../axios";


const DeleteHrMember = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");

    async function DeleteHrMember(e) {
        await axios({
            method: "delete",
            url: `/hr/delete-hr-member/${props.hrMember.id}`,
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
            <Link to="/staff/hr/hr-members">
                <button className="rounded" onClick={DeleteHrMember}>Yes</button>
            </Link>
            <div>   </div>
            <Link to="/staff/hr/hr-members">
                <button className="rounded" >No</button>
            </Link>
        </div>

    );
}

export default DeleteHrMember;