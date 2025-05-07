const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("MedicalRecordAccess");
  const medicalRecord = await Contract.deploy(); // ✅ no need for .deployed()
  console.log(`✅ MedicalRecordAccess deployed at: ${medicalRecord.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
