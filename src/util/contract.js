import { ethers } from 'ethers';
import { contractAddress, contractAbi } from './config';

const initialiseContract = async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractAbi, signer);
    } else {
        alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        return "";
    }
}

const readOnlyContract = async() => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return new ethers.Contract(contractAddress, contractAbi, provider);
    } else {
        alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        return "";
    }
}

export const mintTokens = async (noOfTokens, quote) => { // send function
    const tokenContract = await initialiseContract();

    console.log("Initialize payment") // update UI to let user know that transaction going to take awhile
    let tokenTxn = await tokenContract.mintTokens(noOfTokens, quote, { value: ethers.utils.parseEther(`${noOfTokens * 0.01}`) });
    console.log("Loading...") // Update UI to let user know transaction mining
    await tokenTxn.wait();
    console.log(`See transaction at https://rinkeby.etherscan.io/tx/${tokenTxn.hash}`) // Update UI to let user know transaction successful

}

// Returns array of tokenIds owner owns
export const tokensOfOwner = async (owner) => {
    const tokenContract = await readOnlyContract();
    try {
        const tokensArray = await tokenContract.tokensOfOwner(owner);
        return tokensArray;
    } catch (err) {
        console.log(err);
    }
}

//Returns all tokenIds that have been minted
export const tokensOfAll = async () => {
    const tokenContract = await readOnlyContract();
    try {
        const tokensArray = await tokenContract.tokensOfAll();
        return tokensArray;
    } catch (err) {
        console.log(err);
    }
}

export const tokensRemaining = async () => {
    const tokenContract = await readOnlyContract();
    try {
        const tokensMinted = await tokenContract.totalSupply();
        const maxSupply = await tokenContract.MAX_SUPPLY();
        return maxSupply - tokensMinted;
    } catch (err) {
        console.log(err);
    }
}

export const getPrice = async () => {
    const tokenContract = await readOnlyContract();
    try {
        const price = await tokenContract.PRICE();
        return price;
    } catch (err) {
        console.log(err);
    }
}

export const getQuote = async (tokenId) => {
    const tokenContract = await readOnlyContract();
    try {
        // creating filter
        const filter = tokenContract.filters.Quote(null, tokenId);
        const logs = await tokenContract.queryFilter(filter, 0, "latest");
        return logs[0].args.quote;
    } catch (err) {
        console.log(err);
    }
}

export const ownerOf = async (tokenId) => {
    const tokenContract = await readOnlyContract();
    try {
        const owner = await tokenContract.ownerOf(tokenId);
        return owner;
    } catch (err) {
        console.log(err);
    }
}