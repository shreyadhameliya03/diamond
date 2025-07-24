// src/Components/AddDiamond.jsx
import React, { useState } from "react";
import { firestore } from "../Firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export const AddDiamond = () => {
  const [diamondName, setDiamondName] = useState("");
  const [diamondPrice, setDiamondPrice] = useState("");
  const { t } = useTranslation();

  const addDiamond = async (e) => {
    e.preventDefault();

    try {
      const newDocRef = doc(collection(firestore, "diamond_type"));

      await setDoc(newDocRef, {
        diamondName,
        diamondPrice,
        diamond_id: newDocRef.id,
        createdAt: serverTimestamp(),
      });

      alert(t("diamond added successfully!"));
      setDiamondName("");
      setDiamondPrice("");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setDiamondName("");
    setDiamondPrice("");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={addDiamond}>
        <h2>{t("Add Diamond")}</h2>

        {t("Diamond Name")}:
        <input
          type="text"
          value={diamondName}
          placeholder={t("Enter name")}
          required
          onChange={(e) => setDiamondName(e.target.value)}
        />

        {t("Diamond Price")}:
        <input
          type="number"
          value={diamondPrice}
          placeholder={t("Enter price")}
          required
          onChange={(e) => setDiamondPrice(e.target.value)}
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
