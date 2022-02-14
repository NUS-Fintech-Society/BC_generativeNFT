import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, CardContent, Container, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connectWallet, getCurrentWalletConnected, checkNetwork } from "../util/interact.js";
import ViewNFTModal from '../Modals/ViewNFTModal';
import WalletAddressDisplay from '../util/WalletAddressDisplay';
import { tokensOfOwner, getQuote } from "../util/contract.js";

const useStyles = makeStyles({
    addressBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        height: '200px'
    },
    addressLine: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '600',
        display: 'inline-block'
    },
    connectButton: {
        backgroundColor: '#2C2C2C',
        color: 'white',

        "&:hover": {
            background: "black"
        },
    },
    connected: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        display: 'inline-block',
        padding: '8px 13px',
        borderRadius: '5px',
        fontFamily: `"Roboto", sans-serif`
    },
    walletBlock: {
        display: 'flex',
        width: '375px'
    },
    cardGrid: {
        padding: '10vh 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '100%'
    },
    cardContent: {
        flexGrow: 1,
    },
    font2: {
        fontFamily: `"Nunito", sans-serif`
    },
    profileDetailsBlock: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    profileHeader: {
        fontFamily: `"Oswald", sans-serif`
    },
    profileDesc: {
        width: '400px',
        fontFamily: `"Nunito", sans-serif`
    },
    loading: {
        fontFamily: `"Nunito", sans-serif`,
        margin: '0 auto'
    }

})



function Profile() {
    const classes = useStyles();
    const [walletAddress, setWallet] = useState("");
    const [nfts, setNfts] = useState([]);

    async function generateTokensOfOwner(address) {
        tokensOfOwner(address).then((ownerNFTs) => {
            const ownedNFTs = [];
            for (let i = 0; i < ownerNFTs.length; i++) {
                let tokenId = ownerNFTs[i].toString();

                //Retrieve Quote
                getQuote(parseInt(tokenId)).then((quote) => {
                    let nft = {
                        id: tokenId,
                        image: '/images/nft_collections/sonobe_orbs_and_jewels/' + tokenId + '.png',
                        collection: 'Sonobe: Orbs and Jewels',
                        quote: quote,
                        ownerAddress: address
                    }

                    if (!ownedNFTs.some(nft => nft.id === tokenId)) {
                        //Updates original array with newly retrieved NFT
                        ownedNFTs.push(nft);

                        //Creates a new array with the NFTs
                        const updatedNFTArray = [];
                        updatedNFTArray.push(...ownedNFTs);
                        updatedNFTArray.sort(function (nft1, nft2) { return nft1.id - nft2.id });

                        //Updates the nfts array to rerender
                        setNfts(updatedNFTArray);
                    }
                });
            }
        });
    }

    useEffect(() => {
        async function load() {
            checkNetwork();
            const connectedWalletAddress = await getCurrentWalletConnected();
            setWallet(connectedWalletAddress);
            addWalletListener();
            generateTokensOfOwner(connectedWalletAddress);

        }

        load();
    }, []);

    const connectWalletPressed = async () => {
        const walletAddress = await connectWallet();
        setWallet(walletAddress);
    };

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    generateTokensOfOwner(accounts[0]);
                } else {
                    setWallet("");
                }
            });
        } else {
            alert('Sorry, it appears you do not have MetaMask. You must install Metamask, a virtual Ethereum wallet, in your browser.');
        }
    }

    return (
        <>
            <Box className={classes.profileDetailsBlock}>
                <Box className={classes.walletBlock}>
                    <WalletAddressDisplay address={walletAddress} variant="big" />
                    <Box>
                        {/* If connected */}
                        {(walletAddress.length > 0) ? (
                            <Box className={classes.connected}>
                                YOU'RE CONNECTED
                            </Box>
                        ) : (
                            <Button
                                variant='contained'
                                disableElevation
                                onClick={connectWalletPressed}
                                className={classes.connectButton}>
                                Connect
                            </Button>
                        )}
                    </Box>
                </Box>
                <Box>
                    <Typography variant='h4' className={classes.profileHeader} gutterBottom>
                        Profile
                    </Typography>
                    <Typography variant='h6' className={classes.profileDesc}>
                        Upon connecting to your MetaMask wallet, you can view all your minted NUS Fintech Society NFTs here.
                    </Typography>
                </Box>
            </Box>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {nfts.length == 0 && (
                        <>
                            <Typography variant="h4" align="center" className={classes.loading} >
                                No NFTs yet...
                            </Typography>
                        </>
                    )}
                    {nfts.map((nft) => (
                        <Grid item key={nft.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.cardMedia}
                                    image={nft.image}
                                    title={nft.collection + " #" + nft.id} />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant='h5' className={classes.font2}>
                                        #{nft.id}
                                    </Typography>
                                    <Typography className={classes.font2}>
                                        {nft.collection}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <ViewNFTModal id={nft.id} quote={nft.quote} collection={nft.collection} address={nft.ownerAddress} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </>
    );
}

export default Profile;