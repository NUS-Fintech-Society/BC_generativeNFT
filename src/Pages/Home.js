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
                    Welcome to NUS Fintech Society Official NFT Collection Page. This is where you can view all
                    NUS Fintech Society NFT collections. These collections are exclusive to NUS Fintech Society members.
                    There are limited number of NFTs to be minted, all are one-of-a-kind.
                </Typography>
                <Typography variant="h6" align="center" className={classes.description} paragraph>
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
                        NUS Fintech Society NFTs. With only 300 unique and interactive NFTs for this collection, go mint yourself one today!
                    </Typography>
                </Box>
                

            </Container>
        </>
    )

}

export default Home;