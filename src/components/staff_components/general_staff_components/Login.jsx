import React from "react";
import { Redirect } from "react-router-dom";
import AuthTokenManager from "../../../others/AuthTokenManager";
import formImage from "../../../images/guc_building.jpg";
import LoginForm from "../../form_components/LoginForm";

function Login() {
  if (AuthTokenManager.getAuthAccessToken()) {
    return <Redirect to="/staff" />;
  }

  return (
    <div className="login-main-container">
      <div className="container-fluid login-form-container">
        <div className="row">
          <div className="col-10 offset-1 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4">
            <div className="card login-form-card">
              <img className="card-img-top rounded-top-border" src={formImage} alt="" />
              <div className="card-body"><LoginForm /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
