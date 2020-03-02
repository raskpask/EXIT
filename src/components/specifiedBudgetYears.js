import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../resources/css/home.css';
import Access from './fragments/access';

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
                    factor6: ""
                }
            ]
        }
    }
    componentDidMount(){
        this.getBudgetYears()
    }
    getBudgetYears= ()=>{
        axios
        .get('/api/budgetYear')
        .then(res=>{
            if(res.status === 200){
                this.setState({budgetYears: res.data})
            }
        })
        .catch(err=>{
            console.error(err)
            toast(this.props.info.specifiedBudgetYears.fail)
        })
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
                        </tr>
                    )}
                </tbody>
            </Table >
        )
    }
    render() {
        return (
            <div className="container">
                <Access access='2' info={this.props.info.access} />
                <h1>{this.props.info.specifiedBudgetYears.title}</h1>
                <p>{this.props.info.specifiedBudgetYears.paragraph0}</p>
                <h3>{this.props.info.specifiedBudgetYears.paragraph1}</h3>
                {this.renderTable()}
            </div>
        );
    };
}
export default SpecifiedBudgetYears