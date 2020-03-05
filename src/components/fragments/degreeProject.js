import React, { Component, Fragment } from 'react';
import { Nav, Card, ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../resources/css/degreeProject.css';
import { toast } from 'react-toastify';
class DegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisor: "",
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
        axios
            .put('/api/project', this.state.supervisor)
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
                <ListGroup.Item>{this.props.info.addDegreeProject.numOfStudents}:{this.props.project.numOfStudents}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.credits}:{this.props.project.credits}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.startDate}:{this.props.project.startDate}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.endDate}:{this.props.project.endDate}</ListGroup.Item>
            </ListGroup>
        )
    }
    renderCompany() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyName}:{this.props.project.companyName}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyAddress}:{this.props.project.companyAddress}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.addDegreeProject.companyPhone}:{this.props.project.companyPhone}</ListGroup.Item>
            </ListGroup>
        )
    }
    renderStatus() {
        return (
            <ListGroup>
                <ListGroup.Item>{this.props.info.degreeProject.outDated}:{this.props.project.outDated}</ListGroup.Item>
                <ListGroup.Item>{this.props.info.degreeProject.inProgess}:{this.props.project.inProgess}</ListGroup.Item>
            </ListGroup>
        )
    }
    renderEdit() {
        return (
            <Form onSubmit={(e) => this.saveUpdates(e)}>
                <Row>
                    <Col>
                        <Form.Label>{this.props.info.addDegreeProject.supervisor}</Form.Label>
                        <Form.Control
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
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompany() })}>{this.props.info.degreeProject.company}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderStatus() })}>{this.props.info.degreeProject.status}</Nav.Link>
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
