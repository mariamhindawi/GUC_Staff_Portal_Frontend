import React from "react";
import { Link } from "react-router-dom";

const ForbiddenAccess = () => {
  return (
    <div className="forbidden-access-main-container">
      <div className="scene">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <span className="bg-403">403</span>
        <div className="text d-flex flex-column">
          <span className="hero-text"></span>
          <span className="msg">Access Denied</span>
          <button className="forbidden-access-page-button" >Go Back</button>
        </div>
        <div className="lock"></div>
      </div>
    </div>
  );
}

export default ForbiddenAccess;