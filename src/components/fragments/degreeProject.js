import React, { Component, Fragment } from 'react';
import { Nav, Row, Col, Card } from 'react-bootstrap';
class DegreeProject extends Component {
    renderCompany(){
        return (
            <Fragment>
                <Row>
                    <Col></Col>
                </Row>
            </Fragment>
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
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderCompetence() })}>{this.props.info.degreeProject.company}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.setState({ bodyContent: this.renderAvailability() })}>{this.props.info.degreeProject.status}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                    </Card.Body>
                </Card>
            </Fragment >
        );
    };
}
export default DegreeProject
