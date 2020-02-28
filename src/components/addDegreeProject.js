import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import '../resources/css/home.css';
import '../resources/css/form.css';

class AddDegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfStudents: "",
            projectDescription: "",
            credits: "",
            startDate: "",
            endDate: "",
            companyName: "",
            companyAddress: "",
            companyPhone: "",
        }
    }
    componentDidUpdate() {
        console.log(this.state)
    }
    renderForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.numOfStudents}</Form.Label>
                            <Form.Control
                                as="input"
                                type="number"
                                value={this.state.numberOfStudents}
                                placeholder={this.props.info.addDegreeProject.numOfStudentsPlaceholder}
                                onChange={event => this.setState({ numberOfStudents: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.credits}</Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.credits}
                                placeholder={this.props.info.addDegreeProject.credits}
                                onChange={event => this.setState({ credits: event.target.value })}
                            />
                        </Form.Group></Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.startDate}</Form.Label>
                            <Form>
                                <DatePicker
                                    className="dateBox"
                                    selected={this.state.startDate}
                                    onChange={date => this.setState({ startDate: date })}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={this.props.info.addDegreeProject.startDatePlaceholder}
                                    todayButton={this.props.info.addDegreeProject.today}
                                />
                            </Form>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.endDate}</Form.Label>
                            <Form>
                                <DatePicker
                                    className="dateBox"
                                    selected={this.state.endDate}
                                    onChange={date => this.setState({ endDate: date })}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={this.props.info.addDegreeProject.endDatePlaceholder}
                                />
                            </Form>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>{this.props.info.addDegreeProject.projectDescription}</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows="3"
                        value={this.state.projectDescription}
                        placeholder={this.props.info.addDegreeProject.projectDescriptionPlaceholder}
                        onChange={event => this.setState({ projectDescription: event.target.value })}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.companyName}</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.companyName}
                                placeholder={this.props.info.addDegreeProject.companyNamePlaceholder}
                                onChange={event => this.setState({ companyName: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.companyAddress}</Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.companyAddress}
                                placeholder={this.props.info.addDegreeProject.companyAddressPlaceholder}
                                onChange={event => this.setState({ companyAddress: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.companyPhone}</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.companyPhone}
                                placeholder={this.props.info.addDegreeProject.companyPhonePlaceholder}
                                onChange={event => this.setState({ companyPhone: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="alignCenter">
                        <Button>{this.props.info.addDegreeProject.sumbit}</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
    render() {
        return (
            <div className="container marginBottom">
                <h1>{this.props.info.addDegreeProject.title}</h1>
                <p>{this.props.info.addDegreeProject.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddDegreeProject