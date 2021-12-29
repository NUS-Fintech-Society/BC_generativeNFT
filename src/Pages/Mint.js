import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Grid, Card, CardMedia, CardContent, Container, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MintNFTModal from './MintNFTModal';

const nftCollection1 = {
    name: 'The First Collection',
    description: 'The first collection of NFTs for NUS Fintech Society'
}
const nftCollection2 = {
    name: 'The Second Collection',
    description: 'The second collection of NFTs for NUS Fintech Society'
}
const nftCollection3 = {
    name: 'The Third Collection',
    description: 'The third collection of NFTs for NUS Fintech Society'
}

const collections = [nftCollection1, nftCollection2, nftCollection3];

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
    let address = null;
    if (localStorage.getItem('address') !== null) {
        address = localStorage.getItem('address');
    }

    const [selectedAccount, setSelectedAccount] = useState(address);

    useEffect(() => {
        console.log('Profile Page has been mounted.');

        if (localStorage.getItem('has10MinuteTimerBeenSet') === null) {
            console.log('Created 10 Minute Timer');
            setTimeout(() => {
                setSelectedAccount(() => null);
                localStorage.removeItem('address');
                localStorage.removeItem('has10MinuteTimerBeenSet');
                console.log("10 MINUTES PASSED. LocalStorage removed wallet address.");
            }, 600000); //10 minutes 600000 //5 Seconds 5000

            localStorage.setItem('has10MinuteTimerBeenSet', true);
        }

    })



    async function handleConnection() {
        let provider = window.ethereum;

        if (typeof provider !== 'undefined') {

            await provider.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    setSelectedAccount(() => accounts[0]);
                    localStorage.setItem('address', accounts[0]); //need to set timer to remove the local storage
                }).catch((err) => {
                    console.log(err);
                })

            //switching metamask accounts
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length === 0) { //MetaMask is Locked
                    setSelectedAccount(() => null);
                    localStorage.removeItem('address');
                    localStorage.removeItem('has10MinuteTimerBeenSet');
                    console.log('Window has detected that MetaMask is locked.');

                    location.reload(); //Refresh page
                } else {
                    setSelectedAccount(() => accounts[0]);
                    localStorage.setItem('address', accounts[0]);

                }
                console.log('Window has detected a change in accounts/metamask is locked.');
            })

            console.log('Use has clicked on CONNECT');
        } else {
            alert('Sorry. It appears you do not have MetaMask.');
        }
    }

    return (
        <>
            <Box className={classes.profileDetailsBlock}>
                <Box className={classes.walletBlock}>
                    <WalletAddressDisplay address={selectedAccount} />
                    <Box>
                        {/* If not connected yet */}
                        {(!selectedAccount) ? (
                            <Button
                                variant='contained'
                                disableElevation
                                onClick={handleConnection}
                                className={classes.connectButton}>
                                Connect
                            </Button>
                        ) : (
                            <Box className={classes.connected}>
                                YOU'RE CONNECTED
                            </Box>
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
                                    image="https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg" //hardcoded
                                    title="Image Title" />
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
                                        {selectedAccount && //Only able to Mint when Connected to address
                                            <MintNFTModal
                                                imageLink='https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg'
                                                title={collection.name} />
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

function WalletAddressDisplay(props) {
    const classes = useStyles();
    let address = props.address;
    let addressBlock = [];
    if (address !== null) {
        for (let i = 0; i < address.length; i = i + 10) {
            addressBlock.push(address.substring(i, i + 10));
        }
    }
    return (
        <>
            <Box className={classes.addressBlock}>
                {addressBlock.map(block => (
                    <Typography variant='h6' className={classes.addressLine} key={block}>
                        {block}
                    </Typography>
                ))}

            </Box>
        </>
    )
}

export default Mint;