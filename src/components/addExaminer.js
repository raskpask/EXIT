
import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

import '../resources/css/form.css';

class AddExaminer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    addUser() {

    }
    renderAdd() {
        return (
            <Form>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.addExaminer.kthUsername}</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.addExaminer.kthUsernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                        <Button className="marginTop ">{this.props.info.addBudgetYear.submit}</Button>
                    </Col>
                    <Col md={4} className="alignCenter ">
                        
                    </Col>
                </Row>
            </Form>
        )
    }
    render() {
        return (
            <div className="container">
                <h1>{this.props.info.addExaminer.title}</h1>
                <p>{this.props.info.addExaminer.paragraph0}</p>
                {this.renderAdd()}
            </div>
        );
    };
}
export default AddExaminer