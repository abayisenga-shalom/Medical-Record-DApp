import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function ViewRecords({ contract, account }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      if (!contract || !account) {
        setError("Please connect your wallet and ensure you're on the correct network.");
        setLoading(false);
        return;
      }

      try {
        // First check if the user is a registered patient
        const role = await contract.roles(account);
        if (Number(role) !== 1) { // 1 represents Patient role
          setError("Access denied: You are not registered as a patient.");
          setLoading(false);
          navigate("/");
          return;
        }

        const patientRecords = await contract.getDiagnoses(account);
        setRecords(patientRecords);
        setError(null);
      } catch (error) {
        console.error("Error fetching records:", error);
        if (error.code === 4001) {
          setError("Transaction rejected. Please approve the transaction in MetaMask.");
        } else if (error.message.includes("network")) {
          setError("Network error. Please make sure you're connected to the correct network.");
        } else if (error.message.includes("user rejected")) {
          setError("Please accept the connection request in MetaMask.");
        } else {
          setError("Failed to fetch medical records. Please check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [contract, account, navigate]);

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Your Medical Records</h4>
            {loading ? (
              <p className="text-center">Loading records...</p>
            ) : error ? (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            ) : records.length === 0 ? (
              <p className="text-center text-muted">No medical records found.</p>
            ) : (
              <div className="list-group">
                {records.map((record, index) => (
                  <div key={index} className="list-group-item">
                    <p className="mb-1">
                      <strong>Doctor Name:</strong> {record.doctorName || 'Unknown Doctor'}
                    </p>
                    <p className="mb-1">
                      <strong>Temperature:</strong> {record.temperature}
                    </p>
                    <p className="mb-1">
                      <strong>Weight:</strong> {record.weight}
                    </p>
                    <p className="mb-1">
                      <strong>Blood Pressure:</strong> {record.bloodPressure}
                    </p>
                    <p className="mb-1">
                      <strong>Diagnosis Details:</strong> {record.diagnosisDetails}
                    </p>
                    <p className="mb-1">
                      <strong>Treatment:</strong> {record.treatment}
                    </p>
                    <p className="mb-0">
                      <strong>Date:</strong> {new Date(Number(record.timestamp) * 1000).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link to="/patient-dashboard" className="btn btn-link mt-3">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRecords;