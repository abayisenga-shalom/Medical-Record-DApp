const { expect } = require("chai");

describe("MedicalRecordAccess", function () {
  let MedicalRecordAccess, contract, owner, patient1, patient2, doctor1, doctor2;

  beforeEach(async () => {
    [owner, patient1, patient2, doctor1, doctor2] = await ethers.getSigners();
    const MedicalRecordAccessFactory = await ethers.getContractFactory("MedicalRecordAccess");
    contract = await MedicalRecordAccessFactory.deploy(); 
  });
  

  it("should register a patient", async () => {
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 30);
    const profile = await contract.getPatientProfile(patient1.address);
    expect(profile.name).to.equal("Alice");
    expect(profile.age).to.equal(30);
  });

  it("should register a doctor", async () => {
    await contract.connect(doctor1).registerAsDoctor("Dr. Bob", "Cardiology");
    const profile = await contract.getDoctorProfile(doctor1.address);
    expect(profile.name).to.equal("Dr. Bob");
    expect(profile.specialty).to.equal("Cardiology");
  });

  it("patient should grant access to doctor", async () => {
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 30);
    await contract.connect(doctor1).registerAsDoctor("Dr. Bob", "Cardiology");

    await contract.connect(patient1).grantAccess(doctor1.address);
    const hasAccess = await contract.hasAccess(doctor1.address, patient1.address);
    expect(hasAccess).to.be.true;
  });

  it("doctor should add diagnosis for authorized patient", async () => {
    // Register both
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 28);
    await contract.connect(doctor1).registerAsDoctor("Dr. Smith", "Cardiology");
  
    // Grant access to doctor
    await contract.connect(patient1).grantAccess(doctor1.address);
  
    // Add diagnosis as doctor
    await contract.connect(doctor1).addDiagnosis(
      patient1.address,
      "Flu symptoms",
      "36.7",
      "65kg",
      "120/80",
      "Rest and hydration"
    );
  
    // Doctor tries to read diagnosis
    const diagnoses = await contract.connect(doctor1).getDiagnoses(patient1.address); // 👈 Use doctor1 here
  
    expect(diagnoses.length).to.equal(1);
    expect(diagnoses[0].diagnosisDetails).to.equal("Flu symptoms");
  });
  

  it("unauthorized doctor cannot add diagnosis", async () => {
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 30);
    await contract.connect(doctor1).registerAsDoctor("Dr. Bob", "Cardiology");

    await expect(
      contract.connect(doctor1).addDiagnosis(
        patient1.address,
        "Headache",
        "36.8°C",
        "65kg",
        "110/70",
        "Painkillers"
      )
    ).to.be.revertedWith("Access not granted by patient");
  });

  it("patient should revoke access", async () => {
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 30);
    await contract.connect(doctor1).registerAsDoctor("Dr. Bob", "Cardiology");
    await contract.connect(patient1).grantAccess(doctor1.address);
    await contract.connect(patient1).revokeAccess(doctor1.address);

    const hasAccess = await contract.hasAccess(doctor1.address, patient1.address);
    expect(hasAccess).to.be.false;
  });

  it("should return granted doctors", async () => {
    await contract.connect(patient1).registerAsPatient("Alice", "Female", 30);
    await contract.connect(doctor1).registerAsDoctor("Dr. Bob", "Cardiology");
    await contract.connect(doctor2).registerAsDoctor("Dr. Jane", "Neurology");

    await contract.connect(patient1).grantAccess(doctor1.address);
    await contract.connect(patient1).grantAccess(doctor2.address);
    await contract.connect(patient1).revokeAccess(doctor2.address);

    const granted = await contract.getGrantedDoctors(patient1.address);
    expect(granted.length).to.equal(1);
    expect(granted[0]).to.equal(doctor1.address);
  });
});
