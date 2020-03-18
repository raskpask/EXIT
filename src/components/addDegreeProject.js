import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axios from 'axios';
import { toast } from 'react-toastify';

import redirect from './../model/redirect';
import Access from './fragments/access';
import dbErrors from '../model/dbErrors';
import { Redirect } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

import '../resources/css/home.css';
import '../resources/css/form.css';

class AddDegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTypes: [
                {
                    name: this.props.info.addDegreeProject.masterProject,
                    credits: 30
                },
                {
                    name: this.props.info.addDegreeProject.bachleorProject,
                    credits: 15
                },
            ],
            redirect: 0,
            year: new Date().getFullYear(),
            supervisors: [],
            students: [
                {
                    name: "",
                    email: ""
                },
            ],
            supervisor: "",
            supervisor_id: "",
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
    componentDidMount() {
        this.getSupervisors()
    }
    addProject = (e) => {
        e.preventDefault();
        const project = this.createProject()

        axios
            .post('/api/project', project)
            .then(res => {
                toast(this.props.info.addDegreeProject.added)
                this.resetValues()
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.log(err)
                    toast(this.props.info.addDegreeProject.fail)
                }
            })

    }
    getSupervisors = () => {
        axios
            .get('/api/availableSupervisors', {
                params: {
                    year: this.state.year
                }
            })
            .then(res => {
                if (res.status === 200 && res.data !== '') {
                    this.setState({ supervisors: res.data })
                } else {
                    toast(this.props.info.addDegreeProject.getFail)
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.addDegreeProject.getFail)
                }
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
            supervisor_id: this.state.supervisor_id,
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
    async handleChangeStartDate(date) {
        console.log(date.getFullYear())
        await this.setState({ startDate: date, year: date.getFullYear() })
        this.getSupervisors()
    }
    handleChangeForm(value){
        if(value){
            if(value.credits){
                this.setState({ credits: value.credits })
            } else if(value.user_id){
                this.setState({ supervisor_id: value.user_id })
            }
        }
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
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.startDate}</Form.Label>
                            <Form>
                                <DatePicker
                                    className="dateBox"
                                    selected={this.state.startDate}
                                    onChange={date => this.handleChangeStartDate(date)}
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
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>{this.props.info.addDegreeProject.credits}</Form.Label>
                            <Typeahead
                                id="changeCredit"
                                labelKey={(option) => `${option.name}`}
                                placeholder={this.props.info.addDegreeProject.creditsPlaceholder}
                                onChange={event => this.handleChangeForm(event[0])}
                                options={this.state.projectTypes}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>{this.props.info.addDegreeProject.supervisor}</Form.Label>
                        <Typeahead
                            id="changeSupervisor"
                            labelKey={(option) => `${option.first_name} ${option.last_name} (${option.email})`}//{"" +option.first_name +option.last_name +" "+option.email +""}}
                            placeholder={this.props.info.addDegreeProject.supervisorPlaceholder}
                            selected={this.state.supervisor}
                            onChange={event => this.handleChangeForm(event[0])}
                            options={this.state.supervisors}
                        />
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
                {/* <Access access='3' info={this.props.info.access} />
                {this.state.redirect ? <Redirect to='/' /> : ""} */}

                <h1>{this.props.info.addDegreeProject.title}</h1>
                <p>{this.props.info.addDegreeProject.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default AddDegreeProject