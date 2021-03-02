import React from "react";
import Axios from "axios";
import {
  Col, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button, Breadcrumb, BreadcrumbItem
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosInstance from "../../../../others/AxiosInstance";
import AuthTokenManager from "../../../../others/AuthTokenManager";
import RequestsTableComponent from "./requestsTable.component";
import Spinner from "../../../helper_components/Spinner";

class requestsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      dropdownOpen: false,
      filter: "",
      loading: true,
    };
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  componentDidMount() {
    AxiosInstance.get("staff/academic/all-requests/All", {
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    }).then(res => this.setState({ requests: res.data, loading: false })).catch(error => alert(error));
  }

  toggleDropDown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  cancelRequest(id) {
    AxiosInstance.delete(`/staff/academic/cancel-request/${id}`,
      {
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken(),
        },
      }).then(res => alert(res.data)).then(() => {
      AxiosInstance.get("staff/academic/all-requests/All", {
        headers: {
          "auth-access-token": AuthTokenManager.getAuthAccessToken(),
        },
      }).then(res => { console.log(res); this.setState({ requests: res.data, loading: false }); });
    }).catch(error => alert(error));
  }

  render() {
    const requests = this.state.requests.filter(request => (this.state.filter ? request.status === this.state.filter : true));
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
                  <DropdownItem onClick={() => { this.setState({ filter: "" }); console.log(this.state); }}>All</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => { this.setState({ filter: "Accepted" }); }}>Accepted</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => { this.setState({ filter: "Rejected" }); }}>Rejected</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => { this.setState({ filter: "Under review" }); }}>Pending</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              <RequestsTableComponent requests={requests} cancelRequest={this.cancelRequest} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row mt-10">
          <Col md={{ offset: 6 }}>
            <br />
            <br />
            <br />
            <Spinner />
          </Col>
        </div>
      </div>
    );
  }
}

export default requestsComponent;
