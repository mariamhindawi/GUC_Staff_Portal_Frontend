import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import DepartmentList from "../components/department_list.component";
import DepartmentForm from "./department_form.component";
import DeleteDepartment from "./delete_department.component";
import {
    Col, Spinner
} from "reactstrap";

class HrDepartments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            faculties: [],
            heads: [],
            loading: true
        }
        this.fetchDepartments = this.fetchDepartments.bind(this);
    }

    async fetchDepartments() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-departments", {
            cancelToken: this.axiosCancelSource.token,
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
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchDepartments();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getDepartment(departmentName) {
        const departments = this.state.departments;
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].name === departmentName)
                return departments[i];
        }
        return { name: "" }
    };

    getFaculty(departmentName) {
        const departments = this.state.departments;
        const faculties = this.state.faculties;
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].name === departmentName)
                return faculties[i];
        }
        return { faculty: "" }
    };

    getHead(departmentName) {
        const departments = this.state.departments;
        const heads = this.state.heads;
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].name === departmentName)
                return heads[i];
        }
        return { head: "" }
    };

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`}
                    render={() => {
                        if (this.state.loading) {
                            return (
                                <div className="container">
                                    <div className="row mt-10">
                                        <Col xs={{ offset: 6 }}>
                                            <br />
                                            <br />
                                            <br />
                                            <Spinner color="primary" />
                                        </Col>
                                    </div>
                                </div>
                            );
                        }
                        return (<DepartmentList departments={this.state.departments} faculties={this.state.faculties} heads={this.state.heads} role="hr" />);
                    }} />
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => (
                        <DepartmentForm department={this.getDepartment(routeProps.match.params.name)} faculty={this.getFaculty(routeProps.match.params.id)} headOfDepartment={this.getHead(routeProps.match.params.name)} updateDepartments={this.fetchDepartments} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:name`}
                    render={routeProps => (
                        <DeleteDepartment department={this.getDepartment(routeProps.match.params.name)} updateDepartments={this.fetchDepartments} />
                    )} />
            </div>
        )
    }
}

export default withRouter(HrDepartments);