import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
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