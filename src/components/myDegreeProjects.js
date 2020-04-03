import React, { Component, Fragment } from 'react';
import { Table, Modal, Button,Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/home.css';

import Access from './fragments/access';
import DegreeProject from './fragments/degreeProject';
import redirect from './../model/redirect';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';

class MyDegreeProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBudgetYear: new Date().getFullYear(),
            redirect: 0,
            showUser: [],
            projects: [],
            budgetYear: [
                {
                    year: "",
                }
            ],
        }
    }
    componentDidMount() {
        this.getDegreeProjects(this.state.currentBudgetYear)
        this.getBudgetYears()
    }
    getDegreeProjects = (year) => {
        axios
            .get('/api/project', {
                params: {
                    year: year
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ projects: res.data, currentBudgetYear: year })
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.myDegreeProjects.fail)
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
                    <h3>{this.props.info.availableExaminers.budgetYear}: {this.state.currentBudgetYear}</h3>
                </Col>
                <Col className="alignRight">
                    <DropdownButton id="dropdown-basic-button" title={this.props.info.availableExaminers.changeYear}>
                        {this.state.budgetYear.map((budgetYear, key) =>
                            <Fragment>
                                <Dropdown.Item key={key} onClick={() => this.getDegreeProjects(budgetYear.year)}>{budgetYear.year}</Dropdown.Item>
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
                        <th>{this.props.info.myDegreeProjects.credits}</th>
                        <th>{this.props.info.myDegreeProjects.degreeTitle}</th>
                        <th>{this.props.info.myDegreeProjects.numOfStudents}</th>
                        <th>{this.props.info.myDegreeProjects.startDate}</th>
                        <th>{this.props.info.myDegreeProjects.endDate}</th>
                        <th>{this.props.info.myDegreeProjects.withinTimeLimit}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.projects.map((project, key) =>
                        < tr key={key} className="pressForInfo" >
                            <td key={"credits: " + key} className="pressForInfo" >{project.credits}</td>
                            <td key={"degreeTitle: " + key} > {project.project_title}</td>
                            <td key={"numOfStudents: " + key} > {project.number_of_students}</td>
                            <td key={"startDate: " + key} > {project.start_date.split('T')[0]}</td>
                            <td key={"endDate: " + key} > {project.end_date.split('T')[0]}</td>
                            <td key={"withinTimeLimit: " + key} > {project.out_of_date === 1 ? this.props.info.general.no : this.props.info.general.yes}</td>
                            <td key={"moreInfo: " + key} > {this.renderFullProject(project)}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    showInfo(id, state) {
        let list = this.state.showUser;
        list[id] = state;
        this.setState({ showUser: list })
    }
    renderFullProject(project) {
        return (
            <Fragment>
                <Button variant="primary" className="ml-auto" id={project.project_id} onClick={() => this.showInfo(project.project_id, true)}>{this.props.info.myDegreeProjects.info}</Button>
                <Modal
                    centered
                    show={this.state.showUser[project.project_id]}
                    onHide={() => this.showInfo(project.project_id, false)}
                    animation={true}
                    size='xl'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.info.myDegreeProjects.project}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DegreeProject info={this.props.info} project={project} showInfo={this.showInfo} id={project.project_id} year={this.state.currentBudgetYear}/>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
    render() {
        return (
            <div className="container">
                <Access access='3' info={this.props.info.access} />
                {this.state.redirect ? <Redirect to='/' /> : ""}
                
                <h1>{this.props.info.myDegreeProjects.title}</h1>
                <p>{this.props.info.myDegreeProjects.paragraph0} {this.renderDropDownYear()}</p>
                {this.renderTable()}
            </div>
        );
    };
}
export default MyDegreeProjects