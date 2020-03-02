import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import Access from './fragments/access';

class SpecifyTutoringHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            numberOfHours: "",
            budgetYear: ""
        }
    }
    specifyTutoringHours = (e) => {
        e.preventDefault();
        axios
            .post('/api/user', this.getTutoringHours())
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
                this.resetFields()
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })
    }
    getTutoringHours() {
        return {
            email: this.state.username + "@kth.se",
            numberOfHours: this.state.numberOfHours,
            budgetYear: this.state.bugetYear
        }
    }
    resetFields() {
        this.setState({
            username: "",
            numberOfHours: "",
            budgetYear: ""
        })
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.specifyTutoringHours(e)}>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.bugetYear}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.bugetYear}
                            placeholder={this.props.info.specifyTutoringHours.budgetYearPlaceholder}
                            onChange={event => this.setState({ bugetYear: event.target.value })}
                        />
                    </Col>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.username}</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.specifyTutoringHours.usernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                    </Col>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.numberOfHours}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.numberOfHours}
                            placeholder={this.props.info.specifyTutoringHours.numberOfHoursPlaceholder}
                            onChange={event => this.setState({ numberOfHours: event.target.value })}
                        />
                    </Col>
                </Row>
                <Button className="marginTop" type="submit">{this.props.info.addBudgetYear.submit}</Button>
            </Form>
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='2' info={this.props.info.access} />
                <h1>{this.props.info.specifyTutoringHours.title}</h1>
                <p>{this.props.info.specifyTutoringHours.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default SpecifyTutoringHours