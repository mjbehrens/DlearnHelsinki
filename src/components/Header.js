import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';
import logo from '../res/icons/dlearn_logo.svg';
import * as userActions from '../actions/userActions';
import * as classActions from '../actions/classActions';

function mapStateToProps(store) {
    return {
	user: store.user.user,
	classes: store.classroom.classes,
    }
}﻿

class Header extends React.Component {
    loginLogoutButton = () => {
        if (this.props.user.loggedin) {
	    return (
		<Link to={ROUTES.ROOT}>
		    <button className="btn btn-outline-success my-2 my-sm-0"
			type="submit"
			onClick={this.onLogoutClick}>
		    Log out
		    </button>
		</Link>
	    )
	} else {
	    return (
		<Link to={ROUTES.LOGIN}>
		    <button className="btn btn-outline-success my-2 my-sm-0"
			type="submit">
		    Log in
		    </button>
		</Link>
	    )
	}
    }

    headerLinks = () => {
	if (this.props.user.type === 'teacher') {
	    return (
		<ul className="navbar-nav mr-auto">
		    <li className="nav-item">
			<Link to={ROUTES.TEACHER_DASHBOARD}>
			    <a className="nav-link" href="">Dashboard</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.CLASS_SELECTION}>
			    <a className="nav-link" href="">Classes</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.GROUP_MANAGEMENT}>
			    <a className="nav-link" href="">Groups</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.HISTORY}>
			    <a className="nav-link" href="">History</a>
			</Link>
		    </li>
		</ul>
	    )
	} else if (this.props.user.type === 'student') {
	    return (
		<ul className="navbar-nav mr-auto">
		    <li className="nav-item">
			<Link to={ROUTES.STUDENT_DASHBOARD}>
			    <a className="nav-link" href="">Dashboard</a>
			</Link>
		    </li>
		    <li className="nav-item">
			<Link to={ROUTES.CLASS_SELECTION}>
			    <a className="nav-link" href="">Classes</a>
			</Link>
		    </li>
		</ul>
	    )
	} else {
	    return (
		<ul className="navbar-nav mr-auto">
		<li className="nav-item">
		<Link to={ROUTES.ROOT}><a className="nav-link" href="">Home</a></Link>
		</li>
		<li className="nav-item">
		    <a className="nav-link" href="#">About</a>
		</li>
		<li className="nav-item">
		    <a className="nav-link" href="#">Contact</a>
		</li>
		</ul>
	    )
	}
    }

    onLogoutClick = () => {
	this.props.dispatch(userActions.logoutUser())
	this.props.dispatch(classActions.deleteClasses())
    }

    render() {
	return (
	<header>

	    <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-static-top">
		<Link to={ROUTES.ROOT}><a className="navbar-brand" href="">Dlearn</a></Link>
	    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	    </button>

	    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
		{this.headerLinks()}
		{this.loginLogoutButton()} 
	    </div>
	    </nav>


	</header>
    );
  }
}

export default connect(mapStateToProps)(Header);
