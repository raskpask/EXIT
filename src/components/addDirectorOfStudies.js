import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import Access from './fragments/access';

class AddDirectorOfStudies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    addDirector = (e) => {
        e.preventDefault();
        const email = this.state.username + "@kth.se"
        axios
            .post('/api/user', { email: email })
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
                this.setState({username: ""})
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })
    }
    renderAdd() {
        return (
            <Form onSubmit={(e) => this.addDirector(e)} >
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.addDirectorOfStudies.username}</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.addDirectorOfStudies.usernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                        <Button className="marginTop" type="submit">{this.props.info.addDirectorOfStudies.submit}</Button>
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
                <Access access='1' info={this.props.info.access} />
                <h1>{this.props.info.addDirectorOfStudies.title}</h1>
                <p>{this.props.info.addDirectorOfStudies.paragraph0}</p>
                {this.renderAdd()}
            </div>
        );
    };
}
export default AddDirectorOfStudies