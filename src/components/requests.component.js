import React from 'react'
import Axios from '../axios'
import { Col, Table, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Spinner, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class requestsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [],
            dropdownOpen: false,
            filter: "",
            loading: true
        }
    }
    componentDidMount() {
        Axios.get('/academic/all-requests/All', {
            headers: {
                'token': sessionStorage.token
            }
        }).then(res => this.setState({ requests: res.data, loading: false }))
    }

    toggleDropDown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }
    cancelRequest(id) {
        Axios.delete(`/academic/cancel-request/${id}`,
            {
                headers: {
                    'token': sessionStorage.token
                }
            }).then(res => alert(res.data)).then(() => {
                Axios.get('/academic/all-requests/All', {
                    headers: {
                        'token': sessionStorage.token
                    }
                }).then(res => this.setState({ requests: res.data, loading: false }))
            })
    }
    render() {
        let requests = this.state.requests
        if (requests.length !== 0) {
            requests = requests.filter(request => this.state.filter ? request.status === this.state.filter : true).map(request => {
                return (
                    <tr key={request.id}>
                        <th>{request.id}</th>
                        <td>{request.type}</td>
                        <td>{request.status}</td>
                        <td>{request.type === 'slotLinkingRequest' ? request.ccComent : request.HODComment}</td>
                        <td>{request.day.split("T")[0]}</td>
                        {request.type !== 'slotLinkingRequest' && request.type !== 'dayOffChangeRequest' &&
                            new Date(request.day) > new Date() ||
                            request.status === 'Under review' ?
                            <td><Button onClick={() => this.cancelRequest(request.id)}>Cancel</Button></td> : <td></td>}
                    </tr>
                )
            })
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
                            <BreadcrumbItem active>Requests</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
                            <DropdownToggle caret>
                                Filter
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
                        <Button className="bg-warning">Create a new request</Button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Message</th>
                                        <th>Day</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
        }
        else if (!this.state.loading) {
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
                        <BreadcrumbItem active>Requests</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                    <th>Day</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </Table>
                    </div>
                </div>
            </div>

        }
        else {
            return <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
                        <BreadcrumbItem active>Requests</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mt-10">
                    <Col md={{ offset: 6 }}>
                        <br />
                        <br />
                        <br />
                        <Spinner color="warning" />
                    </Col>
                </div>
            </div>
        }
    }
}

export default requestsComponent