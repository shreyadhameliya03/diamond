import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const ViewWorkerUpad = () => {
  const [fetchWorkerList, setFetchWorkerList] = useState([]);
  const navigate = useNavigate();
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation(); // ✅ for Gujarati translations

  useEffect(() => {
    workerFetch();
  }, []);

  const workerFetch = async () => {
    const snapshot = await getDocs(collection(firestore, "worker_upad"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    data.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA;
    });
    setFetchWorkerList(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure?"))) {
      await deleteDoc(doc(firestore, "worker_upad", id));
      alert(t("Deleted successfully"));
      workerFetch();
    }
  };

  const handleEdit = async (worker) => {
    navigate("/admindashboard/editupad", { state: worker });
  };

  return (
    <div className={`content ${isSideMenu ? "showcontent" : ""}`}>
      {fetchWorkerList.length === 0 ? (
        <div className="found">{t("No worker upad found.")}</div>
      ) : (
        <>
          <div className="rowtitle">
            <h2 className="other-header">{t("Worker Upad")}</h2>
            <Link to="/admindashboard/addupad" className="upad-add">
              {t("Add")}
            </Link>
          </div>

          <div className="table-responsive d-flex justify-content-center">
            <table className="table table-bordered table-hover table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">{t("Date")}</th>
                  <th className="text-center">{t("Name")}</th>
                  <th className="text-center">{t("Upad")}</th>
                  <th className="text-center">{t("Note")}</th>
                  <th className="text-center">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {fetchWorkerList.map((res) => (
                  <tr key={res.id}>
                    <td className="text-center">{res.createdAt?.toDate().toLocaleDateString()}</td>
                    <td className="text-center">{res.name}</td>
                    <td className="text-center">{res.upad}</td>
                    <td className="text-center">{res.note}</td>
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
