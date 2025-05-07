// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.20;

// contract MedicalRecordAccess {
//     enum Role { None, Patient, Doctor }

//     struct PatientProfile {
//         string name;
//         string gender;
//         uint age;
//         bool exists;
//     }

//     struct DoctorProfile {
//         string name;
//         string specialty;
//         bool exists;
//     }

//     struct Diagnosis {
//         address doctor;
//         string doctorName;
//         string diagnosisDetails;
//         string temperature;
//         string weight;
//         string bloodPressure;
//         string treatment;
//         uint timestamp;
//     }

//     mapping(address => Role) public roles;
//     mapping(address => PatientProfile) public patients;
//     mapping(address => DoctorProfile) public doctors;
//     mapping(address => mapping(address => bool)) public accessPermissions;
//     mapping(address => Diagnosis[]) public diagnoses;
//     mapping(address => address[]) public patientDoctors;



//     event PatientRegistered(address patient, string name, string gender, uint256 age);
//     event DoctorRegistered(address indexed doctor);
//     // ---------------------------
//     // Patient Registration
//     // ---------------------------
//     function registerAsPatient(string calldata name, string calldata gender, uint age) external {
//         require(roles[msg.sender] == Role.None, "Already registered");
//         require(!patients[msg.sender].exists, "Patient already registered");

//         roles[msg.sender] = Role.Patient;
//         patients[msg.sender] = PatientProfile(name, gender, age, true);

//         emit PatientRegistered(msg.sender, name, gender, age);
//     }

//     // ---------------------------
//     // Doctor Registration
//     // ---------------------------
//     function registerAsDoctor(string calldata name, string calldata specialty) external {
//         require(roles[msg.sender] == Role.None, "Already registered");
//         require(!doctors[msg.sender].exists, "Doctor already registered");

//         roles[msg.sender] = Role.Doctor;
//         doctors[msg.sender] = DoctorProfile(name, specialty, true);

//         emit DoctorRegistered(msg.sender);
//     }

//     // ---------------------------
//     // Grant & Revoke Access
//     // ---------------------------

//     function getUserRole(address user) external view returns (Role) {
//         return roles[user];
//     }


//     function grantAccess(address doctor) external {
//         require(roles[msg.sender] == Role.Patient, "Only patients can grant access");
//         require(roles[doctor] == Role.Doctor, "Can only grant access to doctors");
//         require(doctors[doctor].exists, "Doctor not registered");

//         accessPermissions[msg.sender][doctor] = true;

//         bool alreadyAdded = false;
//         for (uint i = 0; i < patientDoctors[msg.sender].length; i++) {
//             if (patientDoctors[msg.sender][i] == doctor) {
//                 alreadyAdded = true;
//                 break;
//             }
//         }
//         if (!alreadyAdded) {
//             patientDoctors[msg.sender].push(doctor);
//         }

//     }

//     function hasAccess(address doctor, address patient) public view returns (bool) {
//         return accessPermissions[patient][doctor];
//     }
    
//     function getGrantedDoctors(address patient) external view returns (address[] memory) {
//         address[] memory all = patientDoctors[patient];
//         uint count = 0;

//         // First count valid ones
//         for (uint i = 0; i < all.length; i++) {
//             if (accessPermissions[patient][all[i]]) {
//                 count++;
//             }
//         }

//         // Populate filtered array
//         address[] memory granted = new address[](count);
//         uint index = 0;
//         for (uint i = 0; i < all.length; i++) {
//             if (accessPermissions[patient][all[i]]) {
//                 granted[index++] = all[i];
//             }
//         }

//         return granted;
//     }


//     function revokeAccess(address doctor) external {
//         require(roles[msg.sender] == Role.Patient, "Only patients can revoke access");
//         require(doctors[doctor].exists, "Doctor not registered");

//         accessPermissions[msg.sender][doctor] = false;
//     }

//     // ---------------------------
//     // Doctor Inputs Diagnosis
//     // ---------------------------
//     function addDiagnosis(
//         address patient,
//         string calldata diagnosisDetails,
//         string calldata temperature,
//         string calldata weight,
//         string calldata bloodPressure,
//         string calldata treatment
//     ) external {
//         require(roles[msg.sender] == Role.Doctor, "Only doctors can diagnose");
//         require(doctors[msg.sender].exists, "Doctor not registered");
//         require(patients[patient].exists, "Patient not registered");
//         require(accessPermissions[patient][msg.sender], "Access not granted by patient");

//         require(bytes(diagnosisDetails).length > 0, "Diagnosis details required");
//         require(bytes(treatment).length > 0, "Treatment required");

//         Diagnosis memory record = Diagnosis({
//             doctor: msg.sender,
//             doctorName: doctors[msg.sender].name,
//             diagnosisDetails: diagnosisDetails,
//             temperature: temperature,
//             weight: weight,
//             bloodPressure: bloodPressure,
//             treatment: treatment,
//             timestamp: block.timestamp
//         });

//         diagnoses[patient].push(record);

//         if (!isDoctorAlreadyAdded(patient, msg.sender)) {
//             patientDoctors[patient].push(msg.sender);
//         }
//     }

//     // 🔧 Helper to prevent duplicate doctor entry
//     function isDoctorAlreadyAdded(address patient, address doctor) private view returns (bool) {
//         address[] storage doctorList = patientDoctors[patient];
//         for (uint i = 0; i < doctorList.length; i++) {
//             if (doctorList[i] == doctor) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     // ---------------------------
//     // View Diagnosis History
//     // ---------------------------
//     function getDiagnoses(address patient) external view returns (Diagnosis[] memory) {
//         require(patients[patient].exists, "Patient not registered");
//         require(
//             msg.sender == patient || accessPermissions[patient][msg.sender],
//             "Access denied"
//         );
//         return diagnoses[patient];
//     }

//     // ---------------------------
//     // View Patient & Doctor Info
//     // ---------------------------
//     function getPatientProfile(address patient) external view returns (PatientProfile memory) {
//         require(patients[patient].exists, "Patient not registered");
//         return patients[patient];
//     }

//     function getDoctorProfile(address doctor) external view returns (DoctorProfile memory) {
//         require(doctors[doctor].exists, "Doctor not registered");
//         return doctors[doctor];
//     }
// }



pragma solidity ^0.8.20;

contract MedicalRecordAccess {
    enum Role { None, Patient, Doctor }

    struct PatientProfile {
        string name;
        string gender;
        uint age;
        bool exists;
    }

    struct DoctorProfile {
        string name;
        string specialty;
        bool exists;
    }

    struct Diagnosis {
        address doctor;
        string doctorName;
        string diagnosisDetails;
        string temperature;
        string weight;
        string bloodPressure;
        string treatment;
        uint timestamp;
    }

    mapping(address => Role) public roles;
    mapping(address => PatientProfile) public patients;
    mapping(address => DoctorProfile) public doctors;
    mapping(address => mapping(address => bool)) public accessPermissions;
    mapping(address => Diagnosis[]) public diagnoses;
    mapping(address => address[]) public patientDoctors;

    // event PatientRegistered(address patient, string name, string gender, uint256 age);

    event PatientRegistered(address indexed patient);

    event DoctorRegistered(address indexed doctor);

    // 🔹 Return the role of a user (None, Patient, Doctor)
    function getUserRole(address user) external view returns (Role) {
        return roles[user];
    }

    // ---------------------------
    // Patient Registration
    // ---------------------------
    function registerAsPatient(string calldata name, string calldata gender, uint age) external {
        require(roles[msg.sender] == Role.None, "Already registered");
        require(!patients[msg.sender].exists, "Patient already registered");

        roles[msg.sender] = Role.Patient;
        patients[msg.sender] = PatientProfile(name, gender, age, true);
        
        // emit PatientRegistered(msg.sender, name, gender, age);
        emit PatientRegistered(msg.sender);

    }

    // ---------------------------
    // Doctor Registration
    // ---------------------------
    function registerAsDoctor(string calldata name, string calldata specialty) external {
        require(roles[msg.sender] == Role.None, "Already registered");
        require(!doctors[msg.sender].exists, "Doctor already registered");

        roles[msg.sender] = Role.Doctor;
        doctors[msg.sender] = DoctorProfile(name, specialty, true);

        emit DoctorRegistered(msg.sender);
    }

    // ---------------------------
    // Grant & Revoke Access
    // ---------------------------
    function grantAccess(address doctor) external {
        require(roles[msg.sender] == Role.Patient, "Only patients can grant access");
        require(roles[doctor] == Role.Doctor, "Can only grant access to doctors");
        require(doctors[doctor].exists, "Doctor not registered");

        accessPermissions[msg.sender][doctor] = true;

        bool alreadyAdded = false;
        for (uint i = 0; i < patientDoctors[msg.sender].length; i++) {
            if (patientDoctors[msg.sender][i] == doctor) {
                alreadyAdded = true;
                break;
            }
        }
        if (!alreadyAdded) {
            patientDoctors[msg.sender].push(doctor);
        }
    }

    function revokeAccess(address doctor) external {
        require(roles[msg.sender] == Role.Patient, "Only patients can revoke access");
        require(doctors[doctor].exists, "Doctor not registered");

        accessPermissions[msg.sender][doctor] = false;
    }

    function hasAccess(address doctor, address patient) public view returns (bool) {
        return accessPermissions[patient][doctor];
    }

    function getGrantedDoctors(address patient) external view returns (address[] memory) {
        address[] memory all = patientDoctors[patient];
        uint count = 0;

        for (uint i = 0; i < all.length; i++) {
            if (accessPermissions[patient][all[i]]) {
                count++;
            }
        }

        address[] memory granted = new address[](count);
        uint index = 0;
        for (uint i = 0; i < all.length; i++) {
            if (accessPermissions[patient][all[i]]) {
                granted[index++] = all[i];
            }
        }

        return granted;
    }

    // ---------------------------
    // Doctor Inputs Diagnosis
    // ---------------------------
    function addDiagnosis(
        address patient,
        string calldata diagnosisDetails,
        string calldata temperature,
        string calldata weight,
        string calldata bloodPressure,
        string calldata treatment
    ) external {
        require(roles[msg.sender] == Role.Doctor, "Only doctors can diagnose");
        require(doctors[msg.sender].exists, "Doctor not registered");
        require(patients[patient].exists, "Patient not registered");
        require(accessPermissions[patient][msg.sender], "Access not granted by patient");

        require(bytes(diagnosisDetails).length > 0, "Diagnosis details required");
        require(bytes(treatment).length > 0, "Treatment required");

        Diagnosis memory record = Diagnosis({
            doctor: msg.sender,
            doctorName: doctors[msg.sender].name,
            diagnosisDetails: diagnosisDetails,
            temperature: temperature,
            weight: weight,
            bloodPressure: bloodPressure,
            treatment: treatment,
            timestamp: block.timestamp
        });

        diagnoses[patient].push(record);

        if (!isDoctorAlreadyAdded(patient, msg.sender)) {
            patientDoctors[patient].push(msg.sender);
        }
    }

    function isDoctorAlreadyAdded(address patient, address doctor) private view returns (bool) {
        address[] storage doctorList = patientDoctors[patient];
        for (uint i = 0; i < doctorList.length; i++) {
            if (doctorList[i] == doctor) {
                return true;
            }
        }
        return false;
    }

    // ---------------------------
    // View Diagnosis History
    // ---------------------------
    function getDiagnoses(address patient) external view returns (Diagnosis[] memory) {
        require(patients[patient].exists, "Patient not registered");
        require(
            msg.sender == patient || accessPermissions[patient][msg.sender],
            "Access denied"
        );
        return diagnoses[patient];
    }

    // ---------------------------
    // View Patient & Doctor Info
    // ---------------------------
    function getPatientProfile(address patient) external view returns (PatientProfile memory) {
        require(patients[patient].exists, "Patient not registered");
        return patients[patient];
    }

    function getDoctorProfile(address doctor) external view returns (DoctorProfile memory) {
        require(doctors[doctor].exists, "Doctor not registered");
        return doctors[doctor];
    }
}
