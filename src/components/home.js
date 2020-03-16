import React, { Component } from 'react';

import '../resources/css/home.css';

class Home extends Component {

    render() {
        return (
            <div className="container">
            <h1>{this.props.info.home.title}</h1>
            <p>{this.props.info.home.paragraph0}</p>
            <p>{this.props.info.home.paragraph1}</p>
            <p>{this.props.info.home.paragraph2}</p>
        </div>
        );
    };
}
export default Home