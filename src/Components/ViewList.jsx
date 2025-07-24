import { SidemenuContext } from "./SiemenuContext";
import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../Firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ViewList = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  const viewWorker = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "worker"));
      const allWorker = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkers(allWorker);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    viewWorker();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure?"))) {
      await deleteDoc(doc(firestore, "worker", id));
      alert(t("Worker deleted"));
      viewWorker();
    }
  };

  const handleEdit = (worker) => {
    navigate("/admindashboard/editworker", { state: worker });
  };

  return (
    <div className={`content ${isSideMenu ? "showcontent" : ""}`}>
      {workers.length === 0 ? (
        <div className="found">{t("No workers found.")}</div>
      ) : (
        <>
          <div className="rowtitle">
            <h2 className="diamond-member-header">{t("All Workers")}</h2>
            <Link to="/admindashboard/addworker" className="worker-add">
              {t("Add")}
            </Link>
          </div>

          <div className="table-responsive d-flex justify-content-center">
            <table className="table table-bordered table-hover table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">{t("Name")}</th>
                  <th className="text-center">{t("Phone")}</th>
                  <th className="text-center">{t("Address")}</th>
                  <th className="text-center">{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td className="text-center">{worker.name}</td>
                    <td className="text-center">{worker.phone}</td>
                    <td className="text-center">{worker.address}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(worker)}
                      >
                        {t("Edit")}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(worker.id)}
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
