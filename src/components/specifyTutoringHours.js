import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../resources/css/form.css';
import Access from './fragments/access';

class SpecifyTutoringHours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examiners: [
                {
                    username: "",
                    examinerHours: "",
                    supervisorHours: ""
                }
            ],
            numberOfExaminers: 1,
            budgetYear: ""
        }
    }
    specifyTutoringHours = (e) => {
        e.preventDefault();
        axios
            .post('/api/user', this.getTutoringHours())
            .then(res => {
                toast(this.props.info.addDirectorOfStudies.added)
                this.resetFields()
            })
            .catch(err => {
                console.log(err)
                toast(this.props.info.addDirectorOfStudies.fail)
            })
    }
    getTutoringHours() {
        return {
            examiners: this.state.examiners,
            budgetYear: this.state.bugetYear
        }
    }
    resetFields() {
        this.setState({
            examiners: [
                {
                    username: "",
                    examinerHours: "",
                    supervisorHours: ""
                }
            ],
            numberOfExaminers: 1,
            budgetYear: ""
        })
    }
    handleChangeExaminer(value,type,index){
        let examinersTemp = this.state.examiners
        if (type === 'username') {
            examinersTemp[index].username = value
        } else if (type === 'examinerHours') {
            examinersTemp[index].examinerHours = value
        } else {
            examinersTemp[index].supervisorHours = value
        }
        this.setState({ examiners : examinersTemp })
    }
    addExaminer(){
        let examinersTemp = this.state.examiners
        let numberOfExaminersTemp = this.state.numberOfExaminers
        numberOfExaminersTemp++
        examinersTemp.push({username: "", examinerHours: "", supervisorHours: "" })
        this.setState({ numberOfExaminers: numberOfExaminersTemp, examiners: examinersTemp })
    }
    removeExaminer(){
        let examinersTemp = this.state.examiners
        let numberOfExaminersTemp = this.state.numberOfExaminers
        numberOfExaminersTemp--
        examinersTemp.pop()
        this.setState({ numberOfExaminers: numberOfExaminersTemp, examiners: examinersTemp })
    }
    renderForm() {
        return (
            <Form onSubmit={(e) => this.specifyTutoringHours(e)}>
                <Row>
                    <Col md={8}>
                        <Form.Label>{this.props.info.specifyTutoringHours.bugetYear}</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={this.state.bugetYear}
                            placeholder={this.props.info.specifyTutoringHours.budgetYearPlaceholder}
                            onChange={event => this.setState({ bugetYear: event.target.value })}
                        />
                    </Col>
                </Row>
                {this.state.examiners.map((examiner, key) =>
                    <Row>
                        <Col>
                            <Form.Label>{this.props.info.specifyTutoringHours.username}</Form.Label>
                            <Typeahead
                            id="changeSupervisor"
                            labelKey={(option) => `${option.first_name} ${option.last_name} (${option.email})`}//{"" +option.first_name +option.last_name +" "+option.email +""}}
                            placeholder={this.props.info.specifyTutoringHours.usernamePlaceholder}
                            selected={examiner.username}
                            onChange={event => this.setState({ supervisor_id: event[0].user_id })}
                            options={["ja"]}
                        />
                        </Col>
                        <Col >
                            <Form.Label>{this.props.info.specifyTutoringHours.examinerHours}</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={examiner.examinerHours}
                                placeholder={this.props.info.specifyTutoringHours.examinerHoursPlaceholder}
                                onChange={event => this.handleChangeExaminer(event.target.value,'examinerHours',key)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>{this.props.info.specifyTutoringHours.supervisorHours}</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={examiner.supervisorHours}
                                placeholder={this.props.info.specifyTutoringHours.supervisorHoursPlaceholder}
                                onChange={event => this.handleChangeExaminer(event.target.value,'supervisorHours',key)}
                            />
                        </Col>
                    </Row>
                )}
                <Button className="marginTop marginRight" onClick={()=> this.addExaminer()}>{this.props.info.button.add}</Button>
                <Button disabled={this.state.numberOfExaminers === 1} variant="danger" className="marginTop marginRight" onClick={()=> this.removeExaminer()}>{this.props.info.button.remove}</Button>
                <Button className="marginTop" type="submit">{this.props.info.button.submit}</Button>
            </Form>
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='2' info={this.props.info.access} />
                <h1>{this.props.info.specifyTutoringHours.title}</h1>
                <p>{this.props.info.specifyTutoringHours.paragraph0}</p>
                {this.renderForm()}
            </div>
        );
    };
}
export default SpecifyTutoringHours