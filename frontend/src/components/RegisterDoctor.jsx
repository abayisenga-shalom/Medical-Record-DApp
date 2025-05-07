import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function RegisterDoctor({ contract }) {
  const [account, setAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(true);
  const [doctorData, setDoctorData] = useState({ 
    name: "", 
    specialization: "" 
  });
  const navigate = useNavigate();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask to use this application!");
          navigate("/");
          return;
        }

        setIsConnecting(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.");
      } finally {
        setIsConnecting(false);
      }
    };
    connectWallet();
  }, [navigate]);

  const handleRegister = async () => {
    if (!contract) {
      alert("Smart contract not initialized. Please make sure you're connected to the correct network.");
      return;
    }
    
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    const { name, specialization } = doctorData;
    if (!name || !specialization) {
      alert("All fields are required.");
      return;
    }

    try {
      // Check user's current role first
      const role = await contract.roles(account);
      if (Number(role) === 1) { // 1 represents Patient role
        alert("You are already registered as a patient. You cannot register as a doctor.");
        navigate("/patient-dashboard");
        return;
      } else if (Number(role) === 2) { // 2 represents Doctor role
        alert("You are already registered as a doctor!");
        navigate("/doctor-dashboard");
        return;
      }

      const tx = await contract.registerAsDoctor(name, specialization);
      alert("Registration in progress... Please wait for confirmation.");
      const receipt = await tx.wait();

      const event = receipt.logs.find(log => log.fragment?.name === "DoctorRegistered");
      if (event) {
        const doctorAddress = event.args[0];
        console.log("📢 DoctorRegistered:", doctorAddress);
        alert("✅ Registration successful!");
        navigate("/doctor-dashboard");
      } else {
        console.log("No DoctorRegistered event found.");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert("Registration failed. Please make sure you're connected to the correct network.");
    }
  };

  if (isConnecting) {
    return (
      <div className="container mt-5 text-center">
        <Logo />
        <h4>Connecting to wallet...</h4>
        <p>Please make sure MetaMask is installed and unlocked</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Register as Doctor</h4>
            {account && (
              <p className="text-center text-muted mb-4">
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            )}
            <div className="form-group">
              <label>Name:</label>
              <input 
                className="form-control" 
                value={doctorData.name} 
                onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })} 
                placeholder="Enter full name" 
              />
            </div>
            <div className="form-group mt-3">
              <label>Specialization:</label>
              <input 
                className="form-control" 
                value={doctorData.specialization} 
                onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                placeholder="Enter specialization"
              />
            </div>
            <button 
              className="btn btn-success mt-4 w-100" 
              onClick={handleRegister}
              disabled={!account || !contract}
            >
              {!account ? "Connect Wallet" : "Register"}
            </button>
            <Link to="/" className="btn btn-link mt-3">← Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterDoctor;