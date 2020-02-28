import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import '../resources/css/home.css';

class DirectorsOfStudies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directors: [
                {
                    lastName: "",
                    firstName: "",
                    email: "",
                }
            ]
        }
    }
    renderTable(){
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.directorsOfStudies.lastName}</th>
                        <th>{this.props.info.directorsOfStudies.firstName}</th>
                        <th>{this.props.info.directorsOfStudies.email}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.directors.map((director, key) =>
                        < tr key={key} className="pressForInfo" >
                            <td key={"lastName: " + key} className="pressForInfo" >{director.lastName}</td>
                            <td key={"firstName: " + key} > {director.firstName}</td>
                            <td key={"email: " + key} > {director.email}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    render() {
        return (
            <div className="container">
            <h1>{this.props.info.directorsOfStudies.title}</h1>
            <p>{this.props.info.directorsOfStudies.paragraph0}</p>
            {this.renderTable()}
        </div>
        );
    };
}
export default DirectorsOfStudies