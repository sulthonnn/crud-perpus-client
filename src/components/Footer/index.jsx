import React from "react";
import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer has-background-success mt-0">
      <div>
        <p className="content has-text-centered">
          <strong>
            Copyright <FaCopyright />
            {` ${new Date().getFullYear()} by Stulib.com. `}
          </strong>
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
