//webapp/src/App.js

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import ClaimForm from "./components/ClaimForm";
import NFTDisplay from "./components/NFTDisplay";
import contractConfig from "./contractConfig";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [receiptData, setReceiptData] = useState(null);
  const [error, setError] = useState(null);
  const [tokenURI, setTokenURI] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMintingComplete, setIsMintingComplete] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const _provider = new Web3Provider(window.ethereum);
        setProvider(_provider);
        setConnected(true); // Add this line to update the connected state
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet provider.");
    }
  };

  const claimNFT = async (nric) => {
    try {
      if (!provider) {
        setError("Please connect your wallet first.");
        return;
      }

      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const response = await fetch(`${apiUrl}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nric,
          wallet_address: walletAddress,
        }),
      });

      if (!response.ok) {
        setError("Unable to claim NFT. Please try again later.");
        return;
      }

      const data = await response.json();
      setReceiptData({ receipt: data.receipt, tokenId: data.tokenId });

      const contract = new ethers.Contract(
        contractConfig.contractAddress,
        contractConfig.contractABI,
        signer
      );

      const metadataUrl = `${contractConfig.nftMetadataURI.replace(
        "{id}",
        data.tokenId
      )}`;

      console.log(
        "Minting NFT with walletAddress:",
        walletAddress,
        "metadataUrl:",
        metadataUrl,
        "tokenURI:",
        data.tokenId
      );
      
      const tx = await contract.mintNFT(
        walletAddress,
        data.tokenId,
        metadataUrl,
        {
          gasLimit: 300000,
        }
      );
      await provider.waitForTransaction(tx.hash);

      // Fetch token URI after minting is confirmed
      const contractAfterMint = new ethers.Contract(
        contractConfig.contractAddress,
        contractConfig.contractABI,
        provider
      );
      const tokenId = parseInt(data.tokenId); // Convert tokenId to an integer
      console.log("TokenId:", tokenId);
      const tokenURI = await contractAfterMint.tokenURI(tokenId);
      console.log("TokenURI:", tokenURI);
      setTokenURI(tokenURI);

      setIsMintingComplete(true);
    } catch (error) {
      setError("Error claiming NFT: " + error.message);
    }
  };

  const handleClaimFormSubmit = (nric) => {
    claimNFT(nric);
  };

  return (
    <div className="app-container">
      <h1>Claim NFT</h1>
      <button onClick={connectWallet} className="form-btn">
        Connect
      </button>
      <ClaimForm onSubmit={handleClaimFormSubmit} disabled={!connected} />
      {connected && <p>Wallet connected.</p>}

      {error && <p className="error">Error: {error}</p>}
      <NFTDisplay tokenURI={tokenURI} />
    </div>
  );
};

export default App;
