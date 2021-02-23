import React from "react";
import { Alert } from "react-bootstrap";
import { useUserContext } from "../../../contexts/UserContext";
import ResetPasswordForm from "../../form_components/ResetPasswordForm";

const ResetPassword = () => {
  const user = useUserContext();

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-title">Reset Password</div>

        {!user.loggedIn && (
          <Alert className="form-alert" variant="warning">
            It appears to be your first login.
            You must reset your password to continue
          </Alert>
        )}

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
