import React, { Component } from 'react';

// import '../resources/css/.css'

class Help extends Component {

    render() {
        return (
            <div className="container">
            <h1>{this.props.info.home.title}</h1>
        </div>
        );
    };
}
export default Help