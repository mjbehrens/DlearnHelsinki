import Popup from 'react-popup';
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import './css/App.css';
import './css/popup.css';

import ClassSelection from './pages/ClassSelection.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import History from './pages/History.js'
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import NoMatch from './pages/NoMatch.js';
import StudentDashboard from './pages/StudentDashboard.js';
import StudentSurveyQuestion from './pages/StudentSurveyQuestion.js'
import TeacherDashboard from './pages/TeacherDashboard.js';
import TeacherGroupManagement from './pages/TeacherGroupManagement.js'


function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}﻿

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
			<Route path='/login' render={() => (<Route component={Login} />)}
							   />
			<Route path='/student-dashboard' component={StudentDashboard}
								  />
								<Route path='/class-selection' component={ClassSelection} />
								<Route path='/teacher-dashboard' component={TeacherDashboard} />
								<Route path='/student-survey' component={StudentSurveyQuestion} />
								<Route path='/history' component={History} />
								<Route path='/groups-management' component={TeacherGroupManagement} />
								<Route path="*" component={NoMatch} status={404}/>
							</Switch>
						</section>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(mapStateToProps)(App);
