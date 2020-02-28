import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import '../resources/css/availableExaminers.css';

class AvailableExaminers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examiners: [
                {
                    lastName: "",
                    firstName: "",
                    email: "",
                    competenceArea: ""
                }
            ]
        }
    }

    renderTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.availableExaminers.firstName}</th>
                        <th>{this.props.info.availableExaminers.lastName}</th>
                        <th>{this.props.info.availableExaminers.email}</th>
                        <th>{this.props.info.availableExaminers.competenceArea}</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.examiners.map((examiner, key) =>
                        < tr key={key} className="pressForInfo" >
                            <td key={"name: " + key} className="pressForInfo" >{examiner.firstName}</td>
                            <td key={"lastName: " + key} > {examiner.lastName}</td>
                            <td key={"email: " + key} > {examiner.email}</td>
                            <td key={"competenceArea: " + key} > {examiner.competenceArea}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    render() {
        return (
            <div className="container">
                <h1>{this.props.info.availableExaminers.title}</h1>
                <p>{this.props.info.availableExaminers.subtitle}</p>
                <h3>{this.props.info.availableExaminers.budgetYear}</h3>
                {this.renderTable()}
            </div>
        );
    };
}
export default AvailableExaminers