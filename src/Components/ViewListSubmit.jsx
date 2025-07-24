import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const ViewListSubmit = () => {
  const [manage, setManage] = useState([]);
  const isSideMenu = useContext(SidemenuContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 👉 Fetch all submitted diamonds
  const viewManagement = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "diamond_submitted"));
      const allmanage = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      allmanage.sort((a, b) => {
        const dateA = a.date?.seconds || 0;
        const dateB = b.date?.seconds || 0;
        return dateB - dateA;
      });
      setManage(allmanage);
    } catch (e) {
      alert(e.message);
    }
  };
  const formatDate = (date) => {
    try {
      const dateformat = date?.toDate?.();
      if (!dateformat) return "";

      const day = String(dateformat.getDate()).padStart(2, '0');
      const month = String(dateformat.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}`;
    } catch {
      return "";
    }
  };
  useEffect(() => {
    viewManagement();
  }, []);

  // 👉 Delete Entry
  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure?"))) {
      await deleteDoc(doc(firestore, "diamond_submitted", id));
      alert(t("Diamond submit deleted"));
      viewManagement();
    }
  };

  // 👉 Edit Entry
  const handleEdit = async (manage) => {
    navigate("/admindashboard/editsubmit", { state: manage });
    console.log("Edit Entry: ", manage);
  };

  return (
    <div className={`content ${isSideMenu ? "showcontent" : ""}`}>
      {manage.length === 0 ? (
        <div className="found">{t("No diamond found.")}</div>
      ) : (
        <>
          <div className="rowtitle">
            <h2 className="other-header">{t("Submitted Diamond")}</h2>
            <Link to="/admindashboard/addsubmit" className="submit-add">
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
                  <th className="text-center">{t("Submit")}</th>
                  <th className="text-center">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {manage.map((res) => (
                  <tr key={res.id}>
                    <td className="text-center">
                      {formatDate(res.date)}
                    </td>
                    <td className="text-center">{res.workerName}</td>
                    <td className="text-center">{res.diamondName}</td>
                    <td className="text-center">{res.submit}</td>
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
      )}
    </div>
  );
};
