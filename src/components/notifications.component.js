import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Card, CardFooter, CardText } from "reactstrap"
import Axios from "../others/axios_instance"

const Notifications = ({ notifications }) => {
    const [notis, setNotifications] = useState(notifications?notifications:[])

    useEffect(() => {
        if (notifications === undefined) {
            Axios.get("/fe/academic/notifications", {
                headers: {
                    token: sessionStorage.token
                }
            }).then(res => { console.log(res.data); setNotifications(res.data) })
        }
        Axios("/fe/academic/mark-notifications-seen", {
            method: "PUT",
            headers: {
                token: sessionStorage.token
            },
            data: {
                seenNotifications: notis
            }
        })
    }, [])

    let Cards = notis.map((noti) => {
        return <NavLink key={noti._id} to="/staff/home/requests"><Card className={noti.seen ? "bg-white p-2 m-1" : "bg-warning p-2 m-1"}>
            <CardText>
                {noti.message}
            </CardText>
            <CardFooter>
                {noti.createdAt.replace("T", " ").split(".")[0]}
            </CardFooter>
        </Card></NavLink>
    })
    return <>
        {Cards}
    </>
}

export default Notifications