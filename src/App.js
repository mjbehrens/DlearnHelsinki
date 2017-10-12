import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './css/App.css';
import './css/popup.css';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import StudentDashboard from './pages/StudentDashboard.js';
import ClassSelection from './pages/ClassSelection.js';
import TeacherDashboard from './pages/TeacherDashboard.js';
import History from './pages/History.js'
import StudentSurveyQuestion from './pages/StudentSurveyQuestion.js'
import LoginCreator from './components/shared/LoginCreator.js';



import Popup from 'react-popup';



class App extends Component {
  render() {

    return (
      <div className="App">
		    <Popup
		      className="mm-popup"
		      btnClass="mm-popup__btn"
		      closeBtn={true}
		      closeHtml={null}
		      defaultOk="Ok"
		      defaultCancel="Cancel"
		      wildClasses={false}
		      closeOnOutsideClick={true} />
			  <Router>
	    <div>
		    <Header />
		    <section>
				<Switch>
				  <Route exact path='/' component={Home} />
				  <Route path='/login' component={Login} />
				  <Route path='/student-dashboard' component={StudentDashboard} />
				  <Route path='/class-selection' component={ClassSelection} />
				  <Route path='/teacher-dashboard' component={TeacherDashboard} />
				  <Route path='/student-survey' component={StudentSurveyQuestion} />
                                  <Route path = '/history' component = {History} />
                                  <Route path = '/create-student' component = {LoginCreator} />
				</Switch>
		    </section>
        <Footer />
	    </div>
		      </Router>
      </div>
    );
  }
}

export default App;
