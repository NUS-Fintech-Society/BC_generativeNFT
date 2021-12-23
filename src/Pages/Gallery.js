import { Grid, Card, CardMedia, CardContent, Container, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ViewNFTModal from './ViewNFTModal';

const useStyles = makeStyles({
    heading: {
        fontFamily: `"Oswald", sans-serif`
    },
    description: {
        fontFamily: `"Nunito", sans-serif`
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
    }

});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //Should be an array of NFTs with its metadata and image link

function Gallery() {

    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" className={classes.heading} gutterBottom>
                    NUS Fintech Society Gallery
                </Typography>
                <Typography variant="h6" align="center" className={classes.description} paragraph>
                    Welcome to the Gallery. This is where you can view all
                    NFTs that have been minted so far. Click on one to interact with it.
                </Typography>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia className={classes.cardMedia}
                                image="https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg" //hardcoded
                                title="Image Title" />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant='h5' className={classes.font2}>
                                    #{card}
                                </Typography>
                                <Typography className={classes.font2}>
                                    NUS Fintech Society NFT
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ViewNFTModal imageLink='https://gateway.pinata.cloud/ipfs/QmVw4Rts3aCPSfWVoLnco7SiTzw8Wfxj7KnW8qWe5PfcKg'/>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))};

                </Grid>
            </Container>
        </div>

    )
}

export default Gallery;