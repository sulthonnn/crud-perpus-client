import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="columns mt-6 mb-0 " style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column has-background-light">
          <div className="container is-fluid">
            <main>{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
