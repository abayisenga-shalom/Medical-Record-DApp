import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function PatientDataAccess({ contract, account }) {
  const [patientAddress, setPatientAddress] = useState("");
  const [accessStatus, setAccessStatus] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const navigate = useNavigate();

  const checkAccessStatus = async () => {
    if (!patientAddress) {
      alert("Please enter patient's address");
      return;
    }

    try {
      const hasAccess = await contract.hasAccess(account, patientAddress);
      setAccessStatus(hasAccess);
      setHasChecked(true);
    } catch (error) {
      console.error("Check access error:", error);
      alert("Failed to check access status. Please try again.");
    }
  };

  const handleViewRecords = () => {
    sessionStorage.setItem('currentPatientAddress', patientAddress);
    navigate('/view-patient-records');  
  };

  const handleAddDiagnosis = () => {
    sessionStorage.setItem('currentPatientAddress', patientAddress);
    navigate('/add-record');
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Access Patient Data</h4>
            
            {!hasChecked && (
              <div>
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
              </div>
            )}

            {hasChecked && (
              <div>
                <div className={`alert ${accessStatus ? 'alert-success' : 'alert-danger'}`}>
                  {accessStatus 
                    ? "✅ You have access to this patient's records" 
                    : "❌ You do not have access to this patient's records"}
                </div>

                {accessStatus && (
                  <div className="d-grid gap-3 mt-4">
                    <button className="btn btn-info" onClick={handleViewRecords}>
                      View Patient Records
                    </button>
                    <button className="btn btn-success" onClick={handleAddDiagnosis}>
                      Add New Diagnosis
                    </button>
                  </div>
                )}

                <button
                  className="btn btn-secondary mt-4 w-100"
                  onClick={() => {
                    setHasChecked(false);
                    setAccessStatus(null);
                    setPatientAddress("");
                  }}
                >
                  Check Another Patient
                </button>
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

export default PatientDataAccess;