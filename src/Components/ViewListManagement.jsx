import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const ViewListManagement = () => {
  const [manage, setManage] = useState([]);
  const isSideMenu = useContext(SidemenuContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const viewManagement = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "diamond_management"));
      const allmanage = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      allmanage.sort((a, b) => {
        const tsA = a.createdAt?.seconds || 0;
        const tsB = b.createdAt?.seconds || 0;
        return tsB - tsA;
      });

      console.log("manage data", allmanage);
      setManage(allmanage);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    viewManagement();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure?"))) {
      await deleteDoc(doc(firestore, "diamond_management", id));
      alert(t("Diamond deleted"));
      viewManagement();
    }
  };

  const handleEdit = async (manage) => {
    navigate("/admindashboard/editmanagement", { state: manage });
  };
  const formatDate = (createdAt) => {
    try {
      const date = createdAt?.toDate?.();
      if (!date) return "";

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}`;
    } catch {
      return "";
    }
  };


  return (
    <div className={`content ${isSideMenu ? "showcontent" : ""}`}>
      {
        manage.length === 0 ? (
          <div className="found">{t("No diamond found.")}</div>
        ) : (
          <>
            <div className="rowtitle">
              <h2 className="other-header">{t("Worker Assignment")}</h2>
              <Link to="/admindashboard/addmanagement" className="manage-add">
                {t("Add")}
              </Link>
            </div>

            <div className="table-responsive d-flex justify-content-center">
              <table className="table table-bordered table-hover table-sm align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">{t("Date")}</th>
                    <th className="text-center">{t("Name")}</th>
                    <th className="text-center">{t("Type")}</th>
                    <th className="text-center">{t("Price")}</th>
                    <th className="text-center">{t("Given")}</th>
                    <th className="text-center">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {manage.map((res) => (
                    <tr key={res.id}>
                      <td className="text-center">
                        {formatDate(res.createdAt)}
                        {console.log("Created At:", formatDate(res.createdAt))}
                      </td>
                      <td className="text-center">{res.workerName}</td>
                      <td className="text-center">{res.diamondName}</td>
                      <td className="text-center">{res.price}</td>
                      <td className="text-center">{res.given}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEdit(res)}
                        >
                          {t("Edit")}
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(res.id)}
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
        )
      }
    </div>
  );
};
