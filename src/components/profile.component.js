import React from 'react'
import Axios from '../axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, List, Col, Spinner
} from 'reactstrap';

class profileComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            office: null
        }
    }

    componentDidMount() {
        Axios.get('/staff/view-profile', {
            headers: {
                'token': sessionStorage.token
            }
        }).then(res => this.setState({ user: res.data.user, office: res.data.office }))
    }

    render() {
        if (!this.state.user) {
            return (
                <div className="container">
                    <div className="row mt-10">
                        <Col md={{ offset: 6 }}>
                            <br />
                            <br />
                            <br />
                            <Spinner color="warning" />
                        </Col>
                    </div>
                </div>
            )
        }
        else {
            const user = this.state.user
            const office = this.state.office
            return (
                <div className="container">
                    <div className="row mt-5">
                        <Col md={{ size: 6, offset: 3 }}>
                            <Card className="bg-warning p-1">
                                <CardBody>
                                    <CardTitle tag="h1">{user.name}</CardTitle>
                                    <CardSubtitle tag="h3">{user.role ? user.role : 'HR'}</CardSubtitle>
                                    <dl className="row p-1">
                                        <dt className="col-6">ID:</dt>
                                        <dd className="col-6">{user.id}</dd>
                                        <dt className="col-6">Email:</dt>
                                        <dd className="col-6">{user.email}</dd>
                                        <dt className="col-6">Day off:</dt>
                                        <dd className="col-6">{user.dayOff}</dd>
                                        <dt className="col-6">Salary:</dt>
                                        <dd className="col-6">{user.salary}</dd>
                                        <dt className="col-6">Office:</dt>
                                        <dd className="col-6">{office.name}</dd>
                                        {user.role ? <>
                                            <dt className="col-6">Annual Leave Balance:</dt>
                                            <dd className="col-6">{user.annualLeaveBalance}</dd>
                                            <dt className="col-6">Annual Leave Balance:</dt>
                                            <dd className="col-6">{user.accidentalLeaveBalance}</dd>
                                        </> : undefined}
                                    </dl>
                                </CardBody>
                            </Card>
                        </Col>
                    </div></div>
            )
        }
    }
}

export default profileComponent