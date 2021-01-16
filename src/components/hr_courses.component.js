import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import CourseList from "./course_list.component";
import CourseForm from "./course_form.component";
import {
    Button,
    Col, Modal, Spinner
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class HrCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            departments: [],
            deleteModalOpen: false,
            courseToDelete: "",
            modalMessageStyle: "",
            modalMessage: "",
            loading: true
        }
        this.fetchCourses = this.fetchCourses.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    async fetchCourses() {
        this.setState({ loading: true });
        await axiosInstance.get("/fe/get-courses", {
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
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchCourses();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getCourse(courseId) {
        const courses = this.state.courses;
        const departments = this.state.departments;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === courseId)
                return {course: courses[i], department: departments[i]};
        }
        return {course: { id: "", name: "", department: "" }, department: ""};
    };

    toggleModal(courseId) {
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen, courseToDelete: courseId, modalMessage: "" });
    }

    async deleteCourse(courseId) {
        await axiosInstance.delete(`/hr/delete-course/${courseId}`, {
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
                await this.fetchCourses();
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
                    <Button className="rounded bg-danger" onClick={() => this.deleteCourse(this.state.courseToDelete)}>Yes</Button>
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
                                    <div className="row">
                                        <Button className="rounded bg-success float-button col-2 offset-8 mb-2">Add Course<FontAwesomeIcon className="ml-2" icon="plus"></FontAwesomeIcon></Button>
                                    </div>
                                </Link>
                                <CourseList courses={this.state.courses} departments={this.state.departments} role="hr" toggleModal={this.toggleModal} />
                                <Modal isOpen={this.state.deleteModalOpen} toggle={this.toggleModal}>
                                    {this.renderModal()}
                                </Modal>
                            </>
                        );
                    }} />
                    <Route exact path={`${this.props.match.path}/add`}>
                        <CourseForm course={{id: "", name: ""}} department="" 
                            updateCourses={this.fetchCourses} formType="add" />
                    </Route>
                <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => {
                        const { course, department } = this.getCourse(routeProps.match.params.id);
                        return (<CourseForm course={course} department={department} updateCourses={this.fetchCourses} formType="update" />);
                    }} />
            </>
        );
    }
}

export default withRouter(HrCourses);
