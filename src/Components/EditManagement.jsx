import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../Firebase";
import { updateDoc, doc, getDocs, collection, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const EditManagement = () => {
  const location = useLocation();
  const manage = location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [workerName, setWorkerName] = useState(manage.workerName);
  const [selectedDiamond, setSelectedDiamond] = useState(manage.diamondId);
  const [quantities, setQuantities] = useState(manage.given);
  const [diamondTypes, setDiamondTypes] = useState([]);

  const isSideMenu = useContext(SidemenuContext);

  // 👉 Fetch diamond types
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
    setQuantities("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const selectedDiamondData = diamondTypes.find(d => d.id === selectedDiamond);
    if (!selectedDiamondData) {
      alert(t("Please select a valid diamond"));
      return;
    }

    await updateDoc(doc(firestore, "diamond_management", manage.id), {
      workerName,
      diamondId: selectedDiamondData.id,
      diamondName: selectedDiamondData.diamondName,
      given: quantities,
      updatedAt: serverTimestamp(),
    });

    alert(t("Updated successfully"));
    navigate("/admindashboard/viewlistmanagement");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleUpdate}>
        <h2>{t("Update Diamond Management")}</h2>

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
            <option key={d.id} value={d.id}>
              {d.diamondName}
            </option>
          ))}
        </select>

        {t("How Many")}:
        <input
          type="number"
          value={quantities}
          placeholder={t("Enter quantity")}
          required
          onChange={(e) => setQuantities(e.target.value)}
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
