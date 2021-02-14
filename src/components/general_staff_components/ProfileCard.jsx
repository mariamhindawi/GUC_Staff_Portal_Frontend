import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MaleProfile from "../../images/profile-male.jpg";
import FemaleProfile from "../../images/profile-female.jpg";
import FormButton from "../button_components/FormButton";
import CloseButton from "../button_components/CloseButton";

function ProfileCard(props) {
  const formikProps = useFormikContext();

  const placeholders = {
    email: "Email Address",
    office: "Room Name",
  };

  const handleSubmit = async () => {
    await formikProps.submitForm();
  };
  const handleClose = () => {
    formikProps.resetForm();
    props.setEdit(false);
  };
  const handleFocus = e => {
    e.target.placeholder = "";
  };
  const handleBlur = e => {
    e.target.placeholder = placeholders[e.target.name];
    formikProps.setFieldTouched(e.target.name);
  };

  const profileButton = () => {
    if (!props.edit) {
      return (
        <Button onClick={() => { props.setEdit(true); }}>
          Edit Profile
          <FontAwesomeIcon className="ml-2" icon="edit" />
        </Button>
      );
    }
    return (
      <FormButton
        isSubmiting={formikProps.isSubmitting}
        onClick={handleSubmit}
      >
        {formikProps.isSubmitting ? "Saving changes" : "Save changes"}
      </FormButton>
    );
  };

  return (
    <div className="profile-card">
      <div className="profile-photo-card">
        <div className="profile-photo">
          {props.user.gender === "Male"
            ? <img src={MaleProfile} alt="profile" width={150} />
            : <img src={FemaleProfile} alt="profile" width={150} />}
        </div>
        <span className="profile-name">{props.user.name}</span>
        <span className="profile-role">{props.user.role}</span>
        {profileButton()}
      </div>

      <div className="profile-info-card">
        <Tabs className="profile-info-tabs" defaultActiveKey="personal">
          <Tab className="profile-info-tab" eventKey="personal" title="Personal Info">
            {props.edit && <CloseButton onClick={handleClose} />}
            <div>
              <span>Email</span>
              {!props.edit
                ? <span>{props.user.email}</span>
                : (
                  <>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder={placeholders.email}
                      onFocus={e => handleFocus(e)}
                      onBlur={e => handleBlur(e)}
                    />
                    <span className="error-message"><ErrorMessage name="email" /></span>
                  </>
                )}
            </div>
            <div>
              <span>Office</span>
              {!props.edit
                ? <span>{props.user.office}</span>
                : (
                  <>
                    <Field
                      type="text"
                      id="office"
                      name="office"
                      placeholder={placeholders.office}
                      onFocus={e => handleFocus(e)}
                      onBlur={e => handleBlur(e)}
                    />
                    <span className="error-message"><ErrorMessage name="office" /></span>
                  </>
                )}
            </div>
            {props.user.role !== "HR" && (
              <div>
                <span>Department</span>
                <span>{props.user.department}</span>
              </div>
            )}
            <div>
              <span>Day Off</span>
              <span>{props.user.dayOff}</span>
            </div>
          </Tab>
          <Tab className="profile-info-tab" eventKey="account" title="Account Info">
            <div>
              <span>Accidental Leave Balance</span>
              <span>{`${props.user.accidentalLeaveBalance} day(s)`}</span>
            </div>
            <div>
              <span>Annual Leave Balance</span>
              <span>{`${props.user.annualLeaveBalance} day(s)`}</span>
            </div>
            <div>
              <span>Salary</span>
              <span>{`${props.user.salary} EGP`}</span>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    salary: PropTypes.number,
    role: PropTypes.string,
    department: PropTypes.string,
    dayOff: PropTypes.string,
    office: PropTypes.string,
    annualLeaveBalance: PropTypes.number,
    accidentalLeaveBalance: PropTypes.number,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
