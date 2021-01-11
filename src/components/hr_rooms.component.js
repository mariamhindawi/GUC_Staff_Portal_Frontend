import React from 'react';
import axios from '../axios';
import RoomList from '../components/room_list.component';

class HRrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
    }

    async componentDidMount() {
        console.log("Mount")
        await axios.get("/fe/get-rooms",{
            headers: {
                token : sessionStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                rooms: res.data
            });
        })
        .catch(err => {
            if (err.response) {
                alert(err.response.data);
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
                <RoomList rooms={this.state.rooms}></RoomList>
            </div>
        )
    }
}

export default HRrooms;