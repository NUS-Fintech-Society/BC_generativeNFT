import './Footer.css';
import React from 'react';
import { Typography, Link } from '@material-ui/core';

function Footer() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
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