// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserProvider, Contract } from "ethers";


// import Logo from "./components/Logo";
// import PatientDashboard from "./components/PatientDashboard";
// import DoctorDashboard from "./components/DoctorDashboard";
// import RegisterPatient from "./components/RegisterPatient";
// import RegisterDoctor from "./components/RegisterDoctor";
// // import GrantAccess from "./components/GrantAccess";
// // import AddRecord from "./components/AddRecord";
// // import ViewRecords from "./components/ViewRecords";
// // import RevokeAccess from "./components/RevokeAccess";


// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

// function App() {

//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//           setContract(instance);
//         } catch (err) {
//           console.error("⚠️ Contract load failed:", err);
//         }
//       } else {
//         alert("Please install MetaMask to use this DApp.");
//       }
//     };

//     init();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//         <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
//         <Route path="/register-patient" element={<RegisterPatient contract={contract}/>} />
//         <Route path="/register-doctor" element={<RegisterDoctor />} />
//         {/*<Route path="/grant-access" element={<GrantAccess />} />
//         <Route path="/revoke-access" element={<RevokeAccess />} />
//         <Route path="/add-record" element={<AddRecord />} />
//         <Route path="/view-records" element={<ViewRecords />} /> */}
//       </Routes>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div className="text-center container">
//       <Logo />
//       <h2>Welcome to the Medical Record DApp</h2>
//       <div className="d-grid gap-3 col-6 mx-auto mt-4">
//         <Link className="btn btn-primary mt-3" to="/patient-dashboard">Patient Dashboard</Link>
//         <Link className="btn btn-success mt-4" to="/doctor-dashboard">Doctor Dashboard</Link>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserProvider, Contract } from "ethers";

// import Logo from "./components/Logo";
// import PatientDashboard from "./components/PatientDashboard";
// import DoctorDashboard from "./components/DoctorDashboard";
// import RegisterPatient from "./components/RegisterPatient";
// import RegisterDoctor from "./components/RegisterDoctor";
// import PatientDataAccess from "./components/PatientDataAccess";

// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";
// import GrantAccess from "./components/GrantAccess";
// import RevokeAccess from "./components/RevokeAccess";
// import ViewRecords from "./components/ViewRecords";
// import AddDiagnosis from "./components/AddDiagnosis";
// import ViewPatientRecords from "./components/ViewPatientRecords";


// function App() {
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState("");

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
          
//           const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//           setContract(instance);

//           const address = await signer.getAddress();
//           setAccount(address);

//         } catch (err) {
//           console.error("⚠️ Contract load failed:", err);
//         }
//       } else {
//         alert("Please install MetaMask to use this DApp.");
//       }
//     };

//     init();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard contract={contract} account={account}/>} />
//         <Route path="/doctor-dashboard" element={<DoctorDashboard contract={contract}/>} />
//         <Route path="/register-patient" element={<RegisterPatient contract={contract}/>} />
//         <Route path="/register-doctor" element={<RegisterDoctor contract={contract}/>} />
//         <Route path="/grant-access" element={<GrantAccess contract={contract} account={account}/>} />
//         <Route path="/revoke-access" element={<RevokeAccess contract={contract} account={account}/>} />
//         <Route path="/view-records" element={<ViewRecords contract={contract} account={account}/>} />
//         <Route path="/view-patient-records" element={<ViewPatientRecords contract={contract} account={account}/>} />
//         <Route path="/check-access" element={<PatientDataAccess contract={contract} account={account}/>} />
//         <Route path="/add-record" element={<AddDiagnosis contract={contract} account={account}/>} />
//       </Routes>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div className="text-center container">
//       <Logo />
//       <h2>Welcome to the Medical Record DApp</h2>
//       <div className="d-grid gap-3 col-6 mx-auto mt-4">
//         <Link className="btn btn-primary" to="/register-patient">Register as Patient</Link>
//         <Link className="btn btn-primary" to="/patient-dashboard">Patient Dashboard</Link>
//         <Link className="btn btn-success mt-3" to="/register-doctor">Register as Doctor</Link>
//         <Link className="btn btn-success mt-3" to="/doctor-dashboard">Doctor Dashboard</Link>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserProvider, Contract } from "ethers";
import { Navbar, Nav, Container, Badge, Spinner } from "react-bootstrap";

import Logo from "./components/Logo";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import RegisterPatient from "./components/RegisterPatient";
import RegisterDoctor from "./components/RegisterDoctor";
import PatientDataAccess from "./components/PatientDataAccess";
import GrantAccess from "./components/GrantAccess";
import RevokeAccess from "./components/RevokeAccess";
import ViewRecords from "./components/ViewRecords";
import AddDiagnosis from "./components/AddDiagnosis";
import ViewPatientRecords from "./components/ViewPatientRecords";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const instance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          setContract(instance);

          const address = await signer.getAddress();
          setAccount(address);

        } catch (err) {
          console.error("⚠️ Contract load failed:", err);
        } finally {
          setLoading(false);
        }
      } else {
        alert("Please install MetaMask to use this DApp.");
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Logo width="40" height="40" className="d-inline-block align-top me-2" />
            MediChain
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/patient-dashboard" active={location.pathname === "/patient-dashboard"}>
                Patient
              </Nav.Link>
              <Nav.Link as={Link} to="/doctor-dashboard" active={location.pathname === "/doctor-dashboard"}>
                Doctor
              </Nav.Link>
            </Nav>
            {account && (
              <Nav>
                <Nav.Item>
                  <Badge bg="light" text="dark" className="p-2">
                    {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                  </Badge>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-dashboard" element={<PatientDashboard contract={contract} account={account} />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard contract={contract} account={account} />} />
          <Route path="/register-patient" element={<RegisterPatient contract={contract} account={account} />} />
          <Route path="/register-doctor" element={<RegisterDoctor contract={contract} account={account} />} />
          <Route path="/grant-access" element={<GrantAccess contract={contract} account={account} />} />
          <Route path="/revoke-access" element={<RevokeAccess contract={contract} account={account} />} />
          <Route path="/view-records" element={<ViewRecords contract={contract} account={account} />} />
          <Route path="/view-patient-records" element={<ViewPatientRecords contract={contract} account={account} />} />
          <Route path="/check-access" element={<PatientDataAccess contract={contract} account={account} />} />
          <Route path="/add-record" element={<AddDiagnosis contract={contract} account={account} />} />
        </Routes>
      </Container>

      <footer className="bg-dark text-white py-4 mt-auto d-flex flex-column">
        <Container>
          <div className="text-center ">
            <p className="mb-0">© 2023 MediChain - Blockchain Medical Records</p>
            <small>Secure, decentralized healthcare data management</small>
          </div>
        </Container>
      </footer>
    </>
  );
}

function Home() {
  return (
    <div className="text-center">
      <div className="py-5 mb-4 bg-light rounded-3">
        <Container fluid>
          <Logo width="120" height="120" className="mb-4" />
          <h1 className="display-5 fw-bold">Welcome to MediChain</h1>
          <p className="fs-5 col-md-8 mx-auto mb-4">
            A decentralized platform for secure and private medical record management
          </p>
        </Container>
      </div>

      <div className="row g-4 py-5 row-cols-1 row-cols-lg-2">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title h4">Patient Portal</h2>
              <p className="card-text">
                Manage your medical records, grant access to doctors, and view your complete health history.
              </p>
              <div className="d-grid gap-2">
                <Link className="btn btn-primary" to="/register-patient">
                  Register as Patient
                </Link>
                <Link className="btn btn-outline-primary" to="/patient-dashboard">
                  Patient Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title h4">Doctor Portal</h2>
              <p className="card-text">
                Access patient records with permission, add diagnoses, and provide better care.
              </p>
              <div className="d-grid gap-2">
                <Link className="btn btn-success" to="/register-doctor">
                  Register as Doctor
                </Link>
                <Link className="btn btn-outline-success" to="/doctor-dashboard">
                  Doctor Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;