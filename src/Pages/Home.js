import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    heading: {
        fontFamily: `"Oswald", sans-serif`
    },
    description: {
        fontFamily: `"Nunito", sans-serif`
    },
    newsTitle: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '600'
    },
    newsDate: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '400',
        fontSize: '16px',
        marginLeft: '10px'
    },
    newsBlock: {
        marginBottom: '30px',
    },
    helloBlock: {
        marginBottom: '100px'
    }
});

function Home() {
    const classes = useStyles();


    return (
        <>
            <Container maxWidth="md" className={classes.helloBlock}>
                <Typography variant="h4" align="center" className={classes.heading} gutterBottom>
                    Hello
                </Typography>
                <Typography variant="h6" align="center" className={classes.description} paragraph>
                    Welcome to NUS Fintech Society Official NFT Page. This is a place made by NUS Fintech Society members for NUS Fintech Society.
                    Here, you can view all NUS Fintech Society NFT collections.
                    There are limited number of NFTs to be minted, all are one-of-a-kind.
                </Typography>
                <Typography variant="h6" align="center" className={classes.description} paragraph>
                    These collections are on the Ethereum blockchain in accordance to the ERC721 NFT standard.
                    A member can mint an NFT after initialisation into the society, after a big contribution to an ongoing project
                    or when he/she simply feels like it.
                </Typography>
            </Container>

            <Container maxWidth="md">
                <Typography variant="h4" align="center" className={classes.heading} gutterBottom>
                    News & Updates
                </Typography>
                <Box className={classes.newsBlock}>
                    <Typography variant="h5" align="left" className={classes.newsTitle}>
                        First Collection is Live<span className={classes.newsDate}>30 Dec 2021</span>
                    </Typography>
                    <Typography variant="h6" align="left" className={classes.description} paragraph>
                        The original team of developers has created the first collection of
                        NUS Fintech Society NFTs. This is a collection of 300 NFTs which are not only unique, but interactive as well.
                        This collections explores the beauty of combination of simples shapes to form a more complex but intriguing pattern.
                        Each image will be akin to staring down a diferent kaleidoscope. Go mint yourself a one-off ERC721 NFT today!
                    </Typography>
                </Box>
                

            </Container>
        </>
    )

}

export default Home;
