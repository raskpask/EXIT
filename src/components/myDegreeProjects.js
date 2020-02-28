import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import '../resources/css/home.css';

class MyDegreeProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {
                    credits: "",
                    degreeTitle: "",
                    numOfStudents: "",
                    startDate: "",
                    endDate: "",
                    withinTimeLimit: "",
                }
            ]
        }
    }
    renderTable(){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.myDegreeProjects.credits}</th>
                        <th>{this.props.info.myDegreeProjects.degreeTitle}</th>
                        <th>{this.props.info.myDegreeProjects.numOfStudents}</th>
                        <th>{this.props.info.myDegreeProjects.startDate}</th>
                        <th>{this.props.info.myDegreeProjects.endDate}</th>
                        <th>{this.props.info.myDegreeProjects.withinTimeLimit}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.projects.map((project, key) =>
                        < tr key={key} className="pressForInfo" >
                            <td key={"credits: " + key} className="pressForInfo" >{project.credits}</td>
                            <td key={"degreeTitle: " + key} > {project.degreeTitle}</td>
                            <td key={"numOfStudents: " + key} > {project.numOfStudents}</td>
                            <td key={"startDate: " + key} > {project.startDate}</td>
                            <td key={"endDate: " + key} > {project.endDate}</td>
                            <td key={"withinTimeLimit: " + key} > {project.withinTimeLimit}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    render() {
        return (
            <div className="container">
            <h1>{this.props.info.myDegreeProjects.title}</h1>
            <p>{this.props.info.myDegreeProjects.paragraph0}</p>
            {this.renderTable()}
        </div>
        );
    };
}
export default MyDegreeProjects