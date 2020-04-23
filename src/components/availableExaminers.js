import React, { Component, Fragment } from 'react';
import { Table, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import Access from './fragments/access';
import redirect from './../model/redirect';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';

import '../resources/css/availableExaminers.css';

class AvailableExaminers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: 0,
            currentYear: new Date().getFullYear(),
            budgetYear: [
                {
                    year: "",
                }
            ],
            examiners: [
                {
                    last_name: "",
                    first_name: "",
                    email: "",
                    expertise_name: "",
                    user_id: "",
                    available_hours_examiner: ""
                }
            ]
        }
    }
    componentDidMount() {
        this.getExaminers(this.state.currentYear)
        this.getBudgetYears()
    }
    getExaminers = (year) => {
        axios
            .get('/api/availableExaminers', {
                params: {
                    year: year
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ examiners: res.data, currentYear: year })
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.availableExaminers.fail)
                }
            })

    }
    getBudgetYears = () => {
        axios
            .get('/api/budgetYear')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ budgetYear: res.data })
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.budgetYear.getFail)
                }
            })
    }
    renderDropDownYear() {
        return (
            <Row>
                <Col>
                    <h3>{this.props.info.availableExaminers.budgetYear}: {this.state.currentYear}</h3>
                </Col>
                <Col className="alignRight">
                    <DropdownButton id="dropdown-basic-button" title={this.props.info.availableExaminers.changeYear}>
                        {this.state.budgetYear.map((budgetYear, key) =>
                            <Fragment>
                                <Dropdown.Item key={key} onClick={() => this.getExaminers(budgetYear.year)}>{budgetYear.year}</Dropdown.Item>
                            </Fragment>
                        )}
                    </DropdownButton>
                </Col>
            </Row>
        )
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
                            <td key={"name: " + key} className="pressForInfo" >{examiner.first_name}</td>
                            <td key={"lastName: " + key} > {examiner.last_name}</td>
                            <td key={"email: " + key} > {examiner.email}</td>
                            <td key={"competenceArea: " + key} > {examiner.expertise_name}</td>
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
                {this.state.redirect ? <Redirect to='/' />: ""}
                <h1>{this.props.info.availableExaminers.title}</h1>
                <p>{this.props.info.availableExaminers.subtitle}</p>
                {this.renderDropDownYear()}
                {this.renderTable()}
            </div>
        );
    };
}
export default AvailableExaminers