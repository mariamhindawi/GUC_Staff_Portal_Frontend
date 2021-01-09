import React from "react";
import Axios from "../axios";

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        Axios.get("/staff/view-profile", {
            headers: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhyLTEiLCJyb2xlIjoiSFIiLCJpYXQiOjE2MDg0OTI2ODJ9.ukWEEgq7QiFrB-FoNdy3jxoBddUvPxpOMjGzK6rScPo"
            }
        }).then(res => this.setState({ user: res.data }))
    }

    render() {
        if (!this.state.user) {
            return <div></div>
        }
        else {
            console.log(this.state.user)
            return (
                <>
                    <p>
                        {this.state.user.user.name}
                    </p>
                    <p>
                        {this.state.user.office.name}
                    </p>
                </>
            );
        }
    }
}

export default HomePage;