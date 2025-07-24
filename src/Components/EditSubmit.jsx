import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../Firebase";
import { updateDoc, doc, getDocs, collection, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const EditSubmit = () => {
  const location = useLocation();
  const manage = location.state;
  const navigate = useNavigate();
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  const [workerName, setWorkerName] = useState(manage.workerName);
  const [selectedDiamond, setSelectedDiamond] = useState(manage.diamondName || "");
  const [submit, setSubmit] = useState(manage.submit);
  const [diamondTypes, setDiamondTypes] = useState([]);

  useEffect(() => {
    const fetchDiamondTypes = async () => {
      const snapshot = await getDocs(collection(firestore, "diamond_type"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiamondTypes(data);
    };
    fetchDiamondTypes();
  }, []);

  const resetForm = () => {
    setWorkerName("");
    setSelectedDiamond("");
    setSubmit("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedDiamond) {
      alert(t("Please select a valid diamond"));
      return;
    }

    try {
      await updateDoc(doc(firestore, "diamond_submitted", manage.id), {
        workerName,
        diamondName: selectedDiamond,
        submit,
        updatedAt: serverTimestamp(),
      });
      alert(t("Updated successfully"));
      navigate("/admindashboard/viewlistsubmit");
    } catch (error) {
      alert(t("Error updating:") + " " + error.message);
    }
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleUpdate}>
        <h2>{t("Diamond Submitted")}</h2>

        {t("Worker Name")}:
        <input
          type="text"
          value={workerName}
          placeholder={t("Enter worker name")}
          required
          onChange={(e) => setWorkerName(e.target.value)}
        />

        {t("Diamond Type")}:
        <select
          value={selectedDiamond}
          required
          onChange={(e) => setSelectedDiamond(e.target.value)}
        >
          <option value="">{t("Select Diamond Type")}</option>
          {diamondTypes.map(d => (
            <option key={d.id} value={d.diamondName}>
              {d.diamondName}
            </option>
          ))}
        </select>

        {t("Submitted")}:
        <input
          type="number"
          value={submit}
          placeholder={t("Enter quantity")}
          required
          onChange={(e) => setSubmit(e.target.value)}
        />

        <div className="btn-wrapper">
          <button
            type="button"
            className="resetform-btn"
            onClick={resetForm}
          >
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
