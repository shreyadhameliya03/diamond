import { SidemenuContext } from "./SiemenuContext";
import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ViewListDiamond = () => {
  const [diamonds, setDiamonds] = useState([]);
  const navigate = useNavigate();
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  const viewDiamond = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "diamond_type"));
      const allDiamonds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiamonds(allDiamonds);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    viewDiamond();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this diamond?"))) {
      await deleteDoc(doc(firestore, "diamond_type", id));
      alert(t("Diamond deleted successfully."));
      viewDiamond();
    }
  };

  const handleEdit = (diamond) => {
    navigate("/admindashboard/editdiamond", { state: diamond });
  };

  return (
    <div className={`content ${isSideMenu ? "showcontent" : ""}`}>
      {diamonds.length === 0 ? (
        <div className="found">{t("No diamonds found.")}</div>
      ) : (
        <>
          <div className="rowtitle">
            <h2 className="diamond-member-header">{t("All Diamonds")}</h2>
            <Link to="/admindashboard/adddiamond" className="diamond-add">
              {t("Add")}
            </Link>
          </div>

          <div className="table-responsive d-flex justify-content-center">
            <table className="table table-bordered table-hover table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">{t("Name")}</th>
                  <th className="text-center">{t("Price")}</th>
                  <th className="text-center">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {diamonds.map((diamond) => (
                  <tr key={diamond.id}>
                    <td className="text-center">{diamond.diamondName}</td>
                    <td className="text-center">{diamond.diamondPrice}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(diamond)}
                      >
                        {t("Edit")}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(diamond.id)}
                      >
                        {t("Delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
