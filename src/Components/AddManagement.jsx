import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../Firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const AddManagement = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);
  const [diamondTypes, setDiamondTypes] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState("");
  const [quantity, setQuantity] = useState("");
  const isSideMenu = useContext(SidemenuContext);

  // 👇 Get All Workers
  useEffect(() => {
    const fetchWorkers = async () => {
      const snapshot = await getDocs(collection(firestore, "worker"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkers(data);
    };
    fetchWorkers();
  }, []);

  // 👇 Get All Diamond Types
  useEffect(() => {
    const fetchDiamondTypes = async () => {
      const snapshot = await getDocs(collection(firestore, "diamond_type"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiamondTypes(data);
    };
    fetchDiamondTypes();
  }, []);

  // 👇 Add Final Entry
  const handleSubmit = async (e) => {
    e.preventDefault();

    const worker = workers.find(w => w.id === selectedWorker);
    const diamond = diamondTypes.find(d => d.id === selectedDiamond);

    if (!worker || !diamond) {
      alert(t("Please select both Worker and Diamond Type"));
      return;
    }

    const finalData = {
      workerId: worker.id,
      workerName: worker.name,
      diamondId: diamond.id,
      diamondName: diamond.diamondName,
      price: diamond.diamondPrice,
      given: quantity,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(firestore, "diamond_management"), finalData);
      alert(t("Diamond Management entry added successfully!"));
      setSelectedWorker("");
      setSelectedDiamond("");
      setQuantity("");
    } catch (error) {
      alert(t("Error: ") + error.message);
    }
  };

  const resetForm = () => {
    setSelectedWorker("");
    setSelectedDiamond("");
    setQuantity("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t("Diamond Management")}</h2>

        {t("Worker Name")}:
        <select
          value={selectedWorker}
          required
          onChange={(e) => setSelectedWorker(e.target.value)}
        >
          <option value="">{t("Select Worker")}</option>
          {workers.map(worker => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>

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

        {t("How Many Diamonds")}:
        <input
          type="number"
          value={quantity}
          placeholder={t("Enter quantity")}
          required
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="btn-wrapper">
          <button type="button" className="resetform-btn" onClick={resetForm}>
            {t("Cancel")}
          </button>
          <button type="submit" className="space-two-btn">
            {t("Add")}
          </button>
        </div>
      </form>
    </div>
  );
};
