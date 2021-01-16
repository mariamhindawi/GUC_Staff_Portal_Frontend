import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import AcademicList from "../components/academic_list.component";
import AcademicForm from "./academic_member_form.component";
import {
    Col, Modal, Spinner
} from "reactstrap";

class HrAcademics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            academics: [],
            departments: [],
            rooms: [],
            deleteModalOpen: false,
            academicToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchAcademics = this.fetchAcademics.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteAcademic = this.deleteAcademic.bind(this);
    }

    async fetchAcademics() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-academics", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    academics: res.data.academics,
                    departments: res.data.departments,
                    rooms: res.data.rooms
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
        this.fetchAcademics();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getAcademic(academicID) {
        const academics = this.state.academics;
        const departments = this.state.departments;
        const rooms = this.state.rooms;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return { academicMember: academics[i], department: departments[i], office: rooms[i]};
        }
        return {
            academicMember: { id: "", name: "", salary: "", dayOff: "", gender: "", role: "", email: "" },
            department: "",
            office: ""
        }
    };

    toggleModal(id) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, academicToDelete: id, modalMessage: "" });
    }

    async deleteAcademic(id) {
        console.log(`/hr/delete-academic-member/${id}`)
        await axiosInstance.delete(`/hr/delete-academic-member/${id}`, {
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
                await this.fetchAcademics();
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
                    <button onClick={() => this.deleteAcademic(this.state.academicToDelete)}>Yes</button>
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
                                <Link to={`${this.props.match.url}/add`}>
                                    <button>Add Academic Member</button>
                                </Link>
                                <AcademicList academics={this.state.academics} departments={this.state.departments} rooms={this.state.rooms} role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                <Route exact path={`${this.props.match.path}/add`}>
                    <AcademicForm academicMember={{name: "", email: "", gender:"", salary: "", role: "", dayOff: ""}} department={""}
                        office={""} updateAcademics={this.fetchAcademics} formType="add" />
                </Route>
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => {
                        const { academicMember, department, office } = this.getAcademic(routeProps.match.params.id);
                        return (<AcademicForm academicMember={academicMember} department={department} office={office} updateAcademics={this.fetchAcademics} formType="update" />);
                    }} />
            </div>
        );
    }
}

export default withRouter(HrAcademics);