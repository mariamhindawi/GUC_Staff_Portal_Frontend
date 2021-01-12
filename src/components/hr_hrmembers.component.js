import React from "react";
import axios from "../axios";
import HrList from "./hr_list.component";

class HRhrmembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hrmembers: [],
            rooms: []
        }
    }

    componentDidMount() {
        axios.get("/fe/get-hr-members", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    hrmembers: res.data.hrmembers,
                    rooms: res.data.rooms
                });
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response);
                }
                else if (err.request) {
                    console.log(err.request);
                }
                else {
                    console.log(err.message);
                }
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <HrList hrmembers={this.state.hrmembers} rooms={this.state.rooms}></HrList>
            </div>
        )
    }
}

export default HRhrmembers;