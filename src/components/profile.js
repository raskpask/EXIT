import React, { Component } from 'react';
import { Col, Row, Form, Card,  Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import Access from './fragments/access';

import '../resources/css/profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            competenceArea: "",
            totalTutoringHours: "",
            remainingTutoringHours: "",
        }
    }
    componentDidMount() {
        this.getProfile()
    }
    getProfile = () => {
        const response = axios
            .get('/api/examiner')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ competenceArea: response.data })
                }
            })
            .catch(err => {
                console.error(err)
                toast(this.props.info.profile.fail)
            })

    }
    editCompetence() {
        this.setState({ edit: true })
        this.forceUpdate()
    }
    saveCompetence() {
        this.setState({ edit: false })
        this.forceUpdate()
    }
    renderCompetenceAreaEdit() {
        return (
            <Row>
                <Col md={4}>
                    {this.props.info.profile.competenceArea}
                </Col>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows="3"
                        placeholder={this.props.info.profile.competenceAreaPlaceholder}
                        value={this.state.competenceArea}
                        onChange={event => this.setState({ competenceArea: event.target.value })}
                    />
                    <Button className="buttonMarginSave" onClick={() => this.saveCompetence()}>{this.props.info.profile.save}</Button>
                </Col>
            </Row>
        )
    }
    renderCompetenceArea() {
        return (
            <Row>
                <Col md={4}>
                    {this.props.info.profile.competenceArea}
                </Col>
                <Col md={6}>
                    {this.state.competenceArea}
                </Col>
                <Col md={2} className="alignRight">
                    <Button onClick={() => this.editCompetence()}>{this.props.info.profile.edit}</Button>
                </Col>
            </Row>
        )
    }
    renderProfile() {
        return (
            <Card className="cardFormat">
                <Row>
                    <Col md={4}>
                        {this.props.info.profile.totalTutoringHours}
                    </Col>
                    <Col md={8}>
                        {this.state.totalTutoringHours}{this.props.info.profile.hours}
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        {this.props.info.profile.remainingTutoringHours}
                    </Col>
                    <Col md={8}>
                        {this.state.remainingTutoringHours}{this.props.info.profile.hours}
                    </Col>
                </Row>
                {this.state.edit ? this.renderCompetenceAreaEdit() : this.renderCompetenceArea()}


            </Card>
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='3' info={this.props.info.access} />
                <h1>{this.props.info.profile.title}</h1>
                <p>{this.props.info.profile.paragraph0}</p>
                {this.renderProfile()}
            </div>
        );
    };
}
export default Profile