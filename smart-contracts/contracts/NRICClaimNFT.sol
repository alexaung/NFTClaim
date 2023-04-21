// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NRICClaimNFT is ERC721URIStorage {
    mapping(address => bool) public hasMinted;
    uint256 public mintStart;
    uint256 public mintEnd;
    uint256 public maxSupply;
    uint256 public currentSupply;

    event Minted(address recipient, uint256 tokenId, string metadataUrl);

    constructor() ERC721("MyNFT", "MNFT") {
        mintStart = block.timestamp; // Set mintStart to the current block timestamp
        mintEnd = mintStart + 604800; // 1 week after mintStart
        maxSupply = 5;
        currentSupply = 0;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenURI(tokenId);
    }

    function mintNFT(address recipient, uint256 tokenId, string memory metadataUrl) public {
        require(block.timestamp >= mintStart && block.timestamp <= mintEnd, "Minting period is over");
        require(!hasMinted[msg.sender], "Wallet has already minted");
        require(currentSupply < maxSupply, "Max NFT supply reached");
        require(tokenId > 0 && tokenId <= maxSupply, "Invalid tokenId");

        currentSupply += 1;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, metadataUrl);

        string memory storedMetadataUrl = getTokenURI(tokenId);
        require(keccak256(abi.encodePacked(storedMetadataUrl)) == keccak256(abi.encodePacked(metadataUrl)), "Metadata URL not set correctly");

        // Add console logs for debugging
        console.log("Token URI for tokenId", tokenId, ":", storedMetadataUrl);

        emit Minted(recipient, tokenId, metadataUrl);

        hasMinted[msg.sender] = true;
    }

}
