import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../Firebase";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const EditUpad = () => {
  const location = useLocation();
  const worker = location.state;
  const navigate = useNavigate();
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  const [name, setName] = useState(worker.name);
  const [upad, setUpad] = useState(worker.upad);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(firestore, "worker_upad", worker.id), {
        name,
        upad,
        updatedAt: serverTimestamp(),
      });
      alert(t("Worker upad updated successfully"));
      navigate("/admindashboard/viewmemberupad");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setName("");
    setUpad("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleUpdate}>
        <h2>{t("Update Upad")}</h2>

        <label>{t("Worker Name")}:</label>
        <input
          type="text"
          value={name}
          placeholder={t("Enter name")}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>{t("Worker Upad")}:</label>
        <input
          type="number"
          value={upad}
          placeholder={t("Enter upad")}
          onChange={(e) => setUpad(e.target.value)}
          required
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
