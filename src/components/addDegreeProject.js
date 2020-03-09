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
            students: [
                {
                    name: "",
                    email: ""
                },
            ],
            supervisor: "",
            projectTitle: "",
            numberOfStudents: 1,
            projectDescription: "",
            credits: "",
            startDate: "",
            endDate: "",
            companyName: "",
            companyAddress: "",
            companyPhone: "",
        }
    }
    addProject = (e) => {
        e.preventDefault();
        const project = this.createProject()

        axios
            .post('/api/project', project)
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
                this.resetValues()
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })

    }
    resetValues() {
        this.setState({
            projectTitle: "",
            numberOfStudents: 1,
            students: [
                {
                    name: "",
                    email: ""
                },
            ],
            supervisor: "",
            projectDescription: "",
            credits: "",
            startDate: "",
            endDate: "",
            companyName: "",
            companyAddress: "",
            companyPhone: "",
        })
    }
    createProject() {
        const startDates = this.state.startDate.toLocaleDateString().split('/')
        const endDates = this.state.endDate.toLocaleDateString().split('/')
        return {
            title: this.state.projectTitle,
            numberOfStudents: this.state.numberOfStudents,
            students: this.state.students,
            projectDescription: this.state.projectDescription,
            credits: this.state.credits,
            startDate: startDates[2] + '-' + startDates[0] + '-' + startDates[1],
            endDate: endDates[2] + '-' + endDates[0] + '-' + endDates[1],
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress,
            companyPhone: this.state.companyPhone,
        }
    }
    handleChangeStudent(value, type, index) {
        let studentsTemp = this.state.students
        if (type === 'name') {
            studentsTemp[index].name = value
        } else {
            studentsTemp[index].email = value
        }
        this.setState({ students: studentsTemp })
    }
    addStudent() {
        let studentsTemp = this.state.students
        let numberOfStudentsTemp = this.state.numberOfStudents
        numberOfStudentsTemp++
        studentsTemp.push({ name: "", email: "" })
        this.setState({ numberOfStudents: numberOfStudentsTemp, students: studentsTemp })
    }
    removeStudent() {
        let studentsTemp = this.state.students
        let numberOfStudentsTemp = this.state.numberOfStudents
        numberOfStudentsTemp--
        studentsTemp.pop({ name: "", email: "" })
        this.setState({ numberOfStudents: numberOfStudentsTemp, students: studentsTemp })
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.addProject(e)}>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.projectTitle}</Form.Label>
                            <Form.Control
                                required
                                as="input"
                                type="text"
                                value={this.state.projectTitle}
                                placeholder={this.props.info.addDegreeProject.projectTitlePlaceholder}
                                onChange={event => this.setState({ projectTitle: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {this.state.students.map((student, key) =>
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>{this.props.info.addDegreeProject.studentName}</Form.Label>
                                <Form.Control
                                    as="input"
                                    type="text"
                                    value={student.name}
                                    placeholder={this.props.info.addDegreeProject.studentNamePlaceholder}
                                    onChange={event => this.handleChangeStudent(event.target.value, 'name', key)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>{this.props.info.addDegreeProject.kthUsername}</Form.Label>
                                <Form.Control
                                    required
                                    as="input"
                                    type="text"
                                    value={student.email}
                                    placeholder={this.props.info.addDegreeProject.kthUsernamePlaceholder}
                                    onChange={event => this.handleChangeStudent(event.target.value, 'email', key)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col></Col>
                    <Col className="alignCenter">
                        <Button onClick={() => this.addStudent()}>{this.props.info.addDegreeProject.addStudent}</Button>
                    </Col>
                    <Col className="alignCenter">
                        <Button variant="danger" disabled={this.state.numberOfStudents === 1} onClick={() => this.removeStudent()}>{this.props.info.addDegreeProject.removeStudent}</Button>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
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
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.supervisor}</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.supervisor}
                                placeholder={this.props.info.addDegreeProject.supervisorPlaceholder}
                                onChange={event => this.setState({ supervisor: event.target.value })}
                            />
                        </Form.Group>
                    </Col>
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
                                    dateFormat="yyyy/MM/dd"
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