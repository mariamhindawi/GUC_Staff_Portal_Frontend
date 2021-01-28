import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Button, Modal } from "reactstrap";
import errorMessages from "../../others/error_messages";
import AcademicList from "../list_components/academic_list.component";
import AcademicForm from "../form_components/academic_member_form.component";
import AddButton from "../button_components/add_button.component";
import Spinner from "../helper_components/spinner.component";
import authTokenManager from "../../others/auth_token_manager";

class HrAcademics extends Component {
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
		};
		this.fetchAcademics = this.fetchAcademics.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.deleteAcademic = this.deleteAcademic.bind(this);
	}

	async fetchAcademics() {
		this.setState({ loading: true });
		await axiosInstance.get("/staff/fe/get-academics", {
			cancelToken: this.axiosCancelSource.token,
			headers: {
				"auth-access-token": authTokenManager.getAuthAccessToken()
			}
		})
			.then(res => {
				this.setState({
					academics: res.data.academics,
					departments: res.data.departments,
					rooms: res.data.rooms,
					loading: false
				});
			})
			.catch(error => {
				if (axios.isCancel(error)) {
					console.log(`Request cancelled: ${error.message}`);
				}
				else {
					if (error.response) {
						console.log(error.response);
					}
					else if (error.request) {
						console.log(error.request);
					}
					else {
						console.log(error.message);
					}
					this.setState({ loading: false });
				}
			});
	}

	componentDidMount() {
		this.axiosCancelSource = axios.CancelToken.source();
		this.fetchAcademics();
	}

	componentWillUnmount() {
		this.axiosCancelSource.cancel(errorMessages.requestCancellation);
	}

	getAcademic(academicID) {
		const academics = this.state.academics;
		const departments = this.state.departments;
		const rooms = this.state.rooms;
		for (let i = 0; i < academics.length; i++) {
			if (academics[i].id === academicID)
				return { academicMember: academics[i], department: departments[i], office: rooms[i] };
		}
		return {
			academicMember: { id: "", name: "", salary: "", dayOff: "", gender: "", role: "", email: "" },
			department: "",
			office: ""
		};
	};

	async deleteAcademic(id) {
		await axiosInstance.delete(`/staff/hr/delete-academic-member/${id}`, {
			cancelToken: this.axiosCancelSource.token,
			headers: {
				"auth-access-token": getAuthAccessToken()
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

	toggleModal(id) {
		this.setState({ deleteModalOpen: !this.state.deleteModalOpen, academicToDelete: id, modalMessage: "" });
	}

	renderModal() {
		if (!this.state.modalMessage) {
			return (
				<>
					<div>Are you sure?</div>
					<Button className="rounded bg-danger" onClick={() => this.deleteAcademic(this.state.academicToDelete)}>Yes</Button>
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
			<>
				<Route exact path={`${this.props.match.path}`}
					render={() => {
						if (this.state.loading) {
							return <Spinner />;
						}

						return (
							<div className="">
								<Link to={`${this.props.match.url}/add`}>
									<AddButton buttonText="Add Academic Member" />
								</Link>
								<AcademicList academics={this.state.academics} departments={this.state.departments} rooms={this.state.rooms} role="hr" toggleModal={this.toggleModal} />
								<Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
									{this.renderModal()}
								</Modal>
							</div>
						);
					}} />
				<Route exact path={`${this.props.match.path}/add`}>
					<AcademicForm academicMember={{ name: "", email: "", gender: "", salary: "", role: "", dayOff: "" }} department={""}
						office={""} updateAcademics={this.fetchAcademics} formType="add" />
				</Route>
				<Route exact path={`${this.props.match.path}/update/:id`}
					render={routeProps => {
						const { academicMember, department, office } = this.getAcademic(routeProps.match.params.id);
						return <AcademicForm academicMember={academicMember} department={department} office={office} updateAcademics={this.fetchAcademics} formType="update" />;
					}} />
			</>
		);
	}
}

export default withRouter(HrAcademics);