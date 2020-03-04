import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import Access from './fragments/access';

class AddBudgetYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetYear: "",
            masterHours: "",
            bachleorHours: "",
            totalTutoringHours: "",
            factor1: "",
            factor2: "",
            factor3: "",
            factor4: "",
            factor5: ""
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
                console.error(err)
                toast(this.props.info.addBudgetYear.fail)
            })
    }
    createBudgetYear() {
        const budgetYear = {
            budgetYear: this.state.budgetYear,
            masterHours: this.state.masterHours,
            bachleorHours: this.state.bachleorHours,
            totalTutoringHours: this.state.totalTutoringHours,
            factor1: this.state.factor1,
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
            masterHours: "",
            bachleorHours: "",
            totalTutoringHours: "",
            factor1: "",
            factor2: "",
            factor3: "",
            factor4: "",
            factor5: ""
        })
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.addBudgetYear(e)} >
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.specifiedBudgetYears.budgetYear}</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={this.state.budgetYear}
                                placeholder={this.props.info.addBudgetYear.budgetYearPlaceholder}
                                onChange={event => this.setState({ budgetYear: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.totalTutoringHours}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.totalTutoringHours}
                            placeholder={this.props.info.addBudgetYear.totalTutoringHoursPlaceholder}
                            onChange={event => this.setState({ totalTutoringHours: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.masterHours}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.masterHours}
                            placeholder={this.props.info.addBudgetYear.masterHoursPlaceholder}
                            onChange={event => this.setState({ masterHours: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.bachleorHours}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.bachleorHours}
                            placeholder={this.props.info.addBudgetYear.bachleorHoursPlaceholder}
                            onChange={event => this.setState({ bachleorHours: event.target.value })}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor1}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.factor1}
                            placeholder={this.props.info.addBudgetYear.factor1Placeholder}
                            onChange={event => this.setState({ factor1: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor2}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.factor2}
                            placeholder={this.props.info.addBudgetYear.factor2Placeholder}
                            onChange={event => this.setState({ factor2: event.target.value })}
                        />
                    </Col>

                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor3}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.factor3}
                            placeholder={this.props.info.addBudgetYear.factor3Placeholder}
                            onChange={event => this.setState({ factor3: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor4}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor4}
                            placeholder={this.props.info.addBudgetYear.factor4Placeholder}
                            onChange={event => this.setState({ factor4: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor5}</Form.Label>
                        <Form.Control
                            required
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
                <h1>{this.props.info.addBudgetYear.title}</h1>
                <p>{this.props.info.addBudgetYear.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddBudgetYear