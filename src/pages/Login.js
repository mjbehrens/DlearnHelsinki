import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as userActions from '../actions/userActions';

function mapStateToProps(store) {
    return {
	user: store.user.user,
	baseURL: store.settings.baseURL,
    }
}﻿

class Login extends Component {

    constructor(props){
	super(props);
	this.state = {
	    loginInput: '',
	    pwdInput: '',
	    loading: false,
	    error: false,
	    goTo : "/login",
	    redirect: false,
	};
    }

    onClickStudent = () => {
	this.setState({...this.state,
	    userType: "student",
	    goTo : "/student-dashboard"
	})
    }

    onClickTeacher = () => {
	this.setState({...this.state,
	    userType: "teacher",
	    goTo : "/teacher-dashboard"
	})
    }

    onClickResearcher = () => {
	this.setState({...this.state,
	    userType: "researcher",
	    goTo : "/"
	})
    }

    // Triggered when the login text field receives text input
    onLoginInputChange = (e) => {
	this.setState({...this.state, loginInput: e.target.value})
    }

    // Triggered when the mdp text field receives text input
    onPwdInputChange = (e) => {
	this.setState({...this.state, pwdInput: e.target.value})
    }

    // Triggered when the Connection button is clicked
    onConnectionClick = (login, password, userType) => {
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

	fetch(this.props.baseURL + endpoint, {
	    method: "GET",
	    headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Authorization': 'Basic ' + btoa(login + ':' + password)
	    },
	}).then((response) => {
	    if(response.ok) {
		console.log('Login successful!')
		this.props.dispatch(userActions.setUserLogin(login))
		this.props.dispatch(userActions.setUserHash(btoa(login + ':' + password)))
		this.setState({...this.state,
		    redirect: true
		})
	    }else {
		console.log('Login failed.');
		this.setState({...this.state,
		    error: true
		})
	    }
	});
    }

  render() {
  
      if (this.state.redirect) {
	  return ( <Redirect to={this.state.goTo} /> )
      } else if (this.state.error) {
	return (
	    <div className="Login-form">

	    <h1>Dlearn</h1>
	    <div className="alert alert-danger alert-dismissible fade show" role="alert">
	    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	    </button>
		Invalid login or password.
	    </div>
	    <div className="form-group">
			<label for="usr">Login:</label>
		<input type="text" className="form-control" id="usr"
		    onChange={(event) => this.onLoginInputChange(event)} value={this.state.loginInput}/>
		    </div>
		    <div className="form-group">
			<label for="pwd">Password:</label>
		<input type="password" className="form-control" id="pwd" value={this.state.pwdInput}
		    onChange={(event) => this.onPwdInputChange(event)}/>
		</div>

		<div className="radio">
			<label><input type="radio" name="status" onClick={this.onClickStudent} />Student</label>
		    </div>
		    <div className="radio">
			<label><input type="radio" name="status" onClick={this.onClickTeacher} />Teacher</label>
		    </div>
		    <div className="radio disabled">
			<label><input type="radio" name="status" disabled />Researcher</label>
		    </div>

	    {//<Link style={{display: 'block', height: '100%'}} to={this.state.goTo}><button type="button" className="btn btn-primary">Connection</button></Link>
	    }  
		<button type="button" className="btn btn-primary" onClick={() => this.onConnectionClick(this.state.loginInput, this.state.pwdInput, this.state.userType)}>Connection</button>

	</div>
	    );
      } else {
	return (
	    <div className="Login-form">

	    <h1>Dlearn</h1>

	    <div className="form-group">
			<label for="usr">Login:</label>
		<input type="text" className="form-control" id="usr"
		    onChange={(event) => this.onLoginInputChange(event)} value={this.state.loginInput}/>
		    </div>
		    <div className="form-group">
			<label for="pwd">Password:</label>
		<input type="password" className="form-control" id="pwd" value={this.state.pwdInput}
		    onChange={(event) => this.onPwdInputChange(event)}/>
		</div>

		<div className="radio">
			<label><input type="radio" name="status" onClick={this.onClickStudent} />Student</label>
		    </div>
		    <div className="radio">
			<label><input type="radio" name="status" onClick={this.onClickTeacher} />Teacher</label>
		    </div>
		    <div className="radio disabled">
			<label><input type="radio" name="status" disabled />Researcher</label>
		    </div>

	    {//<Link style={{display: 'block', height: '100%'}} to={this.state.goTo}><button type="button" className="btn btn-primary">Connection</button></Link>
	    }  
		<button type="button" className="btn btn-primary" onClick={() => this.onConnectionClick(this.state.loginInput, this.state.pwdInput, this.state.userType)}>Connection</button>

	</div>
	    );
    }
  }
}

export default connect(mapStateToProps)(Login);

