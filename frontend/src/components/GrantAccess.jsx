import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function GrantAccess({ contract, account }) {
  const [doctorAddress, setDoctorAddress] = useState("");
  const navigate = useNavigate();

  const handleGrantAccess = async () => {
    if (!doctorAddress) {
      alert("Please enter doctor's address");
      return;
    }

    try {
      const tx = await contract.grantAccess(doctorAddress);
      alert("Granting access... Please wait for confirmation.");
      await tx.wait();
      alert("✅ Access granted successfully!");
      navigate("/patient-dashboard");
    } catch (error) {
      console.error("Grant access error:", error);
      alert("Failed to grant access. Please check the doctor's address and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Grant Access to Doctor</h4>
            <div className="form-group">
              <label>Doctor's Ethereum Address:</label>
              <input
                className="form-control"
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
                placeholder="Enter doctor's address (0x...)"
              />
            </div>
            <button
              className="btn btn-warning mt-4 w-100"
              onClick={handleGrantAccess}
            >
              Grant Access
            </button>
            <Link to="/patient-dashboard" className="btn btn-link mt-3">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrantAccess;