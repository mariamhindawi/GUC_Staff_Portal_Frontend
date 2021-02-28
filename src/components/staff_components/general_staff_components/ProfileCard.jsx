import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MaleProfile from "../../../images/profile-male.jpg";
import FemaleProfile from "../../../images/profile-female.jpg";
import FormButton from "../../button_components/FormButton";
import CloseButton from "../../button_components/CloseButton";
import Input from "../../form_components/form_input_components/Input";

function ProfileCard(props) {
  const formikProps = useFormikContext();

  const placeholders = {
    email: "Email Address",
    office: "Room Name",
    linkedin: "LinkedIn Account",
    github: "GitHub Account",
    facebook: "Facebook Account",
  };
  const handleSubmit = async () => {
    await formikProps.submitForm();
  };
  const handleCloseEdit = () => {
    formikProps.resetForm();
    props.setEdit(false);
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
            ? <img src={MaleProfile} alt="profile" width={150} height={150} />
            : <img src={FemaleProfile} alt="profile" width={150} height={150} />}
        </div>
        <span className="profile-name">{props.user.name}</span>
        <span className="profile-id">{props.user.id}</span>
        <span className="profile-role">{props.user.role}</span>
        {profileButton()}
      </div>

      <div className="profile-info-card">
        <Tabs className="view-tabs profile-info-tabs" defaultActiveKey="general">
          <Tab className="profile-info-tab" eventKey="general" title="General Info">
            {props.edit && <CloseButton onClick={handleCloseEdit} />}
            <div>
              <span>Email</span>
              {!props.edit
                ? <span>{props.user.email}</span>
                : <Input name="email" type="email" placeholder={placeholders.email} />}
            </div>
            <div>
              <span>Office</span>
              {!props.edit
                ? <span>{props.user.office}</span>
                : <Input name="office" placeholder={placeholders.office} />}
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
          <Tab className="profile-info-tab" eventKey="financial" title="Financial Info">
            {props.edit && <CloseButton onClick={handleCloseEdit} />}
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
          {props.user.role !== "HR" && (
            <Tab className="profile-info-tab" eventKey="accounts" title="Accounts Info">
              {props.edit && <CloseButton onClick={handleCloseEdit} />}
              <div className="linkedin-account">
                <span>
                  <FontAwesomeIcon icon={["fab", "linkedin"]} />
                  LinkedIn
                </span>
                {!props.edit
                  ? <span>{props.user.linkedin}</span>
                  : <Input name="linkedin" placeholder={placeholders.linkedin} />}
              </div>
              <div className="github-account">
                <span>
                  <FontAwesomeIcon icon={["fab", "github"]} />
                  GitHub
                </span>
                {!props.edit
                  ? <span>{props.user.github}</span>
                  : <Input name="github" placeholder={placeholders.github} />}
              </div>
              <div className="facebook-account">
                <span>
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                  Facebook
                </span>
                {!props.edit
                  ? <span>{props.user.facebook}</span>
                  : <Input name="facebook" placeholder={placeholders.facebook} />}
              </div>
            </Tab>
          )}
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
    linkedin: PropTypes.string,
    github: PropTypes.string,
    facebook: PropTypes.string,
  }).isRequired,
  edit: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
