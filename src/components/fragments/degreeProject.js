import React, { Component, Fragment } from 'react';
import { Nav, Card, ListGroup, Form, Button, Row, Col, Table, Popover, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import '../../resources/css/degreeProject.css';
import dbErrors from '../../model/dbErrors';
import redirect from './../../model/redirect';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify';
class DegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisors: [],
            project: this.props.project,
            notes: this.props.project.notes,
            supervisor_id: "",
            in_progress: this.props.project.in_progress,
            bodyContent: this.renderInfo(),
        }
    }
    componentDidMount() {
        this.getSupervisors()
    }
    makeNote() {
        return (
            this.state.notes + ";\n;\n" +
            (new Date()).toString().split('GMT')[0] + ";\n" +
            this.state.comment
        )
    }
    postComment = () => {
        axios
            .put('/api/notes', { message: this.makeNote(), projectID: this.props.project.project_id })
            .then(res => {
                if (res.status === 200) {
                    toast(this.props.info.profile.saved)
                    axios
                        .get('/api/project', {
                            params: {
                                year: this.props.year
                            }
                        })
                        .then(res => {
                            if (res.status === 200) {
                                let projectIndex;
                                res.data.forEach((project, index) => {
                                    if (project.project_id === this.props.project.project_id) {
                                        projectIndex = index;
                                    }
                                })
                                this.setState({ notes: res.data[projectIndex].notes })
                                this.setState({ bodyContent: this.renderCompetenceArea(), comment: null })
                            }
                        })
                        .catch(err => {
                            if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                                redirect.removeCookies()
                                this.setState({ redirect: 1 })
                                toast(this.props.info.general.sessionFail)
                            } else {
                                console.error(err)
                                toast(this.props.info.myDegreeProjects.fail)
                            }
                        })
                }
            })
            .catch(err => {
                if (err.response.data === dbErrors.errorCodes.INVALID_SESSION.code || err.response.data === dbErrors.errorCodes.NO_ACCESS_ERROR.code) {
                    redirect.removeCookies()
                    this.setState({ redirect: 1 })
                    toast(this.props.info.general.sessionFail)
                } else {
                    console.error(err)
                    toast(this.props.info.profile.saveFaild)
                }
            })
    }
    deleteProject = () => {
        const payload = {
            project_id: this.props.project.project_id
        }
        axios
            .delete('/api/project', { data: payload })
            .then(res => {
                if (res.status === 200) {
                    toast(this.props.info.degreeProject.projectDeleted)
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.degreeProject.projectDeletedFail)
            })
        this.forceUpdate()
    }
    saveUpdates = (e) => {
        e.preventDefault();
        if (this.state.supervisor_id) {
            const data = {
                supervisor_id: this.state.supervisor_id,
                project_id: this.props.project.project_id
            }
            axios
                .put('/api/project', data)
                .then(res => {
                    if (res.status === 200) {
                        toast(this.props.info.degreeProject.updateSuccess)
                    }
                })
                .catch(err => {
                    console.error(err)
                    toast(this.props.info.degreeProject.updateFail)
                })
        }
        const data = {
            projectID: this.props.project.project_id,
            projectStatus: this.state.in_progress ? 1 : 0
        }
        axios
            .put('api/projectStatus', data)
            .then(res => {
                if (res.status === 200) {
                    toast(this.props.info.degreeProject.updateSuccess)
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.degreeProject.updateFail)
            })
    }
    getSupervisors = () => {
        axios
            .get('/api/availableSupervisors', {
                params: {
                    year: this.props.project.start_date.split('-')[0]
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
                console.error(err)
                toast(this.props.info.addDegreeProject.getFail)
            })
    }
    renderInfo() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.info.addDegreeProject.numOfStudents}: {this.props.project.number_of_students}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.credits}: {this.props.project.credits}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.startDate}: {this.props.project.start_date.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.endDate}: {this.props.project.end_date.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.degreeProject.inProgess}: {this.props.project.in_progress ? this.props.info.general.yes : this.props.info.general.no}</ListGroup.Item>
            </ListGroup>
        )
    }
    renderCompany() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyName}: {this.props.project.company_name}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyAddress}: {this.props.project.company_address}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyPhone}: {this.props.project.company_phone_number}</ListGroup.Item>
            </ListGroup>
        )
    }
    renderPersons() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.degreeProject.projectRole}</th>
                        <th>{this.props.info.general.name}</th>
                        <th>{this.props.info.general.email}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.project.users.map((user, key) =>
                        < tr key={key} className="pressForInfo" >
                            {this.renderPerson(user, key)}
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
    renderPerson(user, key) {
        if (user.project_role_id === 1) {
            return (
                <Fragment>
                    <td key={"role: " + key} className="pressForInfo" > {this.props.info.degreeProject.examiner}</td>
                    <td key={"name: " + key} > {user.first_name}</td>
                    <td key={"email: " + key} > {user.email}</td>
                </Fragment>
            )
        } else if (user.project_role_id === 2) {
            return (
                <Fragment>
                    <td key={"role: " + key} className="pressForInfo" > {this.props.info.degreeProject.supervisor}</td>
                    <td key={"name: " + key} > {user.first_name}</td>
                    <td key={"email: " + key} > {user.email}</td>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <td key={"role: " + key} className="pressForInfo" > {this.props.info.degreeProject.student}</td>
                    <td key={"name: " + key} > {user.first_name}</td>
                    <td key={"email: " + key} > {user.email}</td>
                </Fragment>
            )
        }
    }
    renderEdit() {
        return (
            <Form onSubmit={(e) => this.saveUpdates(e)}>
                <Row>
                    <Col>
                        <Form.Label>{this.props.info.degreeProject.supervisor}</Form.Label>
                        <Typeahead
                            id="changeSupervisor"
                            labelKey={(option) => `${option.first_name} ${option.last_name} (${option.email})`}
                            placeholder={this.props.info.addDegreeProject.supervisorPlaceholder}
                            selected={this.state.supervisor}
                            onChange={event => this.setState({ supervisor_id: event[0].user_id })}
                            options={this.state.supervisors}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="marginTop">
                        {this.props.info.degreeProject.status}
                        <Form.Check
                            type="checkbox"
                            id="StatusButton"
                            label={this.props.info.degreeProject.finnished}
                            onChange={(event) => this.setState({ in_progress: event.target.checked })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="alignCenter marginTop">
                        <Button type="submit">{this.props.info.degreeProject.submit}</Button>
                    </Col>
                </Row>
            </Form >
        )
    }
    renderPopoverInfo(text) {
        return (
            <Popover className="popover" id="popover-basic">
                {text}
            </Popover>
        );
    }
    renderOverlay(text, infoText, required) {
        return (
            <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderPopoverInfo(infoText)}
            >
                <Button variant="text" className="textButton removePaddingTop">{text}</Button>
            </OverlayTrigger>
        )
    }
    editCompetence() {
        this.setState({ bodyContent: this.renderCompetenceAreaEdit() })
    }
    saveCompetence() {
        this.postComment()
    }
    async updateComment(comment) {
        await this.setState({ comment: comment })
    }
    renderCompetenceAreaEdit() {
        const notes = this.state.notes.split(';\n')
        return (
            <Fragment>
                {notes.map((comment, index) =>
                    <Row>
                        <Col md={4}>
                            {index === 0 ? this.renderOverlay(this.props.info.degreeProject.comment, this.props.info.degreeProject.commentInfo) : ""}
                        </Col>
                        <Col md={8}>
                            {comment}
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col md={4}></Col>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            as="textarea"
                            rows="3"
                            placeholder={this.props.info.profile.competenceAreaPlaceholder}
                            value={this.state.comment}
                            onChange={event => this.setState({ comment: event.target.value })}

                        />
                        <Button className="buttonMarginSave" onClick={() => this.saveCompetence()}>{this.props.info.profile.addComment}</Button>
                    </Col>
                </Row>
            </Fragment>
        )
    }
    renderCompetenceArea() {
        const notes = this.state.notes.split(';\n')
        return (
            <Fragment>
                {notes.map((comment, index) =>
                    <Row>
                        <Col md={4}>
                            {index === 0 ? this.renderOverlay(this.props.info.degreeProject.comment, this.props.info.degreeProject.commentInfo) : ""}
                        </Col>
                        <Col md={8}>
                            {comment}
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col md={{ span: 4, offset: 8 }} className="alignRight">
                        <Button onClick={() => this.editCompetence()}>{this.props.info.profile.addComment}</Button>
                    </Col>
                </Row>
            </Fragment>
        )
    }
    renderDelete() {
        return (
            <Col className="alignCenter marginTop">
                <Button variant="danger" size="lg" onClick={() => this.deleteProject()}>{this.props.info.degreeProject.delete}</Button>
            </Col>
        )
    }
    render() {
        return (
            <Fragment>
                <Card className="card">
                    <Card.Header className="header">
                        <Nav variant="pills" >
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderInfo() })}>{this.props.info.degreeProject.info}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderPersons() })}>{this.props.info.degreeProject.persons}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompany() })}>{this.props.info.degreeProject.company}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderEdit() })}>{this.props.info.degreeProject.edit}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompetenceArea() })}>{this.props.info.degreeProject.comments}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderDelete() })}>{this.props.info.degreeProject.delete}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        {this.state.bodyContent}
                    </Card.Body>
                </Card>
            </Fragment >
        );
    };
}
export default DegreeProject
