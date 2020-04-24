import React, { Component } from 'react';
import { Form, Button, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';

import Access from './fragments/access';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';
import redirect from './../model/redirect';

class AddBudgetYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: 0,
            budgetYear: "",
            masterHoursExaminer: 20,
            masterHoursSupervisor: 20,
            bachleorHoursExaminer: 10,
            bachleorHoursSupervisor: 10,
            factor2: 1.5,
            factor3: 2.25,
            factor4: 3,
            factor5: 3.75
        }
    }
    addBudgetYear = (e) => {
        e.preventDefault();
        axios
            .post('/api/budgetYear', this.createBudgetYear())
            .then(res => {
                toast(this.props.info.addBudgetYear.added)
                this.resetBudgetYear()
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.addBudgetYear.fail)
                }
            })
    }
    createBudgetYear() {
        const budgetYear = {
            budgetYear: this.state.budgetYear,
            masterHoursExaminer: this.state.masterHoursExaminer,
            masterHoursSupervisor: this.state.masterHoursSupervisor,
            bachelorHoursExaminer: this.state.bachleorHoursExaminer,
            bachelorHoursSupervisor: this.state.bachleorHoursSupervisor,
            factor1: 1,
            factor2: this.state.factor2,
            factor3: this.state.factor3,
            factor4: this.state.factor4,
            factor5: this.state.factor5
        }
        return budgetYear
    }
    resetBudgetYear() {
        this.setState({
            budgetYear: "",
            masterHoursExaimer: "",
            masterHoursSupervisor: "",
            bachleorHoursExaminer: "13",
            bachleorHoursSupervisor: "13",
            factor2: "",
            factor3: "",
            factor4: "",
            factor5: ""
        })
    }
    renderPopoverInfo(text) {
        return (
            <Popover className="popover" id="popover-basic">
                {text}
            </Popover>
        );
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.addBudgetYear(e)} >
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                <OverlayTrigger
                                    placement="auto"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.budgetYearInfo)}
                                >
                                    <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.budgetYear}*</Button>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={this.state.budgetYear}
                                placeholder={this.props.info.addBudgetYear.budgetYearPlaceholder}
                                onChange={event => this.setState({ budgetYear: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.masterHoursExaminerInfo)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.masterHoursExaminer}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.masterHoursExaminer}
                            placeholder={this.props.info.specifiedBudgetYears.masterHoursExaminerPlaceholder}
                            onChange={event => this.setState({ masterHoursExaminer: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.masterHoursSupervisorInfo)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.masterHoursSupervisor}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.masterHoursSupervisor}
                            placeholder={this.props.info.specifiedBudgetYears.masterHoursSupervisorPlaceholder}
                            onChange={event => this.setState({ masterHoursSupervisor: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.bachleorHoursExaminerInfo)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.bachleorHoursExaminer}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.bachleorHoursExaminer}
                            placeholder={this.props.info.specifiedBudgetYears.bachleorHoursExaminerPlaceholder}
                            onChange={event => this.setState({ bachleorHoursExaminer: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.bachleorHoursSupervisorInfo)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.bachleorHoursSupervisor}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.bachleorHoursSupervisor}
                            placeholder={this.props.info.specifiedBudgetYears.bachleorHoursSupervisorPlaceholder}
                            onChange={event => this.setState({ bachleorHoursSupervisor: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.factor2Info)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.factor2}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor2}
                            placeholder={this.props.info.addBudgetYear.factor2Placeholder}
                            onChange={event => this.setState({ factor2: event.target.value })}
                        />
                    </Col>

                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.factor3Info)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.factor3}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor3}
                            placeholder={this.props.info.addBudgetYear.factor3Placeholder}
                            onChange={event => this.setState({ factor3: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.factor4Info)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.factor4}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor4}
                            placeholder={this.props.info.addBudgetYear.factor4Placeholder}
                            onChange={event => this.setState({ factor4: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addBudgetYear.factor5Info)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.specifiedBudgetYears.factor5}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor5}
                            placeholder={this.props.info.addBudgetYear.factor5Placeholder}
                            onChange={event => this.setState({ factor5: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="alignCenter ">
                        <Button className="marginButton" type="submit">{this.props.info.addBudgetYear.submit}</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='2' info={this.props.info.access} />
                {this.state.redirect ? <Redirect to='/' />: ""}

                <h1>{this.props.info.addBudgetYear.title}</h1>
                <p>{this.props.info.addBudgetYear.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddBudgetYear