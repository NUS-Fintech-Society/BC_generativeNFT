import React, { useEffect} from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { initialiseContract, mintTokens } from '../util/contract';

const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '75%',
        maxWidth: '900px'
    },
    mediaContainer: {
        minWidth: '300px',
        minHeight: '300px',
        borderRadius: '5px',
        padding: '20px 0'

    },
    image: {
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
    },
    descContainer: {
        padding: '20px',
        maxWidth: '300px',
        margin: 'auto 0'
    },
    numberTextField: {
        //color: '#2C2C2C',
        width: '70px',

    },
    mintingBlock: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '230px'
    },
    collectionHeader: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '600'
    },
    collectionStats: {
        fontFamily: `"Nunito", sans-serif`,
        fontSize: '14px'
    },
    collectionDisclaimer: {
        fontFamily: `"Nunito", sans-serif`,
        fontSize: '12px'
    },
    mintButton: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
        }
    },
    mintInput: {
        marginTop: '20px'
    },
    disclaimerContainer: {
        marginTop: '20px'
    },
    accessCodeNotice: {
        fontFamily: `"Nunito", sans-serif`,
        fontSize: '10px',
        position: 'absolute',
        top: '-155px'
    },
    accessCodeNoticeBlock: {
        position: 'relative'
    },
    quoteNotice: {
        fontFamily: `"Nunito", sans-serif`,
        fontSize: '10px',
        position: 'absolute',
        top: '-86px'
    }

});

function MintNFTModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const correctAccessCode = props.accessCode;

    const [accessCode, setAccessCode] = React.useState("");
    const [quote, setQuote] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);

    const [isMinted, setIsMinted] = React.useState(false);

    useEffect(() => {
        async function load() {
            initialiseContract();
        }

        load();
    }, []);

    const handleAccessCode = (event) => {
        setAccessCode(event.target.value);

    };

    const handleQuote = (event) => {
        setQuote(event.target.value);
    };

    const handleQuantity = (event) => {
        if (event.target.value < 0) {
            event.target.value = 0;
        } else {
            setQuantity(event.target.value);

        }
    };

    const handleMint = (event) => {
        event.preventDefault();
        if (accessCode === correctAccessCode && quantity > 0) {
            mintTokens(quantity);
            setIsMinted(true);
            console.log("Successful Mint");
        } 
        
    };

    return (
        <>
            <Button onClick={handleOpen} className={classes.mintButton, classes.mintButton}>Mint</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.modal}>
                        <Box className={classes.mediaContainer}>
                            <img
                                src={props.imageLink}
                                alt="Image"
                                className={classes.image} />
                        </Box>
                        <Box className={classes.descContainer}>
                            <Box>
                                <Typography id="transition-modal-title" variant="h4" className={classes.collectionHeader}>
                                    Minting {props.title}
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }} className={classes.collectionStats}>
                                    No. of NFTs Remaining: 300
                                </Typography>
                                <form>
                                    <TextField
                                        required
                                        label="Access Code"
                                        variant="standard"
                                        className={classes.mintInput}
                                        onChange={handleAccessCode}

                                    />
                                    <TextField
                                        label="Quote"
                                        variant="standard"
                                        className={classes.mintInput}
                                        onChange={handleQuote}
                                    />
                                    <Box className={classes.mintingBlock}>
                                        <TextField
                                            required
                                            id="outlined-number"
                                            label="Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className={classes.numberTextField}
                                            onChange={handleQuantity}
                                        />
                                        <Box>
                                            {(!isMinted) ? (
                                                <Button className={classes.mintButton} onClick={handleMint}>
                                                    Mint Now
                                                </Button>
                                            ) : (
                                                <Button className={classes.mintButton} >
                                                    Minted
                                                </Button>
                                            )}

                                        </Box>
                                    </Box>
                                </form>
                                <Box className={classes.accessCodeNoticeBlock}>
                                    {(accessCode.length > 0 && correctAccessCode !== accessCode) && (
                                        <Typography variant="h6" className={classes.accessCodeNotice}>
                                            Incorrect Access Code
                                        </Typography>
                                    )
                                    }
                                    {(accessCode.length > 0 && correctAccessCode === accessCode) && (
                                        <Typography variant="h6" className={classes.accessCodeNotice}>
                                            Correct Access Code
                                        </Typography>
                                    )
                                    }
                                    {(quote.length > 0) && (
                                        <Typography variant="h6" className={classes.quoteNotice}>
                                            "{quote}"
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <Box className={classes.disclaimerContainer}>
                                {(isMinted) ? (
                                    <Typography variant="h6" className={classes.collectionStats}>
                                        Congrats! Mint successful.
                                    </Typography>
                                )
                                    : (
                                        <>
                                            <Typography sx={{ mt: 2 }} className={classes.collectionDisclaimer}>
                                                Access Code prevents unauthorised users from minting NFT
                                            </Typography>
                                            <Typography sx={{ mt: 2 }} className={classes.collectionDisclaimer}>
                                                Quote can be seen by others upon viewing your NFT(s)
                                            </Typography>
                                            <Typography sx={{ mt: 2 }} className={classes.collectionDisclaimer}>
                                                Each society member should have two NFTs from this collection
                                            </Typography>
                                        </>

                                    )}


                            </Box>

                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default MintNFTModal;