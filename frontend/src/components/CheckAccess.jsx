import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function CheckAccess({ contract, account }) {
  const [patientAddress, setPatientAddress] = useState("");
  const [accessStatus, setAccessStatus] = useState(null);

  const checkAccessStatus = async () => {
    if (!patientAddress) {
      alert("Please enter patient's address");
      return;
    }

    try {
      const hasAccess = await contract.hasAccess(account, patientAddress);
      setAccessStatus(hasAccess);
    } catch (error) {
      console.error("Check access error:", error);
      alert("Failed to check access status. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Check Patient Access Status</h4>
            <div className="form-group">
              <label>Patient's Ethereum Address:</label>
              <input
                className="form-control"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Enter patient's address (0x...)"
              />
            </div>
            <button
              className="btn btn-primary mt-4 w-100"
              onClick={checkAccessStatus}
            >
              Check Access
            </button>
            
            {accessStatus !== null && (
              <div className={`alert mt-3 ${accessStatus ? 'alert-success' : 'alert-danger'}`}>
                {accessStatus 
                  ? "✅ You have access to this patient's records" 
                  : "❌ You do not have access to this patient's records"}
              </div>
            )}
            
            <Link to="/doctor-dashboard" className="btn btn-link mt-3">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckAccess;