import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import FacultyList from "../components/faculty_list.component";
import FacultyForm from "./faculty_form.component";
import {
    Col, Modal, Spinner
} from "reactstrap";

class HrFaculty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faculties: [],
            deleteModalOpen: false,
            facultyToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchFaculties = this.fetchFaculties.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteFaculty = this.deleteFaculty.bind(this);
    }
    
    async fetchFaculties() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-faculties", {
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
        this.setState({ loading: false });
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

    toggleModal(facultyName) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, facultyToDelete: facultyName, modalMessage: "" });
    }

    async deleteFaculty(facultyName) {
        await axiosInstance.delete(`/hr/delete-faculty/${facultyName}`, {
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
                await this.fetchFaculties();
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
                    <button onClick={() => this.deleteFaculty(this.state.facultyToDelete)}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
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
            <>
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
                                <Link to={`${this.props.match.url}/add`}>
                                    <button>Add Faculty</button>
                                </Link>
                                <FacultyList faculties={this.state.faculties} role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                <Route exact path={`${this.props.match.path}/add`}>
                    <FacultyForm faculty={{name: ""}} updateFaculties={this.fetchFaculties} formType="add" />
                </Route>
                <Route exact path={`${this.props.match.path}/update/:name`}
                    render={routeProps => {
                        return (<FacultyForm faculty={this.getFaculty(routeProps.match.params.name)} updateFaculties={this.fetchFaculties} formType="update" />);
                    }} />
            </>
        )
    }
}

export default withRouter(HrFaculty);