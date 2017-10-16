import { connect } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as userActions from '../actions/userActions';


function mapStateToProps(store) {
    return {
	user: store.user.user,
    }
}﻿


class LoginLogout extends React.Component {

    onLoginClick = () => {
	this.props.dispatch(userActions.logoutUser())
    }

  render() {
      if (this.props.user.loggedin) {
    return (
	    <Link to="/"><button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.onLoginClick}>Logout</button></Link>
    );
      } else {
    return (
	<Link to="/login"><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button></Link>
    );
    }
  }
}

export default connect(mapStateToProps)(LoginLogout);
