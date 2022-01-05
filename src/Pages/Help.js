import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import faucet_help from '../assets/images/faucet_help.png'


const useStyles = makeStyles({
    heading: {
        fontFamily: `"Oswald", sans-serif`,
    },
    description: {
        fontFamily: `"Nunito", sans-serif`
    },
    helloBlock: {
        marginBottom: '100px'
    },
});

function Help() {
    const classes = useStyles();


    return (
        <>
            <Container maxWidth="md" className={classes.helloBlock}>
                <Typography variant="h4" align="left" className={classes.heading} gutterBottom>
                    Getting Started
                </Typography>
            </Container>

            <Container maxWidth="md" className={classes.helloBlock}>
                <Typography variant="h4" align="left" className={classes.heading} paragraph>
                    How do I start minting?
                </Typography>
                <Typography variant="h6" align="justify" className={classes.description} paragraph>
                    We will need Ether to start minting. The Ether faucet is running on the Rinkeby test network.
                    In this demonstration, we will be using Chainlink's faucet.
                </Typography>
                <Typography variant="h6" align="justify" className={classes.description} paragraph>
                    Under Network, select Ethereum Rinkeby. Next, enter your testnet account address from Metamask and
                    select 0.1 test ETH. After sending the request, you should be able to see 0.1 test ETH added to your Metamask account.
                </Typography>
                <Box
                    component="img"
                    sx={{
                        display: 'flex',
                        height: "100%",
                        width: "100%",
                    }}
                    alt="Chainlink faucet"
                    src={faucet_help}
                />
            </Container>
        </>
    )

}

export default Help;
