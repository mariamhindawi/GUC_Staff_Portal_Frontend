import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/AxiosInstance";
import CourseList from "../list_components/course_list.component";
import AssignCiForm from "./assign_ci_form.component";
import DeleteCiForm from "./delete_ci_form.component";

class HodCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            departments: []
        }
    }

    fetchCourses() {
        axiosInstance.get("/fe/get-courses-by-department", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
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
                <Route exact path={`${this.props.match.path}`}> <CourseList courses={this.state.courses} departments={this.state.departments} role="hod" /> </Route>
                <Route exact path={`${this.props.match.path}/assign-ci/:id`}
                    render={routeProps => (
                        <AssignCiForm course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
                <Route exact path={`${this.props.match.path}/delete-ci/:id`}
                    render={routeProps => (
                        <DeleteCiForm course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} />
                {/* <Route exact path={`${this.props.match.path}/delete/:name`}
                    render={routeProps => (
                        <DeleteCourse course={this.getCourse(routeProps.match.params.id)} updateCourses={this.fetchCourses()} />
                    )} /> */}
            </div>
        );
    }
}

export default withRouter(HodCourses);
