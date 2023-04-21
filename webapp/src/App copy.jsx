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
