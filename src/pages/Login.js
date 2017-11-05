import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import { ROUTES, BACKEND_API } from '../constants.js';
import * as userActions from '../actions/userActions';

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
	    userType: null,
	    loading: false,
	    error: false,
	    goTo: ROUTES.CLASS_SELECTION,
	    redirect: false,
	};
    }

    onRadioClick = (e) => {
	this.setState({
	    ...this.state,
	    userType: e.target.value,
	})
    }

    // Triggered when the login text field receives text input
    onLoginInputChange = (e) => {
	    this.setState({ ...this.state, loginInput: e.target.value })
    }

    // Triggered when the mdp text field receives text input
    onPwdInputChange = (e) => {
	    this.setState({ ...this.state, pwdInput: e.target.value })
    }

    // Triggered when the Connection button is clicked
    onConnectionClick = (login, password, userType) => {
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
			<p>You are already logged in. Log out first to log in again.</p>
		    </div>
		</div>
	    )
	} else {
	    return (
		<div className="login-form">
		    <h1>Dlearn</h1>
		    {this.state.error &&
		    <div className="alert alert-danger alert-dismissible fade show" role="alert">
			Invalid login or password.
		    </div>
		    }
		    <div className="form-group">
			<label for="usr">Login:</label>
			<input type="text" className="form-control" id="usr"
				onChange={(event) => this.onLoginInputChange(event)} value={this.state.loginInput} />
		    </div>
		    <div className="form-group">
			<label for="pwd">Password:</label>
			<input type="password" className="form-control" id="pwd" value={this.state.pwdInput} onChange={(event) => this.onPwdInputChange(event)} />
		    </div>
		    <div className="radio">
			<label><input type="radio" name="status" value="student" checked onClick={this.onRadioClick} />Student</label>
		    </div>
		    <div className="radio">
			<label><input type="radio" name="status" value="teacher" onClick={this.onRadioClick} />Teacher</label>
		    </div>
		    <div className="radio disabled">
			<label><input type="radio" name="status" value="researcher" disabled />Researcher</label>
		    </div>
		    <button type="button" className="btn btn-primary" onClick={() => this.onConnectionClick(this.state.loginInput, this.state.pwdInput, this.state.userType)}>Connection</button>
		</div>
	    );
	}
    }
}

export default connect(mapStateToProps)(Login);
