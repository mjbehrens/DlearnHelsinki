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
}

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
				 // <Route path='/login' render={() => (this.props.user.loggedin ? <Route component={NoMatch} /> : <Route component={Login} />)} />
				    <Route path='/student-dashboard' render={() => (this.props.user.type === 'student' ? <Route component={StudentDashboard} /> : <Route component={NoMatch} />)}/>
				    <Route path='/class-selection' render={() => (this.props.user.type === 'teacher' ? (<Route component={ClassSelection} />) : (<Route component={NoMatch} />))}/>
				    <Route path='/teacher-dashboard' render={() => (this.props.user.type === 'teacher' ? (<Route component={TeacherDashboard} />) : (<Route component={NoMatch} />))}/>
				    <Route path='/student-survey' render={() => (this.props.user.type === 'student' ? (<Route component={StudentSurveyQuestion} />) : (<Route component={NoMatch} />))}/>
				    <Route path='/history' render={() => (this.props.user.type === 'student' ? (<Route component={History} />) : (<Route component={NoMatch} />))}/>
				    <Route path='/groups-management' render={() => (this.props.user.type === 'teacher' ? (<Route component={TeacherGroupManagement} />) : (<Route component={NoMatch} />))}/>
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
