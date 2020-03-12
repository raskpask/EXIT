
import React, { Component } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import Access from './fragments/access';

class AddExaminer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }
    addUser = (e) => {
        e.preventDefault();
        axios
            .post('/api/user', { kth_username: this.state.username })
            .then(res => {
                toast(this.props.info.addExaminer.added)
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addExaminer.fail)
            })
    }
    renderAdd() {
        return (
            <Form onSubmit={(e) => this.addUser(e)}>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.addExaminer.kthUsername}</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.addExaminer.kthUsernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                        <Button className="marginTop"type="submit">{this.props.info.addBudgetYear.submit}</Button>
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
                <Access access='3' info={this.props.info.access} />
                <h1>{this.props.info.addExaminer.title}</h1>
                <p>{this.props.info.addExaminer.paragraph0}</p>
                {this.renderAdd()}
            </div>
        );
    };
}
export default AddExaminer