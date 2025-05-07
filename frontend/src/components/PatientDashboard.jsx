import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function PatientDashboard({ contract, account }) {
  const [isPatient, setIsPatient] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPatientStatus = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this application!");
        navigate("/");
        return;
      }

      if (!contract || !account) {
        console.log("Waiting for contract and account initialization...");
        return;
      }

      try {
        // Use the roles mapping directly instead of getUserRole
        const role = await contract.roles(account);
        if (Number(role) === 1) { // 1 represents Patient role
          setIsPatient(true);
        } else {
          alert("Access denied: You are not registered as a patient.");
          navigate("/");
        }
      } catch (error) {
        console.error("Patient status check error:", error);
        if (error.code === 4001) {
          alert("Please connect MetaMask to continue.");
        } else if (error.message.includes("user rejected")) {
          alert("Please accept the connection request in MetaMask.");
        } else {
          alert("Error checking patient status. Please make sure MetaMask is connected to the correct network.");
        }
        navigate("/");
      }
    };

    checkPatientStatus();
  }, [account, contract, navigate]);

  if (!isPatient) {
    return (
      <div className="text-center">
        <Logo />
        <h4>You are not registered as a patient.</h4>
        <Link to="/register-patient" className="btn btn-primary mt-3">Register as Patient</Link>
        <br />
        <Link to="/" className="btn btn-link mt-2">← Home</Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Logo />
      <h2>Patient Dashboard</h2>
      <p><strong>Connected:</strong> {account}</p>
      <div className="d-grid gap-3 col-6 mx-auto mt-4">
        <Link className="btn btn-warning" to="/grant-access">Grant Access to Doctor</Link>
        <Link className="btn btn-danger" to="/revoke-access">Revoke Access</Link>
        <Link className="btn btn-info" to="/view-records">View Your Records</Link>
      </div>
      <Link to="/" className="btn btn-link mt-3">← Home</Link>
    </div>
  );
}

export default PatientDashboard;

