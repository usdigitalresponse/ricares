import React from "react";
import { Link } from "gatsby";
import "../styles/global.css";

export default ({ children }) => (
  <div>
    <div className="menu">
      <Link to={`/`}>
        <h3 className="menu-content">
          Rhode Island CARES Act Funding Requests
        </h3>
      </Link>
    </div>
    <div className="container">{children}</div>
  </div>
);
