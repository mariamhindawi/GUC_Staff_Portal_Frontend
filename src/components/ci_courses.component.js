import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import CourseList from "./list_components/course_list.component";
import AssignCcForm from "./assign_cc_form.component";
import AssignTaForm from "./assign_ta_form.component";
import DeleteTaForm from "./delete_ta_from_course.component";

class CiCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            departments: []
        }
    }

    fetchCourses() {
        axiosInstance.get("/fe/get-my-courses", {
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
        return { department: "" }
    };

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`}> <CourseList courses={this.state.courses} departments={this.state.departments} role="ci" /> </Route>
                <Route exact path={`${this.props.match.path}/assign-cc/:id`}
                    render={routeProps => (
                        <AssignCcForm course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
                <Route exact path={`${this.props.match.path}/assign-ta/:id`}
                    render={routeProps => (
                        <AssignTaForm course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
                <Route exact path={`${this.props.match.path}/delete-ta/:id`}
                    render={routeProps => (
                        <DeleteTaForm course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
                {/* <Route exact path={`${this.props.match.path}/delete/:name`}
                    render={routeProps => (
                        <DeleteCourse course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} /> */}
            </div>
        );
    }
}

export default withRouter(CiCourses);
