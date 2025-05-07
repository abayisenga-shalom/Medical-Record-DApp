import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function AddDiagnosis({ contract, account }) {
  const [diagnosisData, setDiagnosisData] = useState({
    diagnosisDetails: "",
    temperature: "",
    weight: "",
    bloodPressure: "",
    treatment: ""
  });
  const [patientAddress, setPatientAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatientAddress = sessionStorage.getItem('currentPatientAddress');
    if (!storedPatientAddress) {
      alert("No patient selected. Please select a patient first.");
      navigate('/check-access');
      return;
    }
    setPatientAddress(storedPatientAddress);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contract || !account) {
      alert("Please connect your wallet and ensure contract is loaded");
      return;
    }

    const { diagnosisDetails, temperature, weight, bloodPressure, treatment } = diagnosisData;

    if (!diagnosisDetails || !treatment) {
      alert("Diagnosis details and treatment are required");
      return;
    }

    try {
      const tx = await contract.addDiagnosis(
        patientAddress,
        diagnosisDetails,
        temperature,
        weight,
        bloodPressure,
        treatment
      );
      alert("Adding diagnosis... Please wait for confirmation.");
      await tx.wait();
      alert("✅ Diagnosis added successfully!");
      navigate("/doctor-dashboard");
    } catch (error) {
      console.error("Add diagnosis error:", error);
      if (error.message.includes("Access not granted")) {
        alert("Error: You don't have permission to add diagnosis for this patient");
        navigate("/check-access");
      } else {
        alert("Failed to add diagnosis. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Add Patient Diagnosis</h4>
            <p className="text-center mb-4">
              <strong>Patient Address:</strong> {patientAddress}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Diagnosis Details:</label>
                <textarea
                  className="form-control"
                  value={diagnosisData.diagnosisDetails}
                  onChange={(e) => setDiagnosisData({ ...diagnosisData, diagnosisDetails: e.target.value })}
                  placeholder="Enter diagnosis details"
                  required
                  rows="3"
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label>Temperature:</label>
                  <input
                    className="form-control"
                    value={diagnosisData.temperature}
                    onChange={(e) => setDiagnosisData({ ...diagnosisData, temperature: e.target.value })}
                    placeholder="e.g., 37.5°C"
                  />
                </div>
                <div className="col">
                  <label>Weight:</label>
                  <input
                    className="form-control"
                    value={diagnosisData.weight}
                    onChange={(e) => setDiagnosisData({ ...diagnosisData, weight: e.target.value })}
                    placeholder="e.g., 70 kg"
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Blood Pressure:</label>
                <input
                  className="form-control"
                  value={diagnosisData.bloodPressure}
                  onChange={(e) => setDiagnosisData({ ...diagnosisData, bloodPressure: e.target.value })}
                  placeholder="e.g., 120/80"
                />
              </div>
              <div className="form-group mb-3">
                <label>Treatment Plan:</label>
                <textarea
                  className="form-control"
                  value={diagnosisData.treatment}
                  onChange={(e) => setDiagnosisData({ ...diagnosisData, treatment: e.target.value })}
                  placeholder="Enter treatment plan"
                  required
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Diagnosis
              </button>
            </form>
            <Link to="/check-access" className="btn btn-link mt-3">
              ← Back to Patient Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDiagnosis;