import React, { Component, Fragment } from 'react';
import { Col, Row, Form, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Access from './fragments/access';

import '../resources/css/profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear: new Date().getFullYear(),
            budgetYear: [],
            year: "",
            edit: false,
            hoursOfWork: {
                work_year: {
                    work_hours_examiner: "",
                    work_hours_supervisor: "",
                    available_hours_examiner: "",
                    available_hours_supervisor: ""
                }
            },
            expertise: ""
            // work_hours_examiner: "",
            // work_hours_supervisor: "",
            // available_hours_examiner: "",
            // available_hours_supervisor: "",
            // expertise_name:""
        }
    }
    componentDidMount() {
        this.getProfile(this.state.currentYear)
        this.getBudgetYears()
    }
    getProfile = (year) => {
        const response = axios
            .get('/api/profile', {
                params: {
                    year: year
                }
            })
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({ hoursOfWork: res.data.workYear, currentYear: year, expertise: res.data.expertise[0].expertise_name })
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.profile.budgetYearFail)
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
                console.error(err)
                toast(this.props.info.availableExaminers.fail)
            })
    }
    postCompetence = () => {
        axios
            .put('/api/expertise', {expertise: this.state.expertise})
            .then(res => {
                if (res.status === 200) {
                    toast(this.props.info.profile.saved)
                }
            })
            .catch(err=>{
                console.error(err)
                toast(this.props.info.profile.saveFaild)
            })
    }
    editCompetence() {
        this.setState({ edit: true })
        this.forceUpdate()
    }
    saveCompetence() {
        this.setState({ edit: false })
        this.postCompetence()
        this.forceUpdate()
    }
    renderCompetenceAreaEdit() {
        return (
            <Row>
                <Col md={4}>
                    {this.props.info.profile.competenceArea}
                </Col>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows="3"
                        placeholder={this.props.info.profile.competenceAreaPlaceholder}
                        value={this.state.expertise}
                        onChange={event => this.setState({ expertise: event.target.value })}
                    />
                    <Button className="buttonMarginSave" onClick={() => this.saveCompetence()}>{this.props.info.profile.save}</Button>
                </Col>
            </Row>
        )
    }
    renderCompetenceArea() {
        return (
            <Row>
                <Col md={4}>
                    {this.props.info.profile.competenceArea}
                </Col>
                <Col md={6}>
                    {this.state.expertise}
                </Col>
                <Col md={2} className="alignRight">
                    <Button onClick={() => this.editCompetence()}>{this.props.info.profile.edit}</Button>
                </Col>
            </Row>
        )
    }
    renderProfile() {
        return (
            <Card className="cardFormat">
                <Row>
                    <Col md={4}>
                        {this.props.info.profile.totalExaminerHours}:
                    </Col>
                    <Col md={4}>
                        {this.state.hoursOfWork.work_year.work_hours_examiner}
                    </Col>
                    <Col className="alignRight">
                        {this.renderChangeYear()}
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        {this.props.info.profile.reamainingExaminerHours}:
                    </Col>
                    <Col md={8}>
                        {this.state.hoursOfWork.work_year.available_hours_examiner}
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        {this.props.info.profile.totalSupervisorHours}:
                    </Col>
                    <Col md={4}>
                        {this.state.hoursOfWork.work_year.work_hours_supervisor}
                    </Col>
                </Row>
                <Row className="marginButtom">
                    <Col md={4}>
                        {this.props.info.profile.reamainingSupervisorHours}:
                    </Col>
                    <Col md={8}>
                        {this.state.hoursOfWork.work_year.available_hours_supervisor}
                    </Col>
                </Row>
                {this.state.edit ? this.renderCompetenceAreaEdit() : this.renderCompetenceArea()}
            </Card>
        )
    }
    renderChangeYear() {
        return (
            <DropdownButton id="dropdown-basic-button" title={this.props.info.availableExaminers.changeYear + ": " + this.state.currentYear}>
                {this.state.budgetYear.map((budgetYear, key) =>
                    <Fragment>
                        <Dropdown.Item onClick={() => this.getProfile(budgetYear.year)}>{budgetYear.year}</Dropdown.Item>
                    </Fragment>
                )}
            </DropdownButton>
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='3' info={this.props.info.access} />
                <h1>{this.props.info.profile.title}</h1>
                <p>{this.props.info.profile.paragraph0}</p>
                {this.renderProfile()}
            </div>
        );
    };
}
export default Profile