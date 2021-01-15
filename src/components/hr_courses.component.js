import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import CourseList from "./course_list.component";
import DeleteCourse from "./delete_course.component";
import CourseForm from "./course_form.component";

class HrCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            departments: []
        }
    }

    fetchCourses() {
        axiosInstance.get("/fe/get-courses", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    courses: res.data.courses,
                    departments: res.data.departments
                });
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
                console.log(error);
            });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchCourses();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getCourse(courseID) {
        const courses = this.state.courses;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseID)
                return courses[i];
        }
        return { id: "", name: "", department: "" }
    };

    getDepartment(courseID) {
        const courses = this.state.courses;
        const departments = this.state.departments;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseID)
                return departments[i];
        }
        return { department : "" }
    };

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`}> <CourseList courses={this.state.courses} departments={this.state.departments} role="hr" /> </Route>
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => (
                        <CourseForm course={this.getCourse(routeProps.match.params.id)} department={this.getDepartment(routeProps.match.params.id)} updateCourses={this.fetchCourses()} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:id`}
                    render={routeProps => (
                        <DeleteCourse course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
            </div>
        );
    }
}

export default withRouter(HrCourses);
