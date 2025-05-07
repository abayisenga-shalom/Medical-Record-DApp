import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function RevokeAccess({ contract, account }) {
  const [authorizedDoctors, setAuthorizedDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorizedDoctors = async () => {
      try {
        // Get the length of the patientDoctors array for the current patient
        const doctorAddresses = [];
        let index = 0;
        
        while (true) {
          try {
            const doctorAddress = await contract.patientDoctors(account, index);
            // Check if the doctor still has access
            const hasAccess = await contract.accessPermissions(account, doctorAddress);
            if (hasAccess) {
              doctorAddresses.push(doctorAddress);
            }
            index++;
          } catch (error) {
            // Break the loop when we reach the end of the array
            break;
          }
        }
        
        setAuthorizedDoctors(doctorAddresses);
      } catch (error) {
        console.error("Error fetching authorized doctors:", error);
      }
    };

    if (contract && account) {
      fetchAuthorizedDoctors();
    }
  }, [contract, account]);

  const handleRevokeAccess = async (doctorAddress) => {
    try {
      const tx = await contract.revokeAccess(doctorAddress);
      alert("Revoking access... Please wait for confirmation.");
      await tx.wait();
      alert("✅ Access revoked successfully!");
      
      // Refresh the list
      const updatedDoctors = authorizedDoctors.filter(doc => doc !== doctorAddress);
      setAuthorizedDoctors(updatedDoctors);
    } catch (error) {
      console.error("Revoke access error:", error);
      alert("Failed to revoke access. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Revoke Doctor Access</h4>
            {authorizedDoctors.length === 0 ? (
              <p className="text-center text-muted">No doctors have been granted access.</p>
            ) : (
              <div className="list-group">
                {authorizedDoctors.map((doctor) => (
                  <div key={doctor} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{doctor}</span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRevokeAccess(doctor)}
                    >
                      Revoke Access
                    </button>
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

export default RevokeAccess;