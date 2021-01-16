import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import DepartmentList from "../components/department_list.component";
import DepartmentForm from "./department_form.component";
import {
    Button,
    Col, Modal, Spinner
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class HrDepartments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            faculties: [],
            heads: [],
            deleteModalOpen: false,
            departmentToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchDepartments = this.fetchDepartments.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteDepartment = this.deleteDepartment.bind(this);
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
        const faculties = this.state.faculties;
        const heads = this.state.heads;
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].name === departmentName)
                return { department: departments[i], faculty: faculties[i], headOfDepartment: heads[i] };
        }
        return { department: { name: "" }, faculty: "", headOfDepartment: "" }
    };

    toggleModal(departmentName) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, departmentToDelete: departmentName, modalMessage: "" });
    }

    async deleteDepartment(departmentName) {
        await axiosInstance.delete(`/hr/delete-department/${departmentName}`, {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(async response => {
                this.setState({
                    modalMessageStyle: "form-success-message",
                    modalMessage: response.data
                });
                await this.fetchDepartments();
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        modalMessageStyle: "form-error-message",
                        modalMessage: error.response.data
                    });
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    }

    renderModal() {
        if (!this.state.modalMessage) {
            return (
                <>
                    <div>Are you sure?</div>
                    <Button classname="rounded bg-danger" onClick={() => this.deleteDepartment(this.state.departmentToDelete)}>Yes</Button>
                    <Button className="rounded bg-secondary" onClick={this.toggleModal}>No</Button>
                </>
            );
        }
        return (
            <>
                <br />
                <div className={this.state.modalMessageStyle}>{this.state.modalMessage}</div>
                <br />
            </>
        );
    }

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
                        return (
                            <>
                                <div className="row">
                                <Button className="rounded bg-success float-button col-2 offset-8 mb-2">Add Department<FontAwesomeIcon className="ml-2" icon="plus"></FontAwesomeIcon></Button>
                                </div>
                                <DepartmentList departments={this.state.departments} faculties={this.state.faculties}
                                    heads={this.state.heads}role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => {
                        const { department, faculty, headOfDepartment } = this.getDepartment(routeProps.match.params.name);
                        return (<DepartmentForm department={department} faculty={faculty} headOfDepartment={headOfDepartment} updateDepartments={this.fetchDepartments} formType="update" />);
                    }} />
            </div>
        )
    }
}

export default withRouter(HrDepartments);