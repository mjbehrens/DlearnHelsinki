import { connect } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';
import * as userActions from '../actions/userActions';


function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}﻿


class LoginLogout extends React.Component {

    onLogoutClick = () => {
	this.props.dispatch(userActions.logoutUser())
    }

  render() {
      if (this.props.user.loggedin) {
    return (
	    <Link to={ROUTES.ROOT}><button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onLogoutClick}>Logout</button></Link>
    );
      } else {
    return (
	    <Link to={ROUTES.LOGIN}><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button></Link>
    );
    }
  }
}

export default connect(mapStateToProps)(LoginLogout);
