import React from 'react';
import './Header.css';
import logo from './fintech_logo_white.png';

import { AppBar, IconButton, Toolbar, Menu, MenuItem } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";

const pages = ['gallery', 'mint', 'profile'];
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
  },
  dropdownMenu: {
    position: 'absolute',
    top: '60px'
  },
  navTabMobileView: {
    fontFamily: `"Oswald", sans-serif`,
    fontSize: '20px',
    padding: '5px 10px',
    color: '#2C2C2C',
    textDecoration: 'none'
  }

});

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.darkBackground} elevation={0}>
      <Toolbar>
        <div className={classes.logoContainer}>
          <Link to="/" >
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>

        </div>

        <ToggleHamburgerMenu />

      </Toolbar>
    </AppBar>
  );

}

function ToggleHamburgerMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const isScreenSizeSmall = useMediaQuery(theme.breakpoints.up('sm'));


  if (!isScreenSizeSmall) {
    return (
      <div>
        <MenuPopupState />
      </div>
    )

  } else {
    return (
      <div>
        <Toolbar>
          {pages.map((page) => (
            <Link key={page} to={"/" + page} className={classes.navTab}>
              {page.charAt(0).toLocaleUpperCase() + page.substring(1)}
            </Link>
          ))}
        </Toolbar>
      </div>
    )
  }

}

function MenuPopupState() {
  const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton
            color="inherit"
            {...bindTrigger(popupState)}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            {...bindMenu(popupState)}
            PaperProps={{ //Used to style the position of Menu
              style: {
                transform: 'translateX(0%) translateY(30%)',
              }
            }} >
            {pages.map((page) => (
              <MenuItem onClick={popupState.close} key={page}>
                <Link to={"/" + page} className={classes.navTabMobileView}>
                  {page.charAt(0).toLocaleUpperCase() + page.substring(1)}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default Header;