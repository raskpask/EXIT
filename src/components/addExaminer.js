
import React, { Component } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/form.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Access from './fragments/access';

class AddExaminer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            examiners: [],
        }
    }
    componentDidMount(){
        this.getExaminers()
    }
    addUser = (e) => {
        e.preventDefault();
        const email = this.state.username + "@kth.se"
        axios
            .post('/api/user', { email: email })
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })
    }
    getExaminers = () =>{
        axios
        .get('/api/user')
        .then(res=>{
            this.setState({examiners: res.data})
        })
        .catch(err => {
            console.log(err)
            toast(this.props.info.addDirectorOfStudies.getFail)
        })
    }
    renderAdd() {
        return (
            <Form onSubmit={(e) => this.addUser(e)}>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.addExaminer.kthUsername}</Form.Label>
                        <Typeahead
                            id="addExaminer"
                            labelKey={(option) => `${option.first_name} ${option.last_name} (${option.email})`}
                            placeholder={this.props.info.addDegreeProject.supervisorPlaceholder}
                            selected={this.state.examiners}
                            onChange={event => this.setState({ examiner_id: event[0].user_id })}
                            options={this.state.examiners}
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