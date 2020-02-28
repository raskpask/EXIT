import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import '../resources/css/form.css';

class SpecifyTutoringHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            numberOfHours: "",
            budgetYear: ""
        }
    }
    renderForm() {
        return (
            <Form>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.bugetYear}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.bugetYear}
                            placeholder={this.props.info.specifyTutoringHours.budgetYearPlaceholder}
                            onChange={event => this.setState({ bugetYear: event.target.value })}
                        />
                    </Col>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.email}</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            placeholder={this.props.info.specifyTutoringHours.emailPlaceholder}
                            onChange={event => this.setState({ email: event.target.value })}
                        />
                    </Col>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.numberOfHours}</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.numberOfHours}
                            placeholder={this.props.info.specifyTutoringHours.numberOfHoursPlaceholder}
                            onChange={event => this.setState({ numberOfHours: event.target.value })}
                        />
                    </Col>
                </Row>
                    <Button className="marginTop ">{this.props.info.addBudgetYear.submit}</Button>
            </Form>
        )
    }
    render() {
        return (
            <div className="container">
                <h1>{this.props.info.specifyTutoringHours.title}</h1>
                <p>{this.props.info.specifyTutoringHours.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default SpecifyTutoringHours