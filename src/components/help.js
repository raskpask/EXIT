import React, { Component } from 'react';

// import '../resources/css/.css'

class Help extends Component {

    render() {
        return (
            <div className="container">
            <h1>{this.props.info.help.title}</h1>
            <p>{this.props.info.help.paragraph0}</p>
            <p>{this.props.info.help.paragraph1}</p>
            <p>{this.props.info.help.paragraph2}</p>
        </div>
        );
    };
}
export default Help