import './App.css';
import Header from './Header/Header';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import Mint from './Pages/Mint';
import Profile from './Pages/Profile';
import Footer from './Footer/Footer';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const useStyles = makeStyles({
  mainBody: {
    marginTop: '85px',
    paddingTop: '10vh'
  }

});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container className={classes.mainBody}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
      <Footer name='footer' />
    </Router>
  );
}

export default App;
