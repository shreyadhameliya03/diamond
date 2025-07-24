import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore } from "../Firebase";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const EditDiamond = () => {
  const location = useLocation();
  const diamonds = location.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [diamondName, setDiamondName] = useState(diamonds.diamondName);
  const [diamondPrice, setDiamondPrice] = useState(diamonds.diamondPrice);
  const isSideMenu = useContext(SidemenuContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateDoc(doc(firestore, "diamond_type", diamonds.id), {
      diamondName,
      diamondPrice,
      updatedAt: serverTimestamp(),
    });

    alert(t("Diamond updated successfully"));
    // navigate back after update if you want:
    // navigate("/admindashboard/viewdiamond");
  };

  const resetForm = () => {
    setDiamondName("");
    setDiamondPrice("");
  };

  return (
    <div className={`login-container ${isSideMenu ? "showlogin" : ""}`}>
      <form className="login-form" onSubmit={handleUpdate}>
        <h2>{t("Update Diamond")}</h2>

        {t("Diamond Name")}:
        <input
          type="text"
          value={diamondName}
          placeholder={t("Enter diamond name")}
          required
          onChange={(e) => setDiamondName(e.target.value)}
        />

        {t("Diamond Price")}:
        <input
          type="number"
          value={diamondPrice}
          placeholder={t("Enter diamond price")}
          required
          onChange={(e) => setDiamondPrice(e.target.value)}
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
