import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Spinner from "../helper_components/Spinner";
import MaleProfile from "../../images/profile-male.jpg";
import FemaleProfile from "../../images/profile-female.jpg";

function Profile() {
  const [user, setUser] = useState();
  const [office, setOffice] = useState();
  const [initialIsLoading, setInitialLoading] = useState(true);
  const axiosCancelSource = Axios.CancelToken.source();
  const match = useRouteMatch();

  const fetchProfile = async () => {
    await AxiosInstance.get("/staff/view-profile", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(res => {
        setOffice(res.data.office);
        setUser(res.data.user);
        setInitialLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setInitialLoading(false);
          console.log(error.response);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log(error.message);
        }
      });
  };
  useEffect(fetchProfile, []);
  useAxiosCancel(axiosCancelSource);
  if (initialIsLoading) {
    return <Spinner />;
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-photo-card">
          <div className="profile-photo">
            {user.gender === "Male" ? <img src={MaleProfile} alt="profile" width={150} /> : <img src={FemaleProfile} alt="profile" width={150} /> }
          </div>
          <br />
          <span className="profile-name">
            {user.name}
          </span>
          <span className="profile-role">
            {user.role ? user.role : "HR"}
          </span>
          <Link className="text-info pb-3" to={`${match.url}/edit`}>
            <span>Edit Profile</span>
            <FontAwesomeIcon className="ml-2" icon="edit" />
          </Link>
        </div>
        <div className="profile-info-card">
          <Tabs defaultActiveKey="personal" className="profile-tab">
            <Tab eventKey="personal" title="Personal Info">
              <div className="profile-tab-info">
                <span className="text-info font-weight-bold">Email</span>
                <span className="pb-3">{user.email}</span>
                <span className="text-info font-weight-bold">Office</span>
                <span className="pb-3">{office.name}</span>
                {user.department ? (
                  <>
                    <span className="text-primary font-weight-bold">
                      Department
                      {" "}
                    </span>
                    <span className="pb-3">
                      {user.department}
                    </span>
                  </>
                ) : <></>}
                <span className="text-info font-weight-bold">Gender</span>
                <span className="pb-3">{user.gender}</span>
                <span className="text-info font-weight-bold">Day Off</span>
                <span>{user.dayOff}</span>
              </div>
            </Tab>
            <Tab eventKey="account" title="Account Info">
              <div className="profile-tab-info">
                <span className="text-info font-weight-bold">Accidental Leave Balance (Days)</span>
                <span className="pb-3">{user.accidentalLeaveBalance}</span>
                <span className="text-info font-weight-bold">Annual Leave Balance (Days)</span>
                <span className="pb-3">{user.annualLeaveBalance}</span>
                <span className="text-info font-weight-bold">Basic Salary (EGP)</span>
                <span className="pb-3">{user.salary}</span>
                <Button
                  className="profile-salary-button"
                  variant="info"
                >
                  View Last Month&apos;s Salary
                  <FontAwesomeIcon className="ml-2" icon="eye" />
                </Button>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
