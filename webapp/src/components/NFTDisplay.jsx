//webapp/src/components/ClaimForm.js

import React, { useEffect, useState } from "react";

const NFTDisplay = ({ tokenURI }) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (tokenURI) {
        try {
          const response = await fetch(tokenURI);
          const data = await response.json();
          console.log(data)
          setMetadata(data);
        } catch (error) {
          console.error("Error fetching metadata:", error);
          setMetadata(null);
        }
      } else {
        setMetadata(null);
      }
    };
    fetchMetadata();
  }, [tokenURI]);

  if (!metadata) {
    return <p>No NFT to display.</p>;
  }

  
  const imageUrl = metadata.image || "https://i.imgur.com/your-image-url.jpg";

  return (
    <div className="nft-display">
      <h2>NFT Metadata</h2>
      <img src={imageUrl} alt="NFT" className="nft-image" />
      <div className="nft-metadata">
        <h3>Name: {metadata.name}</h3>
        <p>Description: {metadata.description}</p>
      </div>
    </div>
  );
};

export default NFTDisplay;
