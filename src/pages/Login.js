import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import { ROUTES, BACKEND_API } from '../constants.js';
import * as userActions from '../actions/userActions';
import { withTranslate } from 'react-redux-multilingual'

require('../css/login.css')

function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}

class Login extends Component {

    constructor(props) {
	super(props);
	this.state = {
	    loginInput: '',
	    pwdInput: '',
	    userType: "student",
	    loading: false,
	    error: false,
	    goTo: ROUTES.CLASS_SELECTION,
	    redirect: false,
	};
  const {translate} = this.props;
    }

    // Triggered on user input change
    handleInputChange = (e) => {
	switch (e.target.type) {
	    case "text":
		document.getElementById(e.target.id).classList.add('inputModified')
		this.setState({ ...this.state, loginInput: e.target.value })
		break;
	    case "password":
		document.getElementById(e.target.id).classList.add('inputModified')
		this.setState({ ...this.state, pwdInput: e.target.value })
		break;
	    case "radio":
		this.setState({ ...this.state, userType: e.target.value	})
		break;
	}
    }

    // Triggered when the Connection button is clicked
    onConnectionClick = (e, login, password, userType) => {
	e.preventDefault() // Fix form not being submitted on edge and safari
	this.setState({...this.state,
		       loading: true,
		       error: false,
		       pwdInput: '',
		      })
	let endpoint = '';
	switch (userType) {
	    case 'teacher':
		endpoint = 'teachers/'
		break;
	    case 'researcher':
		endpoint = 'researcher/'
		break;
	    default:
		endpoint = 'students/'
	}

	fetch(BACKEND_API.ROOT + endpoint, {
	    method: "GET",
	    headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Authorization': 'Basic ' + btoa(login + ':' + password)
	    },
	}).then((response) => {
	    if (response.ok) {
		response.json().then(data => {
		    console.log('Login successful!');
		    console.log(data);

		    this.props.dispatch(userActions.setUserId(data._id));
		    this.props.dispatch(userActions.setUserType(userType))
		    this.props.dispatch(userActions.setUserLogin(login));
		    this.props.dispatch(userActions.setUserName(data.username));
		    this.props.dispatch(userActions.setUserHash(btoa(login + ':' + password)));
		    this.props.dispatch(userActions.loginUser());
		    this.setState({
			...this.state,
			redirect: true,
		    });
		});
	    } else {
		console.log('Login failed.');
		this.setState({
		    ...this.state,
		    error: true,
		    loading: false,
		})
	    }
	});
    }

    render() {

	console.log(this.state)
	if (this.state.redirect) {
	    return (<Redirect to={this.state.goTo} />)
	} else if (this.state.loading) {
	    return (
		<div className="Login-form">
		    <h1>Dlearn</h1>
		    <div className='spinner-container'>
			<Spinner />
		    </div>
		</div>
	    )
	} else if (this.props.user.loggedin) {
	    return (
		<div className="Login-form">
		    <h1>Dlearn</h1>
		    <div className="centered">
			<p>{this.props.translate('already_logged_in')}</p>
		    </div>
		</div>
	    )
	} else {
	    return (
		<form className="login-form" onSubmit={(e) => this.onConnectionClick(e, this.state.loginInput, this.state.pwdInput, this.state.userType)}>
		    <h1>Dlearn</h1>
		    {this.state.error &&
		    <div className="alert alert-danger alert-dismissible fade show" role="alert">
			{this.props.translate('invalid_login')}
		    </div>
		    }
		    <div className="form-group left-align">
			<label for="usernameInput">{this.props.translate('username')}</label>
			<input type="text" className="form-control" id="usernameInput"
				onChange={this.handleInputChange} value={this.state.loginInput} required />
		    </div>
		    <div className="form-group left-align">
			<label for="passwordInput">{this.props.translate('password')}</label>
			<input type="password" className="form-control" id="passwordInput" value={this.state.pwdInput} onChange={this.handleInputChange} required />
		    </div>
		    <div className="custom-controls-stacked">
			<label className="custom-control custom-radio">
			<input id="radioStudent" className="custom-control-input" name="userType" value="student" type="radio" checked={this.state.userType === 'student'} onChange={this.handleInputChange} />
			    <span className="custom-control-indicator"></span>
			    <span className="custom-control-description">{this.props.translate('student')}</span>
			</label>
			<label className="custom-control custom-radio">
			<input id="radioTeacher" className="custom-control-input" name="userType" value="teacher" type="radio" checked={this.state.userType === 'teacher'} onChange={this.handleInputChange} />
			    <span className="custom-control-indicator"></span>
			    <span className="custom-control-description">{this.props.translate('teacher')}</span>
			</label>
			<label className="custom-control custom-radio">
			<input id="radioResearcher" className="custom-control-input" name="userType" value="researcher" type="radio" checked={this.state.userType === 'researcher'} onChange={this.handleInputChange} disabled />
			    <span className="custom-control-indicator"></span>
			    <span className="custom-control-description">{this.props.translate('researcher')}</span>
			</label>
		    </div>
		    <button id="logInButton" type="submit" className="btn btn-primary" >{this.props.translate('log_in')}</button>
		</form>
	    );
	}
    }
}

export default connect(mapStateToProps)(withTranslate(Login));
