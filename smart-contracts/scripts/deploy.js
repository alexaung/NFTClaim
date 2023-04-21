// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // Import the NRICClaimNFT contract
  const NRICClaimNFT = await ethers.getContractFactory("NRICClaimNFT");
  
  // Deploy the NRICClaimNFT contract
  const nricClaimNFT = await NRICClaimNFT.deploy();
  
  // Wait for the NRICClaimNFT contract to be deployed
  await nricClaimNFT.deployed();
  
  console.log("NRICClaimNFT deployed to:", nricClaimNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
