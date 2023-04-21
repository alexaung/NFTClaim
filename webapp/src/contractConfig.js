// src/contractConfig.js
import NRICClaimNFT from '../src/NRICClaimNFT.json';

const contractABI = NRICClaimNFT.abi;

const contractConfig = {
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  nftMetadataURI: import.meta.env.VITE_NFT_METADATA_URI,
  accountAddress: import.meta.env.VITE_ACCOUNT_ADDRESS,
  accountPrivateKey: import.meta.env.VITE_ACCOUNT_PRIVATE_KEY,
  contractABI: contractABI
};

export default contractConfig;
