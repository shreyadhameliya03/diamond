// src/Components/Login.jsx


import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../Firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Firebase Authentication login
      const res = await signInWithEmailAndPassword(auth, email, password);
      // const uid = res.user.uid;


      // const adminRef = doc(firestore, "admin", uid);
      // const docSnap = await getDoc(adminRef);

      // if (!docSnap.exists()) {
      //   // ✅ Add user to Firestore under 'admin'
      //   await setDoc(adminRef, {
      //     uid: uid,
      //     email: res.user.email,
      //     password: password,
      //     createdAt: serverTimestamp(),
      //   });
      //   alert("✅ Admin data added to Firestore");
      // } else {
      //   alert("🔁 Admin already exists in Firestore");
      // }

      alert("Login Success!");
      navigate("/admindashboard/viewlistsubmit");
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      alert("invalid user and password");
    }
  };
  const resetForm = () => {
    setEmail("");
    setPassword("");

  };
  return (
    <div class="login-page-spacing" >
      <form class="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <p class="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <div className="btn-wrapper">
          <button
            type="button"

            onClick={resetForm}
          >
            Cancel
          </button>
          <button type="submit" className="space-two-btn">Login</button>
        </div>
      </form>
    </div>
  );
};
