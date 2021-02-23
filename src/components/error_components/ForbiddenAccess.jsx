import React from "react";
import { Link } from "react-router-dom";

function ForbiddenAccess() {
  return (
    <div className="forbidden-access-container">
      <div className="scene">
        <div className="overlay" />
        <div className="overlay" />
        <div className="overlay" />
        <div className="overlay" />
        <span className="bg-403">403</span>
        <div className="text">
          <span className="hero-text" />
          <span className="msg">
            Can&apos;t let&nbsp;
            <span>you</span>
            &nbsp;in
          </span>
        </div>
        <div className="lock" />
      </div>
      <Link to="/" tabIndex={-1}>
        <button className="forbidden-page-button" type="button">
          Go back to home
        </button>
      </Link>
    </div>
  );
}

export default ForbiddenAccess;
