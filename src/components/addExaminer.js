
import React, { Component } from 'react';

import { Form, Button, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import Access from './fragments/access';
import redirect from './../model/redirect';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';

class AddExaminer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: 0,
            username: "",
        }
    }
    addUser = (e) => {
        e.preventDefault();
        axios
            .post('/api/user', { kth_username: this.state.username, user_type_id: 3 })
            .then(res => {
                toast(this.props.info.addExaminer.added)
                this.setState({ username: "" })
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.log(err)
                    toast(this.props.info.addExaminer.fail)
                }

            })
    }
    renderPopoverInfo(text) {
        return (
            <Popover className="popover" id="popover-basic">
                {text}
            </Popover>
        );
    }
    renderAdd() {
        return (
            <Form onSubmit={(e) => this.addUser(e)}>
                <Row>
                    <Col md={8}>
                        <Form.Label>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={this.renderPopoverInfo(this.props.info.addExaminer.kthUsernameInfo)}
                            >
                                <Button variant="text" className="textButton">{this.props.info.addExaminer.kthUsername}*</Button>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.username}
                            placeholder={this.props.info.addExaminer.kthUsernamePlaceholder}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                        <Button className="marginTop" type="submit">{this.props.info.addBudgetYear.submit}</Button>
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
                {this.state.redirect ? <Redirect to='/' /> : ""}
                
                <h1>{this.props.info.addExaminer.title}</h1>
                <p>{this.props.info.addExaminer.paragraph0}</p>
                {this.renderAdd()}
            </div>
        );
    };
}
export default AddExaminer