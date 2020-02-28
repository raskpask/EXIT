import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

import '../resources/css/form.css';

class AddDirectorOfStudies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    renderAdd() {
        return (
            <Form>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.addDirectorOfStudies.username}</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.addDirectorOfStudies.usernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                        <Button className="marginTop ">{this.props.info.addDirectorOfStudies.submit}</Button>
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
                <h1>{this.props.info.addDirectorOfStudies.title}</h1>
                <p>{this.props.info.addDirectorOfStudies.paragraph0}</p>
                {this.renderAdd()}
            </div>
        );
    };
}
export default AddDirectorOfStudies