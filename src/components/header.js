import React, { Component } from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import '../resources/css/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeOfUser: this.renderBrand(),
        }
    }
    setLanguage(lang) {
        const cookies = new Cookies();
        cookies.set('lang', lang, { path: '/' });
        this.props.app.updateLanguage(lang)
        window.location.href = "/";
        this.props.app.forceUpdate()
    }

    chooseUserLevel() {
        return this.renderAdmin()
        let privilegeLevel = document.cookie.split('role_id=')[1];

        if (Boolean(privilegeLevel)) {
            privilegeLevel = privilegeLevel.split(';')[0];
        }
        if (privilegeLevel === '1') {
            return this.renderAdmin()
        } else if (privilegeLevel === '2') {
            return this.renderDirector()
        } else if (privilegeLevel === '3') {
            return this.renderExaminer()
        } else if (privilegeLevel === '4') {
            return this.renderStudent()
        } else {
            return this.renderLogin()
        }
    }
    renderBrand() {
        return (
            <React.Fragment>
                <Navbar.Brand className="fontColor" href="/">
                    {this.props.info.header.kth}
                </Navbar.Brand>
                <Nav.Link className="fontColor" href="/">{this.props.info.header.home}</Nav.Link>
            </React.Fragment>
        )
    }
    renderLogin() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    {this.renderBrand()}
                    <Nav.Link className="fontColor" href="/login" >{this.props.info.header.login}</Nav.Link>
                    <Nav.Link className="fontColor" href="/help">{this.props.info.header.help}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderStudent() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    {this.renderBrand()}
                    <Nav.Link className="fontColor" href="/logout">{this.props.info.header.logout}</Nav.Link>
                    <Nav.Link className="fontColor" href="/availableExaminers">{this.props.info.header.availableExaminsers}</Nav.Link>
                    <Nav.Link className="fontColor" href="/help">{this.props.info.header.help}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderExaminer() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    {this.renderBrand()}
                    <Nav.Link className="fontColor" href="/logout">{this.props.info.header.logout}</Nav.Link>
                    <Nav.Link className="fontColor" href="/profile">{this.props.info.header.profile}</Nav.Link>
                    <Nav.Link className="fontColor" href="/availableExaminers">{this.props.info.header.availableExaminsers}</Nav.Link>
                    <Nav.Link className="fontColor" href="/addDegreeProject">{this.props.info.header.addDegreeProject}</Nav.Link>
                    <Nav.Link className="fontColor" href="/myDegreeProjects">{this.props.info.header.myDegreeProjects}</Nav.Link>
                    <Nav.Link className="fontColor" href="/help">{this.props.info.header.help}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderDirector() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    {this.renderBrand()}
                    <Nav.Link className="fontColor" href="/logout">{this.props.info.header.logout}</Nav.Link>
                    <Nav.Link className="fontColor" href="/addBudgetYear">{this.props.info.header.addBudgetYear}</Nav.Link>
                    <Nav.Link className="fontColor" href="/specifiedBudgetYears">{this.props.info.header.specifiedBudgetYears}</Nav.Link>
                    <Nav.Link className="fontColor" href="/addExaminer">{this.props.info.header.addExaminer}</Nav.Link>
                    <Nav.Link className="fontColor" href="/specifyTutoringHours">{this.props.info.header.specifyTutoringHours}</Nav.Link>
                    <Nav.Link className="fontColor" href="/availableExaminers">{this.props.info.header.availableExaminsers}</Nav.Link>
                    <Nav.Link className="fontColor" href="/help">{this.props.info.header.help}</Nav.Link>
                </Nav>
            </React.Fragment>
        )
    }
    renderAdmin() {
        return (
            <React.Fragment>
                <Nav className="mr-auto">
                    {this.renderBrand()}
                    <Nav.Link className="fontColor" href="/logout">{this.props.info.header.logout}</Nav.Link>
                    <Nav.Link className="fontColor" href="/addDirectorOfStudies">{this.props.info.header.addDirectorOfStudies}</Nav.Link>
                    <Nav.Link className="fontColor" href="/directorsOfStudies">{this.props.info.header.directorsOfStudies}</Nav.Link>
                    <DropdownButton  className="margin headerDropdown" id="directorOfStudies" title={this.props.info.header.directorsOfStudiesTasks}>
                        <Dropdown.Item className="fontColor" href="/addBudgetYear">{this.props.info.header.addBudgetYear}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/specifiedBudgetYears">{this.props.info.header.specifiedBudgetYears}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/addExaminer">{this.props.info.header.addExaminer}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/specifyTutoringHours">{this.props.info.header.specifyTutoringHours}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/availableExaminers">{this.props.info.header.availableExaminsers}</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="margin" id="examiner" title={this.props.info.header.examiner}>
                        <Dropdown.Item className="fontColor" href="/profile">{this.props.info.header.profile}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/addDegreeProject">{this.props.info.header.addDegreeProject}</Dropdown.Item>
                        <Dropdown.Item className="fontColor" href="/myDegreeProjects">{this.props.info.header.myDegreeProjects}</Dropdown.Item>
                    </DropdownButton>
                    <Nav.Link className="fontColor" href="/help">{this.props.info.header.help}</Nav.Link>
                </Nav>
            </React.Fragment >
        )
    }

    renderUser() {
        return (
            <Nav className="ml-auto">
                <Nav.Link className="userText" href="/user"> {this.props.info.header.profile}</Nav.Link>
                <Nav.Link href="/logout">{this.props.info.header.logout}</Nav.Link>
                {this.renderlanguage()}
            </Nav>
        )
    }
    renderlanguage() {
        return (
            <Nav className="ml-auto">
                <Nav.Link className="fontColor" href="/" onClick={() => this.setLanguage('sv-se')}> {this.props.info.header.swe}</Nav.Link>
                <Nav.Link className="fontColor" href="/" onClick={() => this.setLanguage('en-us')}> {this.props.info.header.eng}</Nav.Link>
            </Nav>
        )
    }
    render() {
        return (
            <div>
                <Navbar className="navbar">
                    {this.chooseUserLevel()}
                    {this.renderlanguage()}
                </Navbar>
            </div>
        );
    };
}
export default Header