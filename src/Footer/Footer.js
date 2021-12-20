import './Footer.css';
import React from 'react';

class Footer extends React.Component {
    render() {
        return <h1>This is the {this.props.name}</h1>;
    }
}

export default Footer;