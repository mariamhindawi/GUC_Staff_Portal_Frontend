import React from "react";
import axios from "../axios";
import DepartmentList from "../components/department_list.component";

class HRdepartments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            faculties: [],
            heads: []
        }
    }

    componentDidMount() {
        axios.get("/fe/get-departments", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    departments: res.data.departments,
                    faculties: res.data.faculties,
                    heads: res.data.heads
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
                <DepartmentList departments={this.state.departments} faculties={this.state.faculties} heads={this.state.heads}></DepartmentList>
            </div>
        )
    }
}

export default HRdepartments;