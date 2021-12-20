import React from 'react';
import './Header.css';
import logo from './fintech_logo_white.png';

import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  darkBackground: {
    backgroundColor: '#2C2C2C'
  },
  navTab: {
    fontFamily: `"Oswald", sans-serif`,
    padding: '5px 20px',
    cursor: 'pointer'
  },
  logo: {
    height: '60px',

  },
  logoContainer: {
    flexGrow: '1'
  }

});

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='relative' className={classes.darkBackground} elevation={0}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <div>
          <Toolbar>
            <Typography variant='h6' className={classes.navTab}>
              Gallery
            </Typography>
            <Typography variant='h6' className={classes.navTab}>
              Mint
            </Typography>
            <Typography variant='h6' className={classes.navTab}>
              Profile
            </Typography>
          </Toolbar>

        </div>

      </Toolbar>
    </AppBar>
  );

}

export default Header;