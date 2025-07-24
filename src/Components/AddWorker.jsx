// src/Components/AddWorker.jsx
import { serverTimestamp, doc, setDoc, collection } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import React, { useState, useContext } from "react";
import { firestore } from "../Firebase";
import { useTranslation } from "react-i18next";

export const AddWorker = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  const addWorker = async (e) => {
    e.preventDefault();
    try {
      const newDocRef = doc(collection(firestore, "worker"));

      await setDoc(newDocRef, {
        name,
        phone,
        address,
        worker_id: newDocRef.id,
        createdAt: serverTimestamp(),
      });

      alert(t("Worker added successfully!"));
      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={addWorker}>
        <h2>{t("Add Worker")}</h2>

        {t("Worker Name")}:
        <input
          type="text"
          value={name}
          placeholder={t("Enter name")}
          required
          onChange={(e) => setName(e.target.value)}
        />

        {t("Worker Phone")}:
        <input
          type="number"
          value={phone}
          placeholder={t("Enter phone")}
          required
          onChange={(e) => setPhone(e.target.value)}
        />

        {t("Worker Address")}:
        <input
          type="text"
          value={address}
          placeholder={t("Enter address")}
          required
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="button" onClick={resetForm}>
          {t("Cancel")}
        </button>
        <button type="submit" className="space-two-btn">
          {t("Add")}
        </button>
      </form>
    </div>
  );
};
