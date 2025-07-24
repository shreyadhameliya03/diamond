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
import { useTranslation } from "react-i18next";
// import { SidemenuContext } from "./SiemenuContext";

export const AdminDashboard = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);


  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  console.log("Current lang:", i18n.language);

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


      <div className="dummy-logo">
        <img src={dummylogo} alt="logo" className="logo" style={{ width: "40px" }} />
        <div className="dummy-title">{t("Diamond")}</div>


        <div className="language-selecter mobile-only">
          <select className="language-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="gu">🇮🇳 ગુજરાતી</option>
            <option value="en">🇺🇸 English</option>

          </select>
        </div>

        <div className="hamburger-toggle" onClick={handleToggle}>
          {isSideMenu ? "✕" : "☰"}
        </div>
      </div>


      <div className={`sidemenu ${isSideMenu ? "show" : ""}`}>


        {/* <div className="dashboard-content"> */}
        <div className={`dashboard-content ${isSideMenu ? "show" : ""}`}>


          <div className="main">
            <div className="dash-name">{t("Worker")}</div>
            <Link to="addworker" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("Add Worker")}</div>
            </Link>
            <Link to="viewlistmember" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View List Worker")}</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">{t("Upad")}</div>
            <Link to="addupad" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("Add Worker Upad")}</div>
            </Link>
            <Link to="viewmemberupad" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View Worker Upad")}</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">{t("Diamond Types")}</div>
            <Link to="adddiamond" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("Add Diamond")}</div>
            </Link>
            <Link to="viewlistdiamond" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View List Diamond")}</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">{t("Diamond Management")}</div>
            <Link to="addmanagement" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("Add Management")}</div>
            </Link>
            <Link to="viewlistmanagement" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View List Management")}</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">{t("Diamond Submitted")}</div>
            <Link to="addsubmit" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-plus" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("Add Submit Diamond")}</div>
            </Link>
            <Link to="viewlistsubmit" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View List Submit")}</div>
            </Link>
          </div>

          <div className="main">
            <div className="dash-name">{t("Salary")}</div>
            <Link to="viewlistsalary" className="dash-icon-content" style={{ textDecoration: "none", color: "#737791" }} onClick={() => setIsSideMenu(false)}>
              <i className="fas fa-list" style={{ fontSize: "18px", marginRight: "10px" }}></i>
              <div className="dash-icon-name">{t("View List Salary")}</div>
            </Link>
          </div>

          <div className="main" onClick={handleSignOut} style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            <img src={signout} alt="signout" style={{ height: "32px", width: "32px" }} />
            <div className="dash-name">{t("Sign Out")}</div>
          </div>
        </div>
      </div >



      <div className="topmenu">
        {/* Left Side - Logo or Title */}
        <div className="topdashboard">{t("Diamond")}</div>

        {/* Middle - Search bar */}
        <div className="topsearch">
          <img src={magnifier} alt="search" style={{ height: "30px", width: "30px" }} />
          <input
            type="text"
            placeholder={t("Search here..")}
            className="search-input"
          />
        </div>

        {/* Right Side - Language & Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div className="language-selecter desktop-only">
            <select className="language-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="gu">🇮🇳 ગુજરાતી</option>
              <option value="en">🇺🇸 English</option>

            </select>
          </div>




          <div className="personaldetail">
            <img src={Notifications} alt="notification" />
            <img src={personal} alt="profile" style={{ marginLeft: "10px" }} />
            <div className="personbio">
              <div className="personname">{t("shreya")}</div>
              <div className="perasoncatagory">{t("Admin")}</div>
            </div>
            <img src={dropdowndark} alt="dropdown" style={{ marginLeft: "10px" }} />
          </div>
        </div>
      </div>


      {/* <SidemenuContext.Provider value={isSideMenu}> */}
      <div className="page-content">
        <Outlet />
      </div>
      {/* </SidemenuContext.Provider> */}
    </>
  );
};
