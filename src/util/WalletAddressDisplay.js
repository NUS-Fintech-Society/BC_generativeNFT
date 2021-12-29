import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    }
})



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

export default WalletAddressDisplay;