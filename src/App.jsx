import React from "react";
import { AddWorker } from "./Components/AddWorker";
import { ViewList } from "./Components/ViewList";
import { Login } from "./Components/Login";
import { AdminDashboard } from "./Components/AdminDashboard";
import { EditWorkers } from "./Components/EditWorkers";
import { AddDiamond } from "./Components/AddDiamond"
import { EditDiamond } from "./Components/EditDiamond"
import { ViewListDiamond } from "./Components/ViewListDiamond"
import { ViewListManagement } from "./Components/ViewListManagement";
import { EditManagement } from "./Components/EditManagement"
import { AddManagement } from "./Components/AddManagement"
import { ViewListSalary } from "./Components/ViewListSalary";
import { AddUpad } from "./Components/AddUpad";
import { ViewWorkerUpad } from "./Components/ViewWorkerUpad";
import { EditUpad } from "./Components/EditUpad";
import { AddSubmit } from "./Components/AddSubmit";
import { ViewListSubmit } from "./Components/ViewListSubmit";
import { EditSubmit } from "./Components/EditSubmit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./Components/Register";
import "./App.css"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindashboard" element={< AdminDashboard />} >

          <Route path="editworker" element={<EditWorkers />} />
          <Route path="addworker" element={<AddWorker />} />
          <Route path="viewlistmember" element={<ViewList />} />
          <Route path="editdiamond" element={<EditDiamond />} />
          <Route path="adddiamond" element={<AddDiamond />} />
          <Route path="viewlistdiamond" element={<ViewListDiamond />} />
          <Route path="viewlistmanagement" element={<ViewListManagement />} />
          <Route path="editmanagement" element={<EditManagement />} />
          <Route path="addmanagement" element={<AddManagement />} />
          <Route path="viewlistsalary" element={<ViewListSalary />} />
          <Route path="viewmemberupad" element={<ViewWorkerUpad />}></Route>
          <Route path="addupad" element={<AddUpad />}></Route>
          <Route path="editupad" element={<EditUpad />}></Route>
          <Route path="viewlistsubmit" element={<ViewListSubmit />}></Route>
          <Route path="addsubmit" element={<AddSubmit />}></Route>
          <Route path="editsubmit" element={<EditSubmit />}></Route>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
