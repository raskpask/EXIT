import React, { Component } from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header';
import Footer from './components/footer';
import Help from './components/help';
import Home from './components/home';
import AvailableExaminers from './components/availableExaminers';
import AddBudgetYear from './components/addBudgetYear';
import AddDegreeProject from './components/addDegreeProject';
import AddDirectorOfStudies from './components/addDirectorOfStudies';
import AddExaminer from './components/addExaminer';
import DirectorOfStudies from './components/directorsOfStudies';
import MyDegreeProjects from './components/myDegreeProjects';
import Profile from './components/profile';
import SpecifiedBudetYears from './components/specifiedBudgetYears';
import SpecifyTutoringHours from './components/specifyTutoringHours';
import Eng from './resources/content/eng';
import Swe from './resources/content/swe';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: Eng.getLanguage()
        }
    }
    componentDidMount() {
        if (document.cookie.split('lang=').length > 1) {
            const lang = document.cookie.split('lang=')[1].split(';')[0]
            this.updateLanguage(lang);
        }
    }

    updateLanguage(lang) {
        if (lang === 'sv-se') {
            this.setState({ lang: Swe.getLanguage() });
        } else if (lang === 'en-us') {
            this.setState({ lang: Eng.getLanguage() });
        }
    }
    renderPaths() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Route exact path="/"
                        render={(props) => <Home info={this.state.lang} />}
                    />
                    <Route exact path="/help"
                        render={(props) => <Help info={this.state.lang} />}
                    />
                    <Route exact path="/availableExaminers"
                        render={(props) => <AvailableExaminers info={this.state.lang} />}
                    />
                    <Route exact path="/addBudgetYear"
                        render={(props) => <AddBudgetYear info={this.state.lang} />}
                    />
                    <Route exact path="/addDegreeProject"
                        render={(props) => <AddDegreeProject info={this.state.lang} />}
                    />
                    <Route exact path="/addDirectorOfStudies"
                        render={(props) => <AddDirectorOfStudies info={this.state.lang} />}
                    />
                    <Route exact path="/addExaminer"
                        render={(props) => <AddExaminer info={this.state.lang} />}
                    />
                    <Route exact path="/directorsOfStudies"
                        render={(props) => <DirectorOfStudies info={this.state.lang} />}
                    />
                    <Route exact path="/myDegreeProjects"
                        render={(props) => <MyDegreeProjects info={this.state.lang} />}
                    />
                    <Route exact path="/profile"
                        render={(props) => <Profile info={this.state.lang} />}
                    />
                    <Route exact path="/specifiedBudgetYears"
                        render={(props) => <SpecifiedBudetYears info={this.state.lang} />}
                    />
                    <Route exact path="/specifyTutoringHours"
                        render={(props) => <SpecifyTutoringHours info={this.state.lang} />}
                    />
                </BrowserRouter>
            </React.Fragment>
        )
    }
    render() {
        return (
            <div className="App" >
                <div className= "height">
                <ToastContainer />
                <Header info={this.state.lang} app={this} />
                {this.renderPaths()}
                </div>
                <Footer info={this.state.lang} />
            </div>
        );
    };
}
export default App