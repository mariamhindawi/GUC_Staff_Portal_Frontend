import React from "react";
import axios from "../axios"
import CourseList from "./course_list.component";

class HODCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            department: {},
            loading:true
        };
    }

    async componentDidMount() {
        await axios.get("/fe/get-academic-department", {
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
        .then(res => {
            this.setState({
                department: res.data,
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

        await axios.get("/fe/get-courses-by-department", {
            headers: {
                token: sessionStorage.getItem("token")
            },
            params: {
                department: this.state.department._id
            }
        })
        .then(res => {
            this.setState({
                courses: res.data
                
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
        const departments = new Array(this.state.courses.length);
        departments.fill(this.state.department);
        return (
            <div>
                <CourseList courses={this.state.courses} departments={departments} loading={this.state.loading}></CourseList>
            </div>
        )
    }
}

export default HODCourses;