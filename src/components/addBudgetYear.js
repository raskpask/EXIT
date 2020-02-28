import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import '../resources/css/form.css';

class AddBudgetYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetYears: [
                {
                    budgetYear: "",
                    masterHours: "",
                    bachleorHours: "",
                    factor2: "",
                    factor3: "",
                    factor4: "",
                    factor5: "",
                    factor6: "",
                }
            ]
        }
    }
    renderForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.specifiedBudgetYears.budgetYear}</Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.budgetYear}
                                placeholder={this.props.info.addBudgetYear.budgetYearPlaceholder}
                                onChange={event => this.setState({ budgetYear: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.masterHours}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.masterHours}
                            placeholder={this.props.info.addBudgetYear.masterHoursPlaceholder}
                            onChange={event => this.setState({ masterHours: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.bachleorHours}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.bachleorHours}
                            placeholder={this.props.info.addBudgetYear.bachleorHoursPlaceholder}
                            onChange={event => this.setState({ bachleorHours: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor2}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor2}
                            placeholder={this.props.info.addBudgetYear.factor2Placeholder}
                            onChange={event => this.setState({ factor2: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor3}</Form.Label>
                        <Form.Control
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
                            type="number"
                            value={this.state.factor5}
                            placeholder={this.props.info.addBudgetYear.factor5Placeholder}
                            onChange={event => this.setState({ factor5: event.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.specifiedBudgetYears.factor6}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.factor6Placeholder}
                            placeholder={this.props.info.addBudgetYear.factor6Placeholder}
                            onChange={event => this.setState({ factor6: event.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="alignCenter ">
                        <Button className= "marginButton ">{this.props.info.addBudgetYear.submit}</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
    render() {
        return (
            <div className="container">
                <h1>{this.props.info.addBudgetYear.title}</h1>
                <p>{this.props.info.addBudgetYear.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddBudgetYear