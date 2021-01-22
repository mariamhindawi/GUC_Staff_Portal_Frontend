import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Card, CardFooter, CardText } from "reactstrap";
import authTokenManager from "../../others/auth_token_manager";

const Notifications = ({ notifications }) => {
    const [notis, setNotifications] = useState(notifications?notifications:[])

    useEffect(() => {
        if (notifications === undefined) {
            axiosInstance.get("/fe/academic/notifications", {
                headers: {
                    token: authTokenManager.getAuthAccessToken()
                }
            }).then(res => { console.log(res.data); setNotifications(res.data) })
        }
        axiosInstance("/fe/academic/mark-notifications-seen", {
            method: "PUT",
            headers: {
                token: authTokenManager.getAuthAccessToken()
            },
            data: {
                seenNotifications: notis
            }
        })
    }, [])

    let Cards = notis.map((noti) => {
        return <Link key={noti._id} to="/staff/home/requests"><Card className={noti.seen ? "bg-white p-2 m-1" : "bg-warning p-2 m-1"}>
            <CardText>
                {noti.message}
            </CardText>
            <CardFooter>
                {noti.createdAt.replace("T", " ").split(".")[0]}
            </CardFooter>
        </Card></Link>
    })
    return <>
        {Cards}
    </>
}

export default Notifications