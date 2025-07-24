
import React, { useState } from "react";
import { auth, firestore } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
export const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(firestore, 'admin'), {
        // await setDoc(doc(firestore, 'users', name), {

        name,
        email,
        password,

        createdAt: serverTimestamp(),


      });
      alert('register successfully');
      navigate("/admindashboard/viewlistsubmit");
      setEmail("");
      setPassword("");
      setName("");

    }
    catch (e) {
      alert(e.message);
    }
  };
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };
  return (
    <div class="login-page-spacing">
      <form class="login-form" onSubmit={handleRegister}>
        <h2>Registration</h2>
        <input type="text" value={name} placeholder="name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />

        <div className="btn-wrapper">
          <button
            type="button"

            onClick={resetForm}
          >
            Cancel
          </button>
          <button type="submit" className="space-two-btn">Register</button>
        </div>

      </form>
    </div>
  )
}