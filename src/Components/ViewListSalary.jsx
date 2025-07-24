import React, { useEffect, useState, useContext } from "react";
import { Timestamp, query, where, getDocs, collection } from "firebase/firestore";
import { firestore } from "../Firebase";
import { SidemenuContext } from "./SiemenuContext";
import { useTranslation } from "react-i18next";

export const ViewListSalary = () => {
  const [selectedWorker, setSelectedWorker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [management, setManagement] = useState([]);
  const [fetchWorker, setFetchWorker] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [diamondCount, setDiamondCount] = useState({});
  const [upadList, setUpadList] = useState([]);
  const [upadAmount, setUpadAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const isSideMenu = useContext(SidemenuContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWorkers = async () => {
      const res = await getDocs(collection(firestore, "diamond_submitted"));
      const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setManagement(data);
    };
    fetchWorkers();
  }, []);

  useEffect(() => {
    const fetchWorkersUpad = async () => {
      if (!selectedWorker || !startDate || !endDate) return;

      const start = Timestamp.fromDate(new Date(startDate));
      const endDateObj = new Date(endDate);
      endDateObj.setHours(23, 59, 59, 999);
      const end = Timestamp.fromDate(endDateObj);

      const snapshot = await getDocs(
        query(
          collection(firestore, "worker_upad"),
          where("name", "==", selectedWorker),
          where("createdAt", ">=", start),
          where("createdAt", "<=", end)
        )
      );

      const upadEntries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const totalUpad = snapshot.docs.reduce((sum, doc) => sum + Number(doc.data().upad || 0), 0);
      setUpadList(upadEntries);
      setUpadAmount(totalUpad);
    };
    fetchWorkersUpad();
  }, [selectedWorker, startDate, endDate]);

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
  const handleSalary = async (e) => {
    e.preventDefault();

    const typewise = {};
    if (!selectedWorker || !startDate || !endDate) {
      alert(t("Please select all fields"));
      return;
    }

    const start = Timestamp.fromDate(new Date(startDate));
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);
    const end = Timestamp.fromDate(endDateObj);

    const q = query(
      collection(firestore, "diamond_submitted"),
      where("workerName", "==", selectedWorker),
      where("date", ">=", start),
      where("date", "<=", end)
    );

    const res = await getDocs(q);
    const data = res.docs.map((doc) => {
      const totalGot = doc.data().submit;
      const totalAmount = (doc.data().submit || 0) * (doc.data().price || 0);

      if (!typewise[doc.data().diamondName]) {
        typewise[doc.data().diamondName] = Number(totalGot);
      } else {
        typewise[doc.data().diamondName] += Number(totalGot);
      }

      return {
        id: doc.id,
        ...doc.data(),
        totalGot,
        totalAmount,
      };
    });

    const totalSalary = data.reduce((sum, num) => sum + num.totalAmount, 0);
    const amount = totalSalary - upadAmount;

    setFetchWorker(data);
    setGrandTotal(totalSalary);
    setDiamondCount(typewise);
    setTotalAmount(amount);
  };

  return (
    <div className={`salaryform ${isSideMenu ? "showcontent" : ""}`}>
      <div className="generate-salary">
        <h4 className="mb-3">{t("Generate Salary List")}</h4>

        <form onSubmit={handleSalary} className="row g-3">
          <div className="col-12 col-md-3">
            <select
              className="form-control"
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
              required
            >
              <option value="">{t("Select Worker Name")}</option>
              {[...new Set(management.map((w) => w.workerName))].map((worker) => (
                <option key={worker} value={worker}>
                  {worker}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3">

            <label htmlFor="" className="label-show" >{t("Start Date:")}</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="" className="label-show" >{t("End Date:")}</label>

            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="col-12 col-md-1 d-grid">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#5D5FEF",
                color: "white",
                border: "1px solid #5D5FEF"
              }}
            >
              {t("Generate")}
            </button>
          </div>
        </form>
      </div>

      {fetchWorker.length === 0 ? null : (
        <div className="mt-4 table-responsive justify-content-center">
          <table className="table custom-salary table-bordered table-hover table-sm align-middle">
            <thead>
              <tr>
                <th className="text-center">{t("Date")}</th>
                <th className="text-center">{t("Diamond")}</th>
                <th className="text-center">{t("Price")}</th>
                <th className="text-center">{t("Submitted")}</th>
                <th className="text-center">{t("Total Amount")}</th>
              </tr>
            </thead>
            <tbody>
              {fetchWorker.map((entry) => (
                <tr key={entry.id}>
                  <td className="text-center">{formatDate(entry.date)}</td>
                  <td className="text-center">{entry.diamondName}</td>
                  <td className="text-center">{entry.price}</td>
                  <td className="text-center">{entry.submit}</td>
                  <td className="text-center">{entry.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 salary-summary-container">
            <div className="summary-box" style={{ backgroundColor: "blue" }}>
              {t("Total Salary")} : ₹{grandTotal}
            </div>
            <div className="summary-box" style={{ backgroundColor: "red" }}>
              {t("Total Upad")} : ₹{upadAmount}
            </div>
            <div className="summary-box" style={{ backgroundColor: "green" }}>
              {t("Final Salary")} : ₹{totalAmount}
            </div>
          </div>

          <div className="boxes">
            <div>
              <h5 className="mt-4">{t("Upad Entries")}</h5>
              <table className="table table-bordered" style={{ width: "270px" }}>
                <thead>
                  <tr>
                    <th className="text-center">{t("Date")}</th>
                    <th className="text-center">{t("Upad")}</th>
                  </tr>
                </thead>
                <tbody>
                  {upadList.map((res) => (
                    <tr key={res.id}>
                      <td className="text-center">{res.createdAt?.toDate().toLocaleDateString()}</td>
                      <td className="text-center">{res.upad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h5 className="mt-4">{t("Diamond Type List")}</h5>
              <table className="table table-bordered" style={{ width: "370px" }}>
                <thead>
                  <tr>
                    <th className="text-center">{t("Diamond Type")}</th>
                    <th className="text-center">{t("Total Diamonds Got")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(diamondCount).map(([diamondName, totalGot]) => (
                    <tr key={diamondName}>
                      <td className="text-center">{diamondName}</td>
                      <td className="text-center">{totalGot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
