import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/home.css';
import Access from './fragments/access';


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
    componentDidMount() {
        this.getDirectors()
    }
    getDirectors = () => {

        const response = axios
            .get('/api/user')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ directors: response.data })
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.directorsOfStudies.fail)
            })

    }
    renderTable() {
        return (
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
                <Access access='3' info={this.props.info.access} />
                <h1>{this.props.info.directorsOfStudies.title}</h1>
                <p>{this.props.info.directorsOfStudies.paragraph0}</p>
                {this.renderTable()}
            </div>
        );
    };
}
export default DirectorsOfStudies