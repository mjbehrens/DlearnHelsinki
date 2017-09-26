import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './css/App.css';
import './css/popup.css';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import StudentDashboard from './pages/StudentDashboard.js';
import ClassSelection from './pages/ClassSelection.js';
import TeacherDashboard from './pages/TeacherDashboard.js'

import Popup from 'react-popup';



import StudentSurveyQuestion from './pages/StudentSurveyQuestion.js'

class App extends Component {
  render() {


    return (
      <div classsName="App">
        <Popup
          className="mm-popup"
          btnClass="mm-popup__btn"
          closeBtn={true}
          closeHtml={null}
          defaultOk="Ok"
          defaultCancel="Cancel"
          wildClasses={false}
          closeOnOutsideClick={true} />
        <Header />
        <Router>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/student-dashboard' component={StudentDashboard} />
            <Route path='/class-selection' component={ClassSelection} />
            <Route path='/teacher-dashboard' component={TeacherDashboard} />
            <Route path='/student-survey' component={StudentSurveyQuestion} />
          </Switch>

        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
