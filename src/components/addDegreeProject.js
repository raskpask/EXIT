import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { toast } from 'react-toastify';
import Access from './fragments/access';

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
    componentDidUpdate(){
        console.log(this.state.startDate)
    }
    addProject = (e) => {
        e.preventDefault();
        axios
            .post('/api/project', this.createProject())
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })
    }
    createProject() {
        const startDates = this.state.startDate.toLocaleDateString().split('/')
        const endDates = this.state.endDate.toLocaleDateString().split('/')
        return {
            numberOfStudents: this.state.numberOfStudents,
            projectDescription: this.state.projectDescription,
            credits: this.state.credits,
            startDate: startDates[2]+'-'+startDates[0]+'-'+startDates[1],
            endDate: endDates[2]+'-'+endDates[0]+'-'+endDates[1],
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress,
            companyPhone: this.state.companyPhone,
        }
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.addProject(e)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.numOfStudents}</Form.Label>
                            <Form.Control
                                required
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
                                required
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
                                    onChange={date => this.setState({ startDate: date})}
                                    dateFormat="yyyy/MM/dd"
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
                        required
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
                                type="text"
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
                                type="number"
                                value={this.state.companyPhone}
                                placeholder={this.props.info.addDegreeProject.companyPhonePlaceholder}
                                onChange={event => this.setState({ companyPhone: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="alignCenter">
                        <Button type="submit">{this.props.info.addDegreeProject.sumbit}</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
    render() {
        return (
            <div className="container marginBottom">
                <Access access='3' info={this.props.info.access} />
                <h1>{this.props.info.addDegreeProject.title}</h1>
                <p>{this.props.info.addDegreeProject.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddDegreeProject