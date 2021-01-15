import React from "react";
import axios from "../axios";
import AcademicList from "../components/academic_list.component";

class HRacademics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            academics: [],
            departments: [],
            rooms: [],
            loading:true
        }
    }

    componentDidMount() {
        axios.get("/fe/get-academics", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    academics: res.data.academics,
                    departments: res.data.departments,
                    rooms: res.data.rooms,
                    loading:false
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
                <AcademicList academics={this.state.academics} departments={this.state.departments} rooms={this.state.rooms} loading={this.state.loading}></AcademicList>
            </div>
        )
    }
}

export default HRacademics;