import React from 'react';
import './Header.css';
import logo from './fintech_logo_white.png';

import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";


const useStyles = makeStyles({
  darkBackground: {
    backgroundColor: '#2C2C2C'
  },
  navTab: {
    fontFamily: `"Oswald", sans-serif`,
    fontSize: '20px',
    padding: '5px 20px',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none'
  },
  logo: {
    height: '80px',

  },
  logoContainer: {
    flexGrow: '1'
  }

});

function Header() {
  const classes = useStyles();
  const pages = ['gallery', 'mint', 'profile'];
  const theme = useTheme();

  function openNavMenu() {
    console.log('opennav bar');
  }

  return (
    <AppBar position='fixed' className={classes.darkBackground} elevation={0}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <Link to="/" >
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>

        </div>
        <IconButton
          onClick={openNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <div>
          <Toolbar>
            {pages.map((page) => (
              <Link key={page} to={"/" + page} className={classes.navTab}>
                {page.charAt(0).toLocaleUpperCase() + page.substring(1)}
              </Link>
            ))}
          </Toolbar>
        </div>

      </Toolbar>
    </AppBar>
  );

}

export default Header;