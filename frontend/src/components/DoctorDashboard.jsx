import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function DoctorDashboard({ contract }) {
  const [isDoctor, setIsDoctor] = useState(false);
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this application!");
        navigate("/");
        return;
      }

      if (!contract) {
        console.log("Waiting for contract initialization...");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // Use the roles mapping directly instead of getUserRole
        const role = await contract.roles(address);
        
        if (Number(role) === 2) { // 2 represents Doctor role
          setIsDoctor(true);
        } else {
          alert("Access denied: You are not registered as a doctor.");
          navigate("/");
        }
      } catch (error) {
        console.error("Doctor status check error:", error);
        if (error.code === 4001) {
          alert("Please connect MetaMask to continue.");
        } else if (error.message.includes("user rejected")) {
          alert("Please accept the connection request in MetaMask.");
        } else {
          alert("Error checking doctor status. Please make sure MetaMask is connected to the correct network.");
        }
        navigate("/");
      }
    };

    checkRole();
  }, [contract, navigate]);

  if (!isDoctor) {
    return (
      <div className="text-center">
        <Logo />
        <h4>You are not registered as a doctor.</h4>
        
      </div>
    );
  }

  return (
    <div className="text-center">
      <Logo />
      <h2>Doctor Dashboard</h2>
      <p><strong>Connected:</strong> {account}</p>
      <div className="d-grid gap-3 col-6 mx-auto mt-4">
        <Link className="btn btn-primary" to="/check-access">Check Patient Access</Link>
      </div>
      <Link to="/" className="btn btn-link mt-3">← Home</Link>
    </div>
  );
}

export default DoctorDashboard;
