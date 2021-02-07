import React from "react";
import Axios from "../../others/AxiosInstance";
import { Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Spinner, Button, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import RequestsTableComponent from "./requestsTable.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class requestsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [],
            dropdownOpen: false,
            filter: "",
            loading: true
        }
        this.cancelRequest = this.cancelRequest.bind(this)
    }
    componentDidMount() {
        Axios.get("/academic/all-requests/All", {
            headers: {
                "auth-access-token": authTokenManager.getAuthAccessToken()
            }
        }).then(res => this.setState({ requests: res.data, loading: false })).catch(error => alert(error))
    }

    toggleDropDown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }
    cancelRequest(id) {
        Axios.delete(`/academic/cancel-request/${id}`,
            {
                headers: {
                    "auth-access-token": authTokenManager.getAuthAccessToken()
                }
            }).then(res => alert(res.data)).then(() => {
                Axios.get("/academic/all-requests/All", {
                    headers: {
                        "auth-access-token": authTokenManager.getAuthAccessToken()
                    }
                }).then(res => { console.log(res); this.setState({ requests: res.data, loading: false }) })
            }).catch(error => alert(error))
    }
    render() {
        let requests = this.state.requests.filter(request => this.state.filter ? request.status === this.state.filter : true)
        if (!this.state.loading) {
            return (
                <div className="container">
                        <div className="row">
                        <div className="col-1">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
                            <DropdownToggle caret>
                                {!this.state.filter ? "Filter" : this.state.filter === "Under review" ? "Pending" : this.state.filter}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ filter: "" }); console.log(this.state) }}>All</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ filter: "Accepted" }) }}>Accepted</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ filter: "Rejected" }) }}>Rejected</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ filter: "Under review" }) }}>Pending</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                        <div className="col-3 offset-7">
                        <NavLink to="/staff/home/send-leave-request">
                            <Button className="bg-success">Create a new request <FontAwesomeIcon className="ml-1" icon="plus"></FontAwesomeIcon></Button>
                        </NavLink>
                        </div>
                            </div>
                            <br></br>
                    <div className="row">
                        <div className="col-12">
                            <RequestsTableComponent requests={requests} cancelRequest={this.cancelRequest} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div className="container">
                <div className="row mt-10">
                    <Col md={{ offset: 6 }}>
                        <br />
                        <br />
                        <br />
                        <Spinner color="primary" />
                    </Col>
                </div>
            </div>
        }
    }
}

export default requestsComponent