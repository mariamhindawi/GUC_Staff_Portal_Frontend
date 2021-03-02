import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import AxiosInstance from "../../../others/AxiosInstance";
import AuthTokenManager from "../../../others/AuthTokenManager";
import useAxiosCancel from "../../../hooks/AxiosCancel";
import { useSetUserContext, useUserContext } from "../../../contexts/UserContext";
import Spinner from "../../helper_components/Spinner";
import AlertModal from "../../helper_components/AlertModal";
import ProfileCard from "./ProfileCard";

function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState();
  const [alertModalIsOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState({ messageText: "", messageStyle: "" });
  const userContext = useUserContext();
  const setUserContext = useSetUserContext();
  const axiosCancelSource = Axios.CancelToken.source();
  useAxiosCancel(axiosCancelSource);

  const fetchProfile = async updateProfile => {
    setLoading(true);
    await AxiosInstance.get("/staff/view-profile", {
      cancelToken: axiosCancelSource.token,
      headers: {
        "auth-access-token": AuthTokenManager.getAuthAccessToken(),
      },
    })
      .then(response => {
        setUser(response.data);
        if (updateProfile) {
          setUserContext({ ...userContext, email: response.data.email });
        }
        setLoading(false);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
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

  const initialValues = isLoading ? { email: "", office: "", linkedin: "", github: "", facebook: "" }
    : {
      email: user.email,
      office: user.office,
      linkedin: user.role === "HR" || user.linkedin === "Not Specified" ? "" : user.linkedin,
      github: user.role === "HR" || user.github === "Not Specified" ? "" : user.github,
      facebook: user.role === "HR" || user.facebook === "Not Specified" ? "" : user.facebook,
    };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    office: Yup.string()
      .required("This field is required"),
    linkedin: Yup.string()
      .matches(process.env.REACT_APP_URL_FORMAT, "Invalid url"),
    github: Yup.string()
      .matches(process.env.REACT_APP_URL_FORMAT, "Invalid url"),
    facebook: Yup.string()
      .matches(process.env.REACT_APP_URL_FORMAT, "Invalid url"),
  });
  const handleSubmit = async (values, formikProps) => {
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
        linkedin: values.linkedin,
        github: values.github,
        facebook: values.facebook,
      },
    })
      .then(response => {
        setEdit(false);
        setAlertModalMessage({ messageText: response.data, messageStyle: "success" });
        setAlertModalOpen(true);
        fetchProfile(true);
      })
      .catch(error => {
        if (Axios.isCancel(error)) {
          console.log(error.message);
        }
        else if (error.response) {
          setEdit(false);
          formikProps.resetForm();
          setAlertModalMessage({ messageText: error.response.data, messageStyle: "danger" });
          setAlertModalOpen(true);
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

  const toggleAlertModal = () => { setAlertModalOpen(prevState => !prevState); };
  const resetAlertModal = () => { setAlertModalMessage({ messageText: "", messageStyle: "" }); };

  return (
    <div className="profile-container">
      {isLoading
        ? <Spinner />
        : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <ProfileCard user={user} edit={edit} setEdit={setEdit} profileUpdated={alertModalMessage.messageStyle === "success"} />
          </Formik>
        )}

      <AlertModal
        isOpen={alertModalIsOpen}
        variant={alertModalMessage.messageStyle}
        toggle={toggleAlertModal}
        reset={resetAlertModal}
      >
        {alertModalMessage.messageText}
      </AlertModal>
    </div>
  );
}

export default Profile;
