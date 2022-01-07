import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    addressBlockBig: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        height: '200px'

    },
    addressBlockSmall: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100px',
        height: '100px'
    },
    addressLineBig: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '600',
        fontSize: '22px',
        display: 'inline-block'

    },
    addressLineSmall: {
        fontFamily: `"Nunito", sans-serif`,
        fontWeight: '400',
        fontSize: '12px',
        display: 'inline-block'
    }
})



function WalletAddressDisplay(props) {
    const classes = useStyles();
    let address = props.address;
    let variant = props.variant;
    let selectedBoxStyle;
    let selectedTypoStyle;

    if (variant === "small") {
        selectedBoxStyle = classes.addressBlockSmall;
        selectedTypoStyle = classes.addressLineSmall;
    } else if (variant === "big") {
        selectedBoxStyle = classes.addressBlockBig;
        selectedTypoStyle = classes.addressLineBig;
    }
    
    let addressBlock = [];
    if (address !== null) {
        for (let i = 0; i < address.length; i = i + 10) {
            addressBlock.push(address.substring(i, i + 10));
        }
    }
    return (
        <>
            <Box className={selectedBoxStyle}>
                {addressBlock.map(block => (
                    <Typography className={selectedTypoStyle} key={block}>
                        {block}
                    </Typography>
                ))}

            </Box>
        </>
    )
}

export default WalletAddressDisplay;