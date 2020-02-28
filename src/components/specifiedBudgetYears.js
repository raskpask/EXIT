import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import '../resources/css/home.css';

class SpecifiedBudgetYears extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgetYears: [
                {
                    budgetYear:"",
                    masterHours:"",
                    bachleorHours: "",
                    factor2: "",
                    factor3: "",
                    factor4: "",
                    factor5: "",
                    factor6: "",
                    factor7: "",
                    factor8: "",
                    factor9: "",
                    factor10: "",
                }
            ]
        }
    }
    renderTable() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{this.props.info.specifiedBudgetYears.budgetYear}</th>
                        <th>{this.props.info.specifiedBudgetYears.masterHours}</th>
                        <th>{this.props.info.specifiedBudgetYears.bachleorHours}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor2}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor3}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor4}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor5}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor6}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor7}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor8}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor9}</th>
                        <th>{this.props.info.specifiedBudgetYears.factor10}</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.budgetYears.map((budgetYear, key) =>
                        < tr key={key} className="pressForInfo" >
                            <td key={"budgetYear: " + key} >{budgetYear.budgetYear}</td>
                            <td key={"masterHours: " + key} > {budgetYear.masterHours}</td>
                            <td key={"bachleorHours: " + key} > {budgetYear.bachleorHours}</td>
                            <td key={"factor2: " + key} > {budgetYear.factor2}</td>
                            <td key={"factor3: " + key} > {budgetYear.factor3}</td>
                            <td key={"factor4: " + key} > {budgetYear.factor4}</td>
                            <td key={"factor5: " + key} > {budgetYear.factor5}</td>
                            <td key={"factor6: " + key} > {budgetYear.factor6}</td>
                            <td key={"factor7: " + key} > {budgetYear.factor7}</td>
                            <td key={"factor8: " + key} > {budgetYear.factor8}</td>
                            <td key={"factor9: " + key} > {budgetYear.factor9}</td>
                            <td key={"factor10: " + key} > {budgetYear.factor10}</td>
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    render() {
        return (
            <div className="container">
                <h1>{this.props.info.specifiedBudgetYears.title}</h1>
                <p>{this.props.info.specifiedBudgetYears.paragraph0}</p>
                <h3>{this.props.info.specifiedBudgetYears.paragraph1}</h3>
                {this.renderTable()}
            </div>
        );
    };
}
export default SpecifiedBudgetYears