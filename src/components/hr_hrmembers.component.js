import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import HrList from "./hr_list.component";
import HrMemberForm from "./hr_member_form.component";
import {
    Col, Modal, Spinner
} from "reactstrap";

class HrHrMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hrmembers: [],
            rooms: [],
            deleteModalOpen: false,
            hrMemberToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchHrMembers = this.fetchHrMembers.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteHrMember = this.deleteHrMember.bind(this);
    }

    async fetchHrMembers() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-hr-members", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    hrmembers: res.data.hrmembers,
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
        this.fetchHrMembers();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getHrMember(hrMemberID) {
        const hrMembers = this.state.hrmembers;
        const rooms = this.state.rooms;
        for (let i = 0; i < hrMembers.length; i++) {
            if (hrMembers[i].id === hrMemberID)
                return { hrMember: hrMembers[i], office: rooms[i] };
        }
        return { hrMember: { id: "", name: "", salary: "", gender: "", role: "", email: "" }, office: "" };
    };

    toggleModal(id) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, hrMemberToDelete: id, modalMessage: "" });
    }

    async deleteHrMember(id) {
        await axiosInstance.delete(`/hr/delete-hr-member/${id}`, {
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
                await this.fetchHrMembers();
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
                    <button onClick={() => this.deleteHrMember(this.state.hrMemberToDelete)}>Yes</button>
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
                                <button>Add HR Member</button>
                                <HrList hrmembers={this.state.hrmembers} rooms={this.state.rooms} role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => {
                        const { hrMember, office } = this.getHrMember(routeProps.match.params.id);
                        return (<HrMemberForm hrMember={hrMember} office={office} updateHrMembers={this.fetchHrMembers} formType="update" />);
                    }} />
            </div>
        )
    }
}

export default withRouter(HrHrMembers);