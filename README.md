# 🏥 Medical Record DApp – Decentralized Medical Records Sharing Application

**Medical Record DApp** is a decentralized application (DApp) built on Ethereum that enables secure, transparent, and patient-controlled access to medical records. Patients manage access to their data, and doctors can view/update only with authorization.

---

## 📚 Table of Contents

1. [🚀 Features](#-features)  
2. [🧑‍💻 Tech Stack](#-tech-stack)  
3. [📁 Project Structure](#-project-structure)  
4. [🔄 System Flowchart](#-system-flowchart)  
5. [🔧 Setup & Installation](#-setup--installation)  
6. [📸 Screenshots (Optional)](#-screenshots-optional)  
7. [🧩 Future Enhancements](#-future-enhancements)  
8. [🧑‍💻 Author](#-author)  
9. [🪙 License](#-license)

---

## 🚀 Features

- **Patient Registration**: Register as a patient using MetaMask.
- **Doctor Registration**: Doctors can sign up to access permitted data.
- **Grant/Revoke Access**: Patients control who sees their records.
- **Add Diagnosis**: Doctors securely add medical records.
- **View Records**: Patients and doctors access medical history with permission.
- **Blockchain Secured**: All actions are managed through Ethereum smart contracts.

---

## 🧑‍💻 Tech Stack

| Layer         | Technology                             |
|---------------|-----------------------------------------|
| Frontend      | React, React Router, Bootstrap          |
| Web3 Library  | [Ethers.js v6](https://docs.ethers.org/v6/) |
| Smart Contract| Solidity (Ethereum testnet)             |
| Styling       | Bootstrap 5 + Bootstrap Icons           |
| Wallet Support| MetaMask                                |

---

## 📁 Project Frontend Structure

```bash

├── components/
│   ├── RegisterPatient.js
│   ├── RegisterDoctor.js
│   ├── PatientDashboard.js
│   ├── DoctorDashboard.js
│   ├── GrantAccess.js
│   ├── RevokeAccess.js
│   ├── AddDiagnosis.js
│   ├── ViewRecords.js
│   ├── ViewPatientRecords.js
│   ├── PatientDataAccess.js
│   └── Logo.js
├── config.js           # Contract address and ABI
├── App.js              # Main application routing and logic
├── index.js
└── README.md


🔄 System Flowchart

graph TD
    A[Patient] -->|Registers| B[Smart Contract]
    B --> C{Access Control}
    C -->|Grants Access| D[Doctor]
    C -->|Revokes Access| E[Doctor Denied]
    D -->|Adds Diagnosis| F[Medical Record]
    A -->|Views Records| F
    D -->|Views Records| F
