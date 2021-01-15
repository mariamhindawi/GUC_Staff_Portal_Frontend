import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import FacultyList from "../components/faculty_list.component";
import FacultyForm from "./faculty_form.component";
import DeleteFaculty from "./delete_faculty.component";

class HRfaculty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faculties: []
        }
    }
    fetchFaculties() {
        axiosInstance.get("/fe/get-faculties", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    faculties: res.data
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
        this.fetchFaculties();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getFaculty(facultyName) {
        const faculties = this.state.faculties;
        for (let i = 0; i < faculties.length; i++) {
            if (faculties[i].name === facultyName)
                return faculties[i];
        }
        return { name: "" }
    };

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`}> <FacultyList faculties={this.state.faculties} role="hr" /> </Route>
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => (
                        <FacultyForm faculty={this.getFaculty(routeProps.match.params.name)} updateFaculties={this.fetchFaculties()} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:name`}
                    render={routeProps => (
                        <DeleteFaculty faculty={this.getFaculty(routeProps.match.params.name)} updateFaculties={this.fetchFaculties()} />
                    )} />
            </div>
        )
    }
}

export default  withRouter(HRfaculty);