import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    }

});

function MintNFTModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Mint</Button>
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
                            <Typography id="transition-modal-title" variant="h6">
                                Text in a modal
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default MintNFTModal;