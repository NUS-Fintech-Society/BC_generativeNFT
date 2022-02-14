# BC_Generative_NFT

Welcome to NUS Fintech Society Unofficial NFT Page. This is a place made by NUS Fintech Society members for NUS Fintech Society. Here, you can view all NUS Fintech Society NFT collections. There are limited number of NFTs to be minted, all are one-of-a-kind. These collections are on the Ethereum blockchain in accordance to the ERC721 NFT standard. A member can mint an NFT after initialisation into the society, after a big contribution to an ongoing project.

## Screenshots

### Home Page

![Home Page](https://gateway.pinata.cloud/ipfs/QmNzoDP75MAja3yU3tJU8XrSoPFPnsCq2n7HbCWbfy5AVP)

### Minting Page

![Minting Page](https://gateway.pinata.cloud/ipfs/QmNP55vADYebXNbVr4i88GahPhCFkwQuR8juQo727mJ2mY)

### Profile Page

![Profile Page](https://gateway.pinata.cloud/ipfs/QmVF5g9EDVtz1Rs6tMRvtTXevN8RdEbsKUoH3zBmftFMbi)

## Getting Started Running Locally

### Clone this repository

Use `git clone https://github.com/NUS-Fintech-Society/BC_generativeNFT.git` to get the files within this repository onto your local machine

### Environment Setup

1. Run `npm install` to install all the dependencies needed for this project.  

2. Create a .env file and fill out the MNEMONIC environment variable as shown below

    ```.env
    MNEMONIC= {your mnemonic phrase from metamask}
    ```

### Running the Smart Contract Locally

1. Create a Ganache workspace to get your personal blockchain up and running.

2. Compile the ABI for the smart contract using `truffle migrate`.  

    - If you're successful, you should be able to see the contract address for the Token smart contract under 2_token_migration.js.  

3. Replace the `contractAddress` variable (local) in config.js in `src/util/` with the contract address.

### Adding A Local Account To MetaMask

1. Open your MetaMask browser extension and configure your custom netowork.

2. Next, import one of the accounts by adding its Private Key (can be obtained from ganache)

3. If you're successful, you should see a balance of 100ETH in the wallet.

For a more in-depth tutorial on adding a local account to metamask refer to [this video](https://www.youtube.com/watch?v=nUEBAS5r4Og)

### Running the Application

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Deploying to TestNet - Rinkeby

1. Make sure the MNEMONIC environment variable is filled out and your wallet has test ether in either test nets using an ether faucet.

2. Register at [infura.io](https://infura.io/) and create a new project

3. Add your project id into the .env as shown below  
   (Make sure it corresponds to whatever testnet you are intending to deploy the smart contract to)

    ```.env
    INFURA_PROJECT_ID= {your project id from infura}
    ```

4. To deploy to Rinkeby test net

    ```bash
    truffle migrate --network rinkeby
    ```

5. Replace the `contractAddress` variable (Rinkeby) in config.js in `src/util/` with the contract address from deployment.
