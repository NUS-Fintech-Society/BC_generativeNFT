import * as React from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    },
    image: {
        width: '100%',
        maxWidth: '400px',
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
    mintButton: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        "&:hover": {
            backgroundColor: 'black',
        }
    }

});

function MintNFTModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                            <Typography id="transition-modal-title" variant="h4" className={classes.collectionHeader}>
                                Minting {props.title}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }} className={classes.collectionStats}>
                                No. of NFTs in Supply: 300
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }} className={classes.collectionStats}>
                                No. of NFTs Remaining: 300
                            </Typography>
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
                                />
                                <Box>
                                    <Button className={classes.mintButton}>
                                        Mint Now
                                    </Button>
                                </Box>

                            </Box>

                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default MintNFTModal;