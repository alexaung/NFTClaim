# NFT Claiming DApp

A decentralized application for claiming NFTs using Ethereum blockchain. Built with Solidity, React, Go and Ethereum.

## Features

Connects to an Ethereum wallet using Metamask.
Displays an NFT metadata for the claimed NFT.
The claim data is stored in a smart contract on the Ethereum blockchain.
The backend API is built using Go.

## Prerequisites

Before running the application, ensure that the following software is installed on your machine:

- Node.js
- Hardhat
- MetaMask
- Go

You can find more information about how to install these tools by visiting their respective websites:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)
- [Go](https://golang.org/)


## Installation

1. Clone the repository.

```bash
git clone https://github.com/your-username/nft-claim-app.git


2. Install dependencies:

```bash
cd nft-claim-app/webapp
yarn install

cd ../api
go mod download

cd ../smart-contracts
yarn install
```

## Running the application

1. Start the Golang API server:

```bash
cd nft-claim-app/api
go run main.go
```

2. WebApp:

1. Navigate to the webapp directory.
2. Run 

```bash 
npm install 
```
to install the necessary dependencies.

3. Create a .env file with the following contents:

VITE_CONTRACT_ADDRESS=<address of the deployed smart contract>
VITE_NFT_METADATA_URI=<address of the metadata smart contract>
VITE_ACCOUNT_ADDRESS=<address of the smart contract account>
VITE_ACCOUNT_PRIVATE_KEY=<address of the private key>
VITE_API_BASE_URL=<address of the api>


VITE_NFT_METADATA_URI should be set to the URL of the API that serves the metadata for your NFTs. In this application, the metadata API is hosted on http://localhost:8080/metadata/{id}.

Note that the {id} parameter is replaced with the ID of the NFT. If you are running the metadata API on a different URL, you should update the VITE_NFT_METADATA_URI accordingly.


4. Run `npm start` to start the web application.
    Open the app in your browser at http://localhost:5173.

3. Smart Contract

1. Navigate to the smart-contracts directory: cd ../smart-contracts
2. Install dependencies: 

```bash
yarn install
```

3. Compile the smart contract: 

```bash
npx hardhat compile
```
4. Deploy the smart contract to the blockchain: 
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

Note: Before deploying the smart contract, you need to have a running blockchain network or a local development blockchain such as Hardhat or Ganache.

## Testing

Start the local development blockchain: npx hardhat node
In a new terminal, run the tests: npx hardhat run --network localhost test-tokenURI.js

## Usage
1. Open the web application in your browser at http://localhost:5173.
2. Click the "Connect" button to connect your wallet.
3. Enter your NRIC in the input field and click "Submit" to claim your NFT.

## Authors

Alex Aung Myo OO

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
