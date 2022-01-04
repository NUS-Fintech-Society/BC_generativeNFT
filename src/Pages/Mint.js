import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, CardContent, Container, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MintNFTModal from '../Modals/MintNFTModal';
import { connectWallet, getCurrentWalletConnected } from "../util/interact.js";
import WalletAddressDisplay from '../util/WalletAddressDisplay';

import firstCollectionBanner from '../assets/images/first_collection_banner.png'

const nftCollection1 = {
    name: 'The First Collection',
    description: 'The first collection of NFTs for NUS Fintech Society',
    image: firstCollectionBanner,
    accessCode: 'NUSFintechSociety'
    //image: 'https://gateway.pinata.cloud/ipfs/QmTf7qyZXxSwEs8eosRZt57AdxY1oKASDdqkt6ZMZFkptK'
}
// const nftCollection2 = {
//     name: 'The Second Collection',
//     description: 'The second collection of NFTs for NUS Fintech Society',
//     image: 'https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg'
// }
// const nftCollection3 = {
//     name: 'The Third Collection',
//     description: 'The third collection of NFTs for NUS Fintech Society',
//     image: 'https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg'
// }

const collections = [nftCollection1];

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
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1,

    },
    font2: {
        fontFamily: `"Nunito", sans-serif`
    },
    cardContentHeader: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '600'
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
    cardContentBlock: {
        display: 'flex',
        padding: '20px'
    }

})

function Mint() {
    const classes = useStyles();
    const [walletAddress, setWallet] = useState("");

    useEffect(() => {
        async function load() {
            const connectedWalletAddress = await getCurrentWalletConnected();
            setWallet(connectedWalletAddress);
            addWalletListener()
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
                    <WalletAddressDisplay address={walletAddress} />
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
                        Mint
                    </Typography>
                    <Typography variant='h6' className={classes.profileDesc}>
                        Upon connecting to your MetaMask wallet, you can mint available NFTs created by NUS Fintech Society.
                    </Typography>
                </Box>
            </Box>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {collections.map((collection) => (
                        <Grid item key={collection.name} xs={12}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.cardMedia}
                                    image={collection.image}
                                    title={collection.name} />
                                <Box className={classes.cardContentBlock}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant='h5' className={classes.cardContentHeader}>
                                            {collection.name}
                                        </Typography>
                                        <Typography className={classes.font2}>
                                            {collection.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {walletAddress.length > 0 && //Only able to Mint when Connected to address
                                            <MintNFTModal
                                                imageLink={collection.image}
                                                title={collection.name}
                                                accessCode={collection.accessCode} />
                                        }
                                    </CardActions>
                                </Box>

                            </Card>
                        </Grid>
                    ))};

                </Grid>
            </Container>
        </>
    );
}

export default Mint;