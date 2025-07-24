import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { collection, getDocs, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const AddSubmit = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);
  const [diamondTypes, setDiamondTypes] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState("");
  const [selectDate, setSelectDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [submit, setSubmit] = useState("");
  const isSideMenu = useContext(SidemenuContext);

  useEffect(() => {
    const fetchWorkers = async () => {
      const snapshot = await getDocs(collection(firestore, "worker"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkers(data);
    };
    fetchWorkers();
  }, []);

  useEffect(() => {
    const fetchDiamondTypes = async () => {
      const snapshot = await getDocs(collection(firestore, "diamond_type"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiamondTypes(data);
    };
    fetchDiamondTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const worker = workers.find(w => w.id === selectedWorker);
    const diamond = diamondTypes.find(d => d.id === selectedDiamond);

    if (!worker || !diamond) {
      alert(t("Please select both Worker and Diamond Type"));
      return;
    }

    try {
      await addDoc(collection(firestore, "diamond_submitted"), {
        workerName: worker.name,
        diamondName: diamond.diamondName,
        submit: submit,
        price: diamond.diamondPrice,
        date: Timestamp.fromDate(new Date(selectDate + "T" + new Date().toTimeString().split(" ")[0])),
        createdAt: serverTimestamp()
      });
      alert(t("Diamond Management entry added successfully!"));
      setSelectedWorker("");
      setSelectedDiamond("");
      setSubmit("");
      setSelectDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      alert(t("Error") + ": " + error.message);
    }
  };

  const resetForm = () => {
    setSelectedWorker("");
    setSelectedDiamond("");
    setSubmit("");
    setSelectDate("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t("Diamond Submitted")}</h2>

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

        {t("Submit Diamonds")}:
        <input
          type="number"
          value={submit}
          placeholder={t("Enter submitted quantity")}
          required
          onChange={(e) => setSubmit(e.target.value)}
        />

        {t("Select Date")}:
        <input
          type="date"
          value={selectDate || ""}
          onChange={(e) => setSelectDate(e.target.value)}
        />

        <button type="button" className="resetform-btn" onClick={resetForm}>
          {t("Cancel")}
        </button>
        <button type="submit" className="space-two-btn">
          {t("Add")}
        </button>
      </form>
    </div>
  );
};
