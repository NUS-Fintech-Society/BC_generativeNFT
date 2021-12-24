import './Footer.css';
import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        marginBottom: '20px'
    }
});

function Footer() {
    const classes = useStyles();

    return (
        <Typography variant="body2" align="center" className={classes.footer}>
            {'Copyright © '}
            <Link color="inherit" href="https://fintechsociety.comp.nus.edu.sg/" target="_blank">
                NUS Fintech Society
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer;