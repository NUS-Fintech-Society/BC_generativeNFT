import { ethers } from 'ethers';

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            return addressArray[0];

        } catch (err) {
            console.log(err);
            return "";
        }
    } else {
        alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        return "";
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return addressArray[0];

            } else {
                return "";
            }
        } catch (err) {
            console.log(err);
            return "";
        }
    } else {
        alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        return "";
    }
};

export const checkNetwork = async() => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId !== 4) {
            alert("For the site to work as intended, please change your network to the Rinkeby Test Network!");
            return "";
        }
    } else {
        alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        return "";
    }
}

