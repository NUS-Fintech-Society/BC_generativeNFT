import { Grid, Card, CardMedia, CardContent, Container, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import ViewNFTModal from '../Modals/ViewNFTModal';
import { tokensOfAll, getQuote } from "../util/contract.js";
import { checkNetwork } from "../util/interact.js";

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
    },
    loading: {
        fontFamily: `"Nunito", sans-serif`,
        margin: '0 auto'
    }

});

function Gallery() {

    const classes = useStyles();
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        async function load() {
            checkNetwork();
            tokensOfAll().then((nFTs) => {
                const ownedNFTs = [];
                for (let i = 0; i < nFTs.length; i++) {
                    let tokenId = nFTs[i].toString();

                    //Retrieve Quote
                    getQuote(parseInt(tokenId)).then((quote) => {
                        let nft = {
                            id: tokenId,
                            image: '/images/nft_collections/first_collection/' + tokenId + '.png',
                            collection: 'The First Collection',
                            quote: quote
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

        load();
    }, []);

    return (
        <>
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
                    {nfts.length == 0 && (
                        <>
                            <Typography variant="h4" align="center" className={classes.loading} >
                                Loading...
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
                                    <ViewNFTModal id={nft.id} image={nft.image} quote={nft.quote} collection={nft.collection} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))};
                </Grid>
            </Container>
        </>
    )
}

export default Gallery;