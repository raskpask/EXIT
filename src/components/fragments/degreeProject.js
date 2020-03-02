import React, { Component, Fragment } from 'react';
import { Nav, Card, ListGroup } from 'react-bootstrap';
class DegreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyContent: this.renderInfo()
        }
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
