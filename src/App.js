import './App.css';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import { Typography, AppBar, Card, CardAction, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  darkBackground: {
    backgroundColor: '#2C2C2C'
  }

}); 

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Header />
      
      <Typography variant="h1">
        Hi there
      </Typography>
      <Body />
      <Footer />
    </>
  );
}

export default App;
