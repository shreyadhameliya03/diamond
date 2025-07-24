import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const AddUpad = () => {
  const [fetchWorker, setFetchWorker] = useState([]);
  const [selectWorker, setSelectWorker] = useState("");
  const [upad, setUpad] = useState("");
  const [note, setNote] = useState("");
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  useEffect(() => {
    const workerFetch = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "worker"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFetchWorker(data);
      } catch (e) {
        alert(e.message);
      }
    };
    workerFetch();
  }, []);

  const resetForm = () => {
    setSelectWorker("");
    setUpad("");
    setNote("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectWorker || !upad) {
      alert(t("Please select name and upad"));
      return;
    }

    try {
      await addDoc(collection(firestore, "worker_upad"), {
        name: selectWorker,
        upad: upad,
        note: note,
        createdAt: serverTimestamp(),
      });

      alert(t("Upad successfully added"));
      resetForm();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{t("Add Worker Upad")}</h2>

        {t("Worker Name")}:
        <select
          required
          value={selectWorker}
          onChange={(e) => setSelectWorker(e.target.value)}
        >
          <option value="">{t("Select Worker")}</option>
          {fetchWorker.map((worker) => (
            <option key={worker.id} value={worker.name}>
              {worker.name}
            </option>
          ))}
        </select>

        {t("Worker Upad")}:
        <input
          type="number"
          value={upad}
          placeholder={t("Enter upad")}
          required
          onChange={(e) => setUpad(e.target.value)}
        />

        {t("Upad Note")}:
        <input
          type="text"
          value={note}
          placeholder={t("Enter upad note")}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="btn-wrapper">
          <button type="button" onClick={resetForm}>
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
