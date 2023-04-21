// test-tokenURI.js
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const NRICClaimNFT = await ethers.getContractFactory("NRICClaimNFT");

  // Attach to the deployed contract
  const contract = NRICClaimNFT.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  // Get signers
  const signers = await ethers.getSigners();

  for (let i = 0; i < 5; i++) {
    const signer = signers[i];
    const tokenId = i + 1;
    const metadataUrl = `http://localhost:8080/metadata/${tokenId}`;
    await contract.connect(signer).mintNFT(signer.address, tokenId, metadataUrl);
    console.log(`NFT with token ID ${tokenId} minted by wallet ${signer.address}`);

    // Fetch the token URI for the minted NFT
    const fetchedTokenURI = await contract.getTokenURI(tokenId);
    console.log(`Fetched token URI for token ID ${tokenId}:`, fetchedTokenURI);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
