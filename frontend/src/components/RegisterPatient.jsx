// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "./Logo";

// function RegisterPatient({ contract }) {
//   const [account, setAccount] = useState("");
//   const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
//   const navigate = useNavigate(); // Add this line to initialize the navigate function

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (!window.ethereum) return alert("Install MetaMask");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//     };
//     connectWallet();
//   }, []);

//   const handleRegister = async () => {
//     if (!contract) {
//       alert("Smart contract not initialized. Please make sure you're connected to the correct network.");
//       return;
//     }
    
//     if (!account) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     const { name } = patientData;
//     if (!name) {
//       alert("Name is required.");
//       return;
//     }

//     try {
//       // Check user's current role first
//       const role = await contract.roles(account);
//       if (Number(role) === 2) { // 2 represents Doctor role
//         alert("You are already registered as a doctor. You cannot register as a patient.");
//         navigate("/doctor-dashboard");
//         return;
//       } else if (Number(role) === 1) { // 1 represents Patient role
//         alert("You are already registered as a patient!");
//         navigate("/patient-dashboard");
//         return;
//       }

//       const tx = await contract.registerAsPatient(name);
//       alert("Registration in progress... Please wait for confirmation.");
//       const receipt = await tx.wait();

//       const event = receipt.logs.find(log => log.fragment?.name === "PatientRegistered");
//       if (event) {
//         const patientAddress = event.args[0];
//         console.log("📢 PatientRegistered:", patientAddress);
//         alert("✅ Registration successful!");
//         navigate("/patient-dashboard");
//       } else {
//         console.log("No PatientRegistered event found.");
//       }
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       alert("Registration failed. Please make sure you're connected to the correct network.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Logo />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-lg rounded-4">
//             <h4 className="mb-4 text-center">Register as Patient</h4>
//             <div className="form-group">
//               <label>Name:</label>
//               <input className="form-control" value={patientData.name} onChange={(e) => setPatientData({ ...patientData, name: e.target.value })} placeholder="Enter full name" />
//             </div>
//             <div className="form-group mt-3">
//               <label>Gender:</label>
//               <select className="form-control" value={patientData.gender} onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}>
//                 <option disabled value="">Select Gender</option>
//                 <option value='Male'>Male</option>
//                 <option value='Female'>Female</option>
//                 <option value='Other'>Other</option>
//               </select>
//             </div>
//             <div className="form-group mt-3">
//               <label>Age:</label>
//               <input className="form-control" type="number" value={patientData.age} onChange={(e) => setPatientData({ ...patientData, age: e.target.value })} placeholder="Enter age" />
//             </div>
//             <button className="btn btn-primary mt-4 w-100" onClick={handleRegister}>Register</button>
//             <Link to="/" className="btn btn-link mt-3">← Home</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPatient;



// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "./Logo";

// function RegisterPatient({ contract }) {
//   const [account, setAccount] = useState("");
//   const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (!window.ethereum) return alert("Install MetaMask");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//     };
//     connectWallet();
//   }, []);

//   const handleRegister = async () => {
//     if (!contract) {
//       alert("Smart contract not initialized. Please make sure you're connected to the correct network.");
//       return;
//     }

//     if (!account) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     const { name, gender, age } = patientData;

//     if (!name || !gender || !age) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       // Check user's current role first
//       const role = await contract.roles(account);
//       if (Number(role) === 2) {
//         alert("You are already registered as a doctor. You cannot register as a patient.");
//         navigate("/doctor-dashboard");
//         return;
//       } else if (Number(role) === 1) {
//         alert("You are already registered as a patient!");
//         navigate("/patient-dashboard");
//         return;
//       }

//       // Pass all required arguments: name, gender, age (as number)
//       const tx = await contract.registerAsPatient(name, gender, Number(age));
//       alert("Registration in progress... Please wait for confirmation.");
//       const receipt = await tx.wait();

//       const event = receipt.logs.find(log => log.fragment?.name === "PatientRegistered");
//       if (event) {
//         const patientAddress = event.args[0];
//         console.log("📢 PatientRegistered:", patientAddress);
//         alert("✅ Registration successful!");
//         navigate("/patient-dashboard");
//       } else {
//         console.log("No PatientRegistered event found.");
//       }
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       alert("Registration failed. Please make sure you're connected to the correct network.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Logo />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-lg rounded-4">
//             <h4 className="mb-4 text-center">Register as Patient</h4>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 className="form-control"
//                 value={patientData.name}
//                 onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
//                 placeholder="Enter full name"
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Gender:</label>
//               <select
//                 className="form-control"
//                 value={patientData.gender}
//                 onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
//               >
//                 <option disabled value="">Select Gender</option>
//                 <option value='Male'>Male</option>
//                 <option value='Female'>Female</option>
//                 <option value='Other'>Other</option>
//               </select>
//             </div>
//             <div className="form-group mt-3">
//               <label>Age:</label>
//               <input
//                 className="form-control"
//                 type="number"
//                 value={patientData.age}
//                 onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
//                 placeholder="Enter age"
//               />
//             </div>
//             <button className="btn btn-primary mt-4 w-100" onClick={handleRegister}>Register</button>
//             <Link to="/" className="btn btn-link mt-3">← Home</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPatient;


// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "./Logo";
// import { Alert, Spinner } from "react-bootstrap";

// function RegisterPatient({ contract }) {
//   const [account, setAccount] = useState("");
//   const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (!window.ethereum) {
//         setError("Please install MetaMask");
//         return;
//       }
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);
//       } catch (err) {
//         setError("Failed to connect wallet");
//       }
//     };
//     connectWallet();
//   }, []);

//   const handleRegister = async () => {
//     if (!contract) {
//       setError("Smart contract not initialized");
//       return;
//     }

//     if (!account) {
//       setError("Please connect your wallet first");
//       return;
//     }

//     const { name, gender, age } = patientData;

//     if (!name || !gender || !age) {
//       setError("Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       // Check user's current role first
//       const role = await contract.roles(account);
//       if (Number(role) === 2) {
//         setError("You are already registered as a doctor");
//         navigate("/doctor-dashboard");
//         return;
//       } else if (Number(role) === 1) {
//         setError("You are already registered as a patient");
//         navigate("/patient-dashboard");
//         return;
//       }

//       // Register patient
//       const tx = await contract.registerAsPatient(name, gender, Number(age));
//       setSuccess("Registration in progress... Please wait for confirmation");
      
//       const receipt = await tx.wait();
//       const event = receipt.logs.find(log => log.fragment?.name === "PatientRegistered");
      
//       if (event) {
//         setSuccess("✅ Registration successful!");
//         // Reset form
//         setPatientData({ name: "", gender: "", age: "" });
//         // Redirect after 2 seconds
//         setTimeout(() => navigate("/patient-dashboard"), 2000);
//       } else {
//         setError("Registration completed but no confirmation event found");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.reason || "Registration failed. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Logo />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-lg rounded-4">
//             <h4 className="mb-4 text-center">Register as Patient</h4>
            
//             {/* Success Message */}
//             {success && (
//               <Alert variant="success" onClose={() => setSuccess("")} dismissible>
//                 {success}
//               </Alert>
//             )}
            
//             {/* Error Message */}
//             {error && (
//               <Alert variant="danger" onClose={() => setError("")} dismissible>
//                 {error}
//               </Alert>
//             )}

//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 className="form-control"
//                 value={patientData.name}
//                 onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
//                 placeholder="Enter full name"
//                 disabled={loading}
//               />
//             </div>
            
//             <div className="form-group mt-3">
//               <label>Gender:</label>
//               <select
//                 className="form-control"
//                 value={patientData.gender}
//                 onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
//                 disabled={loading}
//               >
//                 <option disabled value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
            
//             <div className="form-group mt-3">
//               <label>Age:</label>
//               <input
//                 className="form-control"
//                 type="number"
//                 value={patientData.age}
//                 onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
//                 placeholder="Enter age"
//                 disabled={loading}
//               />
//             </div>
            
//             <button 
//               className="btn btn-primary mt-4 w-100" 
//               onClick={handleRegister}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Registering...
//                 </>
//               ) : (
//                 "Register"
//               )}
//             </button>
            
//             <Link to="/" className="btn btn-link mt-3">
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPatient;


// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "./Logo";
// import { Alert, Spinner } from "react-bootstrap";

// function RegisterPatient({ contract }) {
//   const [account, setAccount] = useState("");
//   const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (!window.ethereum) {
//         setError("Please install MetaMask");
//         return;
//       }
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);
//       } catch (err) {
//         setError("Failed to connect wallet");
//       }
//     };
//     connectWallet();
//   }, []);

//   const handleRegister = async () => {
//     if (!contract) {
//       setError("Smart contract not initialized");
//       return;
//     }

//     if (!account) {
//       setError("Please connect your wallet first");
//       return;
//     }

//     const { name, gender, age } = patientData;

//     if (!name || !gender || !age) {
//       setError("Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       // Check user's current role first
//       const role = await contract.roles(account);
//       if (Number(role) === 2) {
//         setError("You are already registered as a doctor");
//         navigate("/doctor-dashboard");
//         return;
//       } else if (Number(role) === 1) {
//         setError("You are already registered as a patient");
//         navigate("/patient-dashboard");
//         return;
//       }

//       // Register patient
//       const tx = await contract.registerAsPatient(name, gender, Number(age));
//       setSuccess("Registration in progress... Please wait for confirmation");
      
//       const receipt = await tx.wait();
//       const event = receipt.logs.find(log => log.fragment?.name === "PatientRegistered");
      
//       if (event) {
//         const PatientAddress = event.args[0];
//         console.log("📢 PatientRegistered:", PatientAddress);
//         alert("✅ Registration successful!");
//         navigate("/patient-dashboard");
//         // setSuccess("✅ Registration successful!");
//         // // Reset form
//         // setPatientData({ name: "", gender: "", age: "" });
//         // // Redirect after 2 seconds
//         // setTimeout(() => navigate("/patient-dashboard"), 2000);
//       } else {
//         setError(" no confirmation event found");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.reason || "Registration failed. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Logo />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-lg rounded-4">
//             <h4 className="mb-4 text-center">Register as Patient</h4>
            
//             {/* Success Message */}
//             {success && (
//               <Alert variant="success" onClose={() => setSuccess("")} dismissible>
//                 {success}
//               </Alert>
//             )}
            
//             {/* Error Message */}
//             {error && (
//               <Alert variant="danger" onClose={() => setError("")} dismissible>
//                 {error}
//               </Alert>
//             )}

//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 className="form-control"
//                 value={patientData.name}
//                 onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
//                 placeholder="Enter full name"
//                 disabled={loading}
//               />
//             </div>
            
//             <div className="form-group mt-3">
//               <label>Gender:</label>
//               <select
//                 className="form-control"
//                 value={patientData.gender}
//                 onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
//                 disabled={loading}
//               >
//                 <option disabled value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
            
//             <div className="form-group mt-3">
//               <label>Age:</label>
//               <input
//                 className="form-control"
//                 type="number"
//                 value={patientData.age}
//                 onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
//                 placeholder="Enter age"
//                 disabled={loading}
//               />
//             </div>
            
//             <button 
//               className="btn btn-primary mt-4 w-100" 
//               onClick={handleRegister}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Registering...
//                 </>
//               ) : (
//                 "Register"
//               )}
//             </button>
            
//             <Link to="/" className="btn btn-link mt-3">
//               ← Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPatient;




// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Logo from "./Logo";

// function RegisterPatient({ contract }) {
//   const [account, setAccount] = useState("");
//   const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
//   const [isRegistering, setIsRegistering] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const connectWallet = async () => {
//       if (!window.ethereum) return alert("Install MetaMask");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);
//     };
//     connectWallet();
//   }, []);

//   const handleRegister = async () => {
//     if (!contract) {
//       alert("Smart contract not initialized. Please make sure you're connected to the correct network.");
//       return;
//     }

//     if (!account) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     const { name, gender, age } = patientData;

//     if (!name || !gender || !age) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setIsRegistering(true);

//     try {
//       const role = await contract.roles(account);
//       if (Number(role) === 2) {
//         alert("You are already registered as a doctor. You cannot register as a patient.");
//         navigate("/doctor-dashboard");
//         return;
//       } else if (Number(role) === 1) {
//         alert("You are already registered as a patient!");
//         navigate("/patient-dashboard");
//         return;
//       }

//       const tx = await contract.registerAsPatient(name, gender, Number(age));
//       alert("Registration in progress... Please wait for confirmation.");
//       const receipt = await tx.wait();

//       const event = receipt.logs.find(log => log.fragment?.name === "PatientRegistered");
//       if (event) {
//         const patientAddress = event.args[0];
//         console.log("📢 PatientRegistered:", patientAddress);
//         alert("✅ Registration successful!");
        
//         // Clear form and force full page reload before navigation
//         setPatientData({ name: "", gender: "", age: "" });
//         window.location.reload(); // Full page reload
//         navigate("/patient-dashboard"); // Then navigate
//       } else {
//         console.log("No PatientRegistered event found.");
//       }
//     } catch (err) {
//       console.error("❌ Registration error:", err);
//       alert(`Registration failed: ${err.message}`);
//     } finally {
//       setIsRegistering(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Logo />
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-lg rounded-4">
//             <h4 className="mb-4 text-center">Register as Patient</h4>
//             <div className="form-group">
//               <label>Name:</label>
//               <input
//                 className="form-control"
//                 value={patientData.name}
//                 onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
//                 placeholder="Enter full name"
//                 disabled={isRegistering}
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Gender:</label>
//               <select
//                 className="form-control"
//                 value={patientData.gender}
//                 onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
//                 disabled={isRegistering}
//               >
//                 <option disabled value="">Select Gender</option>
//                 <option value='Male'>Male</option>
//                 <option value='Female'>Female</option>
//                 <option value='Other'>Other</option>
//               </select>
//             </div>
//             <div className="form-group mt-3">
//               <label>Age:</label>
//               <input
//                 className="form-control"
//                 type="number"
//                 value={patientData.age}
//                 onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
//                 placeholder="Enter age"
//                 disabled={isRegistering}
//               />
//             </div>
//             <button 
//               className="btn btn-primary mt-4 w-100" 
//               onClick={handleRegister}
//               disabled={isRegistering}
//             >
//               {isRegistering ? "Registering..." : "Register"}
//             </button>
//             <Link to="/" className="btn btn-link mt-3">← Home</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPatient;

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./Logo";

function RegisterPatient({ contract }) {
  const [account, setAccount] = useState("");
  const [patientData, setPatientData] = useState({ name: "", gender: "", age: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Connect wallet on component mount
  useEffect(() => {
    const connectWallet = async () => {
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    };
    connectWallet();
  }, []);

  const handleRegister = async () => {
    // Validation checks
    if (!contract) return alert("Contract not connected");
    if (!account) return alert("Wallet not connected");
    if (!patientData.name || !patientData.gender || !patientData.age) {
      return alert("Please fill all fields");
    }

    setIsRegistering(true);

    try {
      // Check existing role
      const role = await contract.roles(account);
      if (Number(role) === 2) {
        alert("Already registered as doctor");
        return navigate("/doctor-dashboard");
      }
      if (Number(role) === 1) {
        alert("Already registered as patient");
        return navigate("/patient-dashboard");
      }

      // Execute registration
      const tx = await contract.registerAsPatient(
        patientData.name,
        patientData.gender,
        Number(patientData.age)
      );
      
      await tx.wait();
      alert("Registration successful!");
      navigate("/patient-dashboard"); // Primary navigation point

    } catch (err) {
      alert(`Registration failed: ${err.message}`);
      console.error("Registration error:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container mt-5">
      <Logo />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg rounded-4">
            <h4 className="mb-4 text-center">Patient Registration</h4>
            
            {/* Name Field */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-control"
                value={patientData.name}
                onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                disabled={isRegistering}
              />
            </div>

            {/* Gender Field */}
            <div className="form-group mt-3">
              <label>Gender</label>
              <select
                className="form-control"
                value={patientData.gender}
                onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                disabled={isRegistering}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age Field */}
            <div className="form-group mt-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                value={patientData.age}
                onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                disabled={isRegistering}
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-100 mt-4"
              onClick={handleRegister}
              disabled={isRegistering}
            >
              {isRegistering ? "Processing..." : "Register"}
            </button>

            <Link to="/" className="btn btn-link mt-3 w-100">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPatient;