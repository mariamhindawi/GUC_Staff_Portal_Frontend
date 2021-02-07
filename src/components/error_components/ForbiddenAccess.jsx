import React from "react";

function ForbiddenAccess() {
  return (
    <div className="forbidden-access-main-container">
      <div className="scene">
        <div className="overlay" />
        <div className="overlay" />
        <div className="overlay" />
        <div className="overlay" />
        <span className="bg-403">403</span>
        <div className="text d-flex flex-column">
          <span className="hero-text" />
          <span className="msg">Access Denied</span>
          <button className="forbidden-access-page-button" type="button">Go Back</button>
        </div>
        <div className="lock" />
      </div>
    </div>
  );
}

export default ForbiddenAccess;
