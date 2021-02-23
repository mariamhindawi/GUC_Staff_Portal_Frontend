import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="error-page-container">
      <div className="circles">
        <p>
          404
          <br />
          <small>PAGE NOT FOUND</small>
        </p>
        <span className="circle big" />
        <span className="circle med" />
        <span className="circle small" />
      </div>
      <Link to="/" tabIndex={-1}>
        <button className="error-page-button" type="button">
          Go back to home
        </button>
      </Link>
    </div>
  );
}

export default PageNotFound;
