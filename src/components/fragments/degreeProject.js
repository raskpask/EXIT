import React, { Component, Fragment } from 'react';
import { Nav, Card, ListGroup, Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../resources/css/degreeProject.css';
import { toast } from 'react-toastify';
class DegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            user: "",
            bodyContent: this.renderInfo()
        }
    }
    deleteProject = () => {
        axios
            .delete('/api/project', this.props.project.projectID)
            .then(res => {
                if (res.status === 200) {
                    toast(this.props.info.degreeProject.projectDeleted)
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.degreeProject.projectDeletedFail)
            })
        this.props.showInfo(this.props.project.projectID, false)
    }
    saveUpdates = (e) => {
        e.preventDefault();
        const data = {
            supervisor: this.state.supervisor,
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
            }
            )
    }
    renderInfo() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.info.addDegreeProject.numOfStudents}: {this.props.project.number_of_students}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.credits}: {this.props.project.credits}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.startDate}: {this.props.project.start_date.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.endDate}: {this.props.project.end_date.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.degreeProject.outDated}:{this.props.project.out_of_date}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.degreeProject.inProgess}:{this.props.project.in_progess}</ListGroup.Item>
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
                        <Form.Label>{this.props.info.addDegreeProject.supervisor}</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.supervisor}
                            placeholder={this.props.info.addDegreeProject.supervisorPlaceholder}
                            onChange={event => this.setState({ supervisor: event.target.value })}
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
