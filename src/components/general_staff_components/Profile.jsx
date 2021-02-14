import React, { useEffect, useState } from "react";
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
  const [isLoading, setLoading] = useState(true);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchProfile = async () => {
    await AxiosInstance.get("/staff/view-profile", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          setLoading(false);
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

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-photo-card">
          <div className="profile-photo">
            {user.gender === "Male"
              ? <img src={MaleProfile} alt="profile" width={150} />
              : <img src={FemaleProfile} alt="profile" width={150} />}
          </div>
          <span className="profile-name">{user.name}</span>
          <span className="profile-role">{user.role}</span>
          <Button>
            Edit Profile
            <FontAwesomeIcon className="ml-2" icon="edit" />
          </Button>
        </div>

        <div className="profile-info-card">
          <Tabs className="profile-info-tabs" defaultActiveKey="personal">
            <Tab className="profile-info-tab" eventKey="personal" title="Personal Info">
              <div>
                <span>Email</span>
                <span>{user.email}</span>
              </div>
              <div>
                <span>Office</span>
                <span>{user.office}</span>
              </div>
              {user.role !== "HR" && (
                <div>
                  <span>Department</span>
                  <span>{user.department}</span>
                </div>
              )}
              <div>
                <span>Day Off</span>
                <span>{user.dayOff}</span>
              </div>
            </Tab>
            <Tab className="profile-info-tab" eventKey="account" title="Account Info">
              <div>
                <span>Accidental Leave Balance</span>
                <span>{`${user.accidentalLeaveBalance} day(s)`}</span>
              </div>
              <div>
                <span>Annual Leave Balance</span>
                <span>{`${user.annualLeaveBalance} day(s)`}</span>
              </div>
              <div>
                <span>Salary</span>
                <span>{`${user.salary} EGP`}</span>
              </div>
              <Button variant="info">
                View Last Month&apos;s Salary
                <FontAwesomeIcon className="ml-2" icon="eye" />
              </Button>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
