import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "../axios";


const DeleteAcademic = props => {

    async function DeleteAcademicMember(e) {
        await axios({
            method: "delete",
            url: `/hr/delete-academic-member/${props.academicMember.id}`,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(response => {
                this.updateHrMembers();
            })
            .catch(error => {
                if (error.response) {
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
                <Button className="rounded bg-danger" onClick={DeleteAcademicMember}>Yes</Button>
            </Link>
            <div>   </div>
            <Link to="/staff/hr/academic-members">
                <Button className="rounded bg-secondary">No</Button>
            </Link>
        </div>

    );
}

export default DeleteAcademic;