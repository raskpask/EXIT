import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/home.css';
import Access from './fragments/access';
import redirect from './../model/redirect';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';



class DirectorsOfStudies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: 0,
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
        axios
            .get('/api/user', {
                params: {
                    userRoleId: 2
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ directors: res.data })
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.directorsOfStudies.fail)
                }

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
                            <td key={"lastName: " + key} className="pressForInfo" >{director.last_name}</td>
                            <td key={"firstName: " + key} > {director.first_name}</td>
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
                {this.state.redirect ? <Redirect to='/' /> : ""}
                <h1>{this.props.info.directorsOfStudies.title}</h1>
                <p>{this.props.info.directorsOfStudies.paragraph0}</p>
                {this.renderTable()}
            </div>
        );
    };
}
export default DirectorsOfStudies