import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../Firebase";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const EditWorkers = () => {
  const location = useLocation();
  const workers = location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState(workers.name);
  const [phone, setPhone] = useState(workers.phone);
  const [address, setAddress] = useState(workers.address);
  const isSideMenu = useContext(SidemenuContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateDoc(doc(firestore, "worker", workers.id), {
      name,
      phone,
      address,
      updatedAt: serverTimestamp(),
    });

    alert(t("Worker updated successfully!"));
    navigate("/admindashboard/viewlistmember");
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleUpdate}>
        <h2>{t("Update Worker")}</h2>

        {t("Name")}:
        <input
          type="text"
          value={name}
          placeholder={t("Enter name")}
          required
          onChange={(e) => setName(e.target.value)}
        />

        {t("Phone")}:
        <input
          type="number"
          value={phone}
          placeholder={t("Enter phone")}
          required
          onChange={(e) => setPhone(e.target.value)}
        />

        {t("Address")}:
        <input
          type="text"
          value={address}
          placeholder={t("Enter address")}
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="btn-wrapper">
          <button type="button" onClick={resetForm}>
            {t("Cancel")}
          </button>
          <button type="submit" className="space-two-btn">
            {t("Update")}
          </button>
        </div>
      </form>
    </div>
  );
};
