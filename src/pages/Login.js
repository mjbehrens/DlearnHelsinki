import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
			goTo : "/login"
		};
	}

	onClickStudent = () => {
		this.setState({...this.state,
							goTo : "/student-dashboard"
						})
	}

	onClickTeacher = () => {
		this.setState({...this.state,
							goTo : "/teacher-dashboard"
						})
	}

  render() {
  
    return (
	<div className="Login-form">

        <h1>Dlearn</h1>
          
          <div className="form-group">
		    <label for="usr">Login:</label>
		    <input type="text" className="form-control" id="usr" />
		  </div>
		  <div className="form-group">
		    <label for="pwd">Password:</label>
		    <input type="password" className="form-control" id="pwd" />
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
		  
		  <Link style={{display: 'block', height: '100%'}} to={this.state.goTo}><button type="button" className="btn btn-primary">Connection</button></Link>
	      

      </div>
          );
  }
}

export default Login;

