// contractUtils.js
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config.js";

export async function getContractInstance() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Verify contract initialization
    if (!contract || !contract.functions) {
      throw new Error("Contract initialization failed");
    }

    return contract;
  } catch (error) {
    console.error("Contract initialization error:", error);
    throw error;
  }
}
