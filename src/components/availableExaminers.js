import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Access from './fragments/access';

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
    componentDidMount() {
        this.getExaminers()
    }
    getExaminers = () => {

        const response = axios
            .get('/api/examiner')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ examiners: response.data })
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.availableExaminers.fail)
            })

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
                <Access access='4' info={this.props.info.access} />
                <h1>{this.props.info.availableExaminers.title}</h1>
                <p>{this.props.info.availableExaminers.subtitle}</p>
                <h3>{this.props.info.availableExaminers.budgetYear}</h3>
                {this.renderTable()}
            </div>
        );
    };
}
export default AvailableExaminers