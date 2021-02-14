import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../others/AxiosInstance";
import AuthTokenManager from "../../others/AuthTokenManager";
import useAxiosCancel from "../../hooks/AxiosCancel";
import Spinner from "../helper_components/Spinner";
import ProfileCard from "./ProfileCard";

function Profile() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchProfile = async () => {
    setLoading(true);
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

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    office: Yup.string()
      .required("This field is required"),
  });
  const handleSubmit = async values => {
    await AxiosInstance({
      method: "put",
      url: "/staff/update-profile",
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
      data: {
        email: values.email,
        office: values.office,
      },
    })
      .then(response => {
        alert(response.data); //eslint-disable-line
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(`Request cancelled: ${error.message}`);
        }
        else if (error.response) {
          alert(error.response.data); //eslint-disable-line
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

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="profile-container">
      <Formik
        initialValues={{ email: user.email, office: user.office }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <ProfileCard user={user} updateProfile={fetchProfile} />
      </Formik>
    </div>
  );
}

export default Profile;
