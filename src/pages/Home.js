import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';
import { withTranslate } from 'react-redux-multilingual'

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
  const { translate } = this.props;
    }


  render() {

      let buttonRedirect = ROUTES.LOGIN
      let buttonText = this.props.translate('log_in')
      if (this.props.user.loggedin) {
	  if (this.props.user.type === 'teacher') {
	      buttonRedirect = ROUTES.TEACHER_DASHBOARD
	  } else {
	      buttonRedirect = ROUTES.STUDENT_DASHBOARD
	  }
	  buttonText = this.props.translate('dashboard')
      }

    return (

	<div className="container">
	    <div className="jumbotron">
		<h1>Dlearn.Helsinki</h1>
		<p>{this.props.translate('slogan')}</p>
	    <Link to={buttonRedirect}><button className="btn btn-lg btn-primary" role="button">{buttonText} »</button></Link>
	    </div>
	</div>
          );
  }
}

export default connect(mapStateToProps)(withTranslate(Home));
