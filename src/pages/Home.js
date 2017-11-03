import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';

function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}

class Home extends Component {

    constructor(props){
	super(props);
	this.state = {
	    goTo: ROUTES.ROOT

	};
    }

	
  render() {
  
      let buttonRedirect = ROUTES.LOGIN
      let buttonText = 'Login »'
      if (this.props.user.loggedin) {
	  if (this.props.user.type === 'teacher') {
	      buttonRedirect = ROUTES.TEACHER_DASHBOARD
	  } else {
	      buttonRedirect = ROUTES.STUDENT_DASHBOARD
	  }
	  buttonText = 'Dashboard »'
      }
	  
    return (
	<div className="container">
	    <div className="jumbotron">
		<h1>Dlearn.Helsinki</h1>
		<p>Learning global competencies with new pedagogical tools</p>
	    <Link to={buttonRedirect}><button className="btn btn-lg btn-primary" role="button">{buttonText}</button></Link>
	    </div>
	</div>
          );
  }
}

export default connect(mapStateToProps)(Home);
