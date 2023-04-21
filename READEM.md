# NFT Claiming DApp

This decentralized application allows users to claim NFTs using the Ethereum blockchain. The app is built with Solidity, React, Go, and Ethereum. It connects to an Ethereum wallet through MetaMask, displays the metadata of the claimed NFT, and stores the claim data in a smart contract on the Ethereum blockchain. The backend API is built using Go.

## Getting Started

Follow the instructions below to set up the prerequisites, install the application, migrate the database, run the application, and test it.

### Prerequisites

Before running the application, ensure that the following software is installed on your machine:

- Node.js
- Yarn
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
git clone https://github.com/alexaung/NFTClaim.git
```

2. Install dependencies:

```bash
cd go-react-nft-app/webapp
yarn install

cd ../api
go mod download

cd ../smart-contracts
yarn install
```

## Migration

1. Running the Go API migrations (optional):

```bash
cd ../api
go run cmd/migrate.go
```

## Running the application

1. Start the Golang API server:

```bash
cd nft-claim-app/api
go run main.go
```

2. Set up and run the web application:

    1. Navigate to the webapp directory.
    2. Install the necessary dependencies with `yarn install`.
    3. Create a .env file with the appropriate contents, as detailed in the README.
    4. Run npm start to start the web application and open it in your browser at `http://localhost:5173`.

    .env file

    ```bash
    VITE_CONTRACT_ADDRESS=<address of the deployed smart contract>
    VITE_NFT_METADATA_URI=<address of the metadata smart contract>
    VITE_ACCOUNT_ADDRESS=<address of the smart contract account>
    VITE_ACCOUNT_PRIVATE_KEY=<address of the private key>
    VITE_API_BASE_URL=<address of the api>
    ```

    VITE_NFT_METADATA_URI should be set to the URL of the API that serves the metadata for your NFTs. In this application, the metadata API is hosted on http://localhost:8080/metadata/{id}.

    Note that the {id} parameter is replaced with the ID of the NFT. If you are running the metadata API on a different URL, you should update the VITE_NFT_METADATA_URI accordingly.

3. Deploy the smart contract to the blockchain:

    1. Navigate to the smart-contracts directory and install dependencies with `yarn install`.
    2. Compile the smart contract with `npx hardhat compile`.
    3. Deploy the smart contract to the blockchain with npx hardhat run scripts/deploy.js --network <network-name>.

    Note: Before deploying the smart contract, you need to have a running blockchain network or a local development blockchain such as Hardhat or Ganache.

## Project Structure

Below is an overview of the key files and their purposes in this application:

### API

    - api/main.go: The main entry point of the Go API server.
    - api/controllers/claim.go: Contains the claim controller, which handles claim-related API routes.
    - api/models/claim.go: Defines the claim model and related database operations.
    - api/db/db.go: Contains the database connection and configuration.

### API Endpoints
    
    The Go API server exposes the following endpoints for interacting with the NFT Claiming DApp:

    - POST /claim: Accepts a claim request with the user's NRIC and stores it in the database. The endpoint also interacts  with the smart contract to claim the NFT on behalf of the user.

    Example request payload:

    ```json
    {
        "nric": "S1234567A",
        "wallet_address": "0x1234567890abcdef1234567890abcdef12345678"
    }
    ```

    - GET /metadata/:tokenId: Returns the metadata associated with the specified tokenId. This is used by the web application to display the NFT metadata after a successful claim.

    Example request:

    ```bash
    GET /metadata/1
    ```

    Example response:

    ```json
    {
        "name": "NFT Name",
        "description": "This NFT represents a unique claim.",
        "image": "https://example.com/image.png"
    }
    ```

### Smart Contract

    - smart-contracts/contracts/NRICClaimNFT.sol: The Solidity smart contract for NRIC NFT claims.

### Webapp

    - webapp/src/components/ClaimForm.jsx: The React component for the claim form, allowing users to input their NRIC and submit claims.
    - webapp/src/components/NFTDisplay.jsx: The React component responsible for displaying the claimed NFT's metadata.
    - webapp/src/App.jsx: The main entry point of the React web application, where components are brought together and rendered.

## Testing

1. Start the local development blockchain: npx hardhat node
2. In a new terminal, run the tests: npx hardhat run --network localhost test-tokenURI.js

## Usage
1. Open the web application in your browser at http://localhost:5173.
2. Click the "Connect" button to connect your wallet.
3. Enter your NRIC in the input field and click "Submit" to claim your NFT.

## Authors

Alex Aung Myo OO

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
