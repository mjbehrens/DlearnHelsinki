import Popup from 'react-popup';
import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import './css/App.css';
import './css/popup.css';
import { ROUTES } from './constants.js';
import { withTranslate } from 'react-redux-multilingual';



import ClassSelection from './pages/ClassSelection.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import History from './pages/History.js'
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Modal from './components/Modal.js';
import NoMatch from './pages/NoMatch.js';
import StudentDashboard from './pages/StudentDashboard.js';
import StudentSurveyQuestion from './pages/StudentSurveyQuestion.js'
import TeacherDashboard from './pages/TeacherDashboard.js';
import TeacherGroupManagement from './pages/TeacherGroupManagement.js'
import CompetenceWall from './pages/CompetenceWall.js'

// Bind props to Redux store
function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}

class App extends Component {

    // Return the desired component if a correct user is logged in and
    // a class is selected. Redirect to class selection if a correct
    // user is logged in and no class has been selected. Redirect to
    // 404 if the user is not logged or with incorrect userType.
    protectedRoute = (userType, component) => {
	if (this.props.user.type === userType) {
	    if (this.props.user.classid == null) {
		return <Redirect to={{
		    pathname: ROUTES.CLASS_SELECTION,
		    state: { warning: true },
		}} />
	    }
	    return <Route component={component} />
	}
	return <Route component={NoMatch} />
    }


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
		    closeOnOutsideClick={true}
		/>
		<Modal />
		<Router>
		    <div>
			<Header />
			<section>
			    <Switch>
				<Route exact path={ROUTES.ROOT} component={Home} />
				<Route path={ROUTES.LOGIN} component={Login} />
				<Route path={ROUTES.STUDENT_DASHBOARD} render={() => this.protectedRoute('student', StudentDashboard)} />
				<Route path={ROUTES.CLASS_SELECTION} render={() => (this.props.user.loggedin ? (<Route component={ClassSelection} />) : (<Route component={NoMatch} />))}/>
				<Route path={ROUTES.TEACHER_DASHBOARD} render={() => this.protectedRoute('teacher', TeacherDashboard)} />
				<Route path={ROUTES.STUDENT_SURVEY} render={() => this.protectedRoute('student', StudentSurveyQuestion)} />
				<Route path={ROUTES.HISTORY} render={() => this.protectedRoute('teacher', History)} />
				<Route path={ROUTES.GROUP_MANAGEMENT} render={() => this.protectedRoute('teacher', TeacherGroupManagement)} />
				<Route path={ROUTES.COMPETENCE_WALL} render={() => this.protectedRoute('teacher', CompetenceWall)} />
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

export default connect(mapStateToProps)(withTranslate(App));
