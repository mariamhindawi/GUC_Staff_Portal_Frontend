import React from 'react'
import Axios from '../axios'
import {
    Col, Spinner,
    Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Profile extends React.Component {
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
                token: sessionStorage.getItem("token")
            }
        }).then(res => this.setState({ user: res.data.user, office: res.data.office }))
    }
    
    render() {
        if (!this.state.user) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><NavLink to="/staff/home">Home</NavLink></BreadcrumbItem>
                            <BreadcrumbItem active>Profile</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row mt-10">
                        <Col xs={{ offset: 6 }}>
                            <br />
                            <br />
                            <br />
                            <Spinner color="primary" />
                        </Col>
                    </div>
                </div>
            )
        }
        else {
            const user = this.state.user
            const office = this.state.office
            
                return (
                 <div className="profile-container rounded-border">
                      <Form className="p-3"> 
                    <FormGroup row>
                      <Label className="font-weight-bold" for="ID" sm={4}>ID</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value={user.id} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Name" sm={4}>Name</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value={user.name} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Role" sm={4}>Role</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.role ? user.role : 'HR'} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Email" sm={4}>Email</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value={user.email} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Office" sm={4}>Office</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value={office.name} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Gender" sm={4}>Gender</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.gender} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="DayOff" sm={4}>Day Off</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.dayOff} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Salary" sm={4}>Salary</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.salary} />
                      </Col>
                    </FormGroup>
                    {user.role ? <>
                        <FormGroup row>
                      <Label className="font-weight-bold" for="Faculty" sm={4}>Faculty</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.faculty} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="Department" sm={4}>Department</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.department} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="AnnualLeaveBalance" sm={4}>Annual Leave Balance</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.annualLeaveBalance} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="font-weight-bold" for="AccidentalLeaveBalance" sm={4}>Accidental Leave Balance</Label>
                      <Col sm={8}>
                      <Input className="profile-input" plaintext readOnly={true} value= {user.accidentalLeaveBalance} />
                      </Col>
                    </FormGroup>
                     </> : undefined}
                    <div className="profile-edit-button mb-2">
                        <Button className="profile-button">Edit Profile</Button>
                    </div>
                    <div clss="form-error-message" id="profile-error-message">

                    </div>
                  </Form>
                 </div>
                );
        }
    }
}

export default Profile