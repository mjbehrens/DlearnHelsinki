import Popup from 'react-popup';
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import './css/App.css';
import './css/popup.css';
import { ROUTES } from './constants.js';

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
				    <Route exact path={ROUTES.ROOT} component={Home} />
				    <Route path={ROUTES.LOGIN} component={Login} />
				    <Route path={ROUTES.STUDENT_DASHBOARD} render={() => (this.props.user.type === 'student' ? <Route component={StudentDashboard} /> : <Route component={NoMatch} />)}/>
				    <Route path={ROUTES.CLASS_SELECTION} render={() => (this.props.user.loggedin ? (<Route component={ClassSelection} />) : (<Route component={NoMatch} />))}/>
				    <Route path={ROUTES.TEACHER_DASHBOARD} render={() => (this.props.user.type === 'teacher' ? (<Route component={TeacherDashboard} />) : (<Route component={NoMatch} />))}/>
				    <Route path={ROUTES.STUDENT_SURVEY} render={() => (this.props.user.type === 'student' ? (<Route component={StudentSurveyQuestion} />) : (<Route component={NoMatch} />))}/>
				    <Route path={ROUTES.HISTORY} render={() => (this.props.user.type === 'teacher' ? (<Route component={History} />) : (<Route component={NoMatch} />))}/>
				    <Route path={ROUTES.GROUP_MANAGEMENT} render={() => (this.props.user.type === 'teacher' ? (<Route component={TeacherGroupManagement} />) : (<Route component={NoMatch} />))}/>
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
