import React, { useState, useEffect } from "react";
import dummylogo from "../assets/dummy logo.png"
import button from "../assets/button.png"
import signout from "../assets/signout.png"
import magnifier from "../assets/magnifier.svg"
import dropdown from "../assets/dropdown.svg"
import United from "../assets/United.svg"
import Notifications from "../assets/Notifications.png"
import personal from "../assets/personal.png"
import dropdowndark from "../assets/dropdowndark.png"
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { SidemenuContext } from "./SiemenuContext";

export const AdminDashboard = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);

  const handleToggle = () => {
    setIsSideMenu(!isSideMenu);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Sign out successful!");
        window.location.href = "/";
      })
      .catch((error) => {
        alert("Sign out failed: " + error.message);
      });
  };

  return (
    <>


      <div className="hamburger-toggle" onClick={handleToggle}>
        ☰
      </div>


      <div className={`sidemenu ${isSideMenu ? "show" : ""}`}>
        <div className="dummy-logo">
          <img src={dummylogo} alt="logo" className="logo" style={{ width: "40px" }} />
          <div className="dummy-title">Diamond</div>
        </div>
        {/* <div className="dashboard-content"> */}
        <div className={`dashboard-content ${isSideMenu ? "show" : ""}`}>
          <div className="dash-button">
            <img src={button} alt="" style={{ paddingLeft: "20px", marginTop: "8px" }} />
            <div className="dash-button-content">Dashboard</div>
          </div>

          <div className="main">
            <div className="dash-name">Worker</div>
            <Link to="addworker" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">Add Worker</div>
            </Link>
            <Link to="viewlistmember" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View List Member</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">Upad</div>
            <Link to="addupad" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">Add Worker Upad</div>
            </Link>
            <Link to="viewmemberupad" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View Worker Upad</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">Diamond Types</div>
            <Link to="adddiamond" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">Add Diamond</div>
            </Link>
            <Link to="viewlistdiamond" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View List Diamond</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">Diamond Management</div>
            <Link to="addmanagement" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">Add Management</div>
            </Link>
            <Link to="viewlistmanagement" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View List Management</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">Diamond Submitted</div>
            <Link to="addsubmit" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">Add Submit Diamond</div>
            </Link>
            <Link to="viewlistsubmit" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View List Submit</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">Salary</div>
            <Link to="viewlistsalary" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">View List Salary</div>
            </Link>
          </div>

          <div className="main" onClick={handleSignOut} style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            <img src={signout} alt="signout" style={{ height: "32px", width: "32px" }} />
            <div className="dash-name">Sign Out</div>
          </div>
        </div>
      </div >
      <div className="topmenu">
        <div className="topdashboard">Diamond</div>
        <div className="topsearch">
          <img src={magnifier} alt="search" style={{ height: "30px", width: "30px" }} />
          <input type="text" placeholder="Search here.." className="search-input" />
        </div>

        <div className="language-selector">
          <img src={United} alt="US Flag" className="language-icon" />
          <div className="language-name">Eng(US)</div>
          <img src={dropdown} alt="dropdown" style={{ marginLeft: "16px" }} />
        </div>

        <div className="personaldetail">
          <img src={Notifications} alt="notification" />
          <img src={personal} alt="profile" style={{ marginLeft: "20px" }} />
          <div className="personbio">
            <div className="personname">Musfiq</div>
            <div className="perasoncatagory">Admin</div>
          </div>
          <img src={dropdowndark} alt="dropdown" style={{ marginLeft: "10px", marginTop: "-20px" }} />
        </div>
      </div>

      <SidemenuContext.Provider value={isSideMenu}>
        <div className="page-content">
          <Outlet />
        </div>
      </SidemenuContext.Provider>
    </>
  );
};
