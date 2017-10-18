import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
		    goTo: ROUTES.ROOT
		};
	}

	
  render() {
  
    return (
	<div className="container">

	<div className="jumbotron">
	    <h1>Dlearn.Helsinki</h1>
	    <p>Learning global competencies with new pedagogical tools</p>
	    <Link style={{display: 'block', height: '100%'}} to={ROUTES.LOGIN}><a className="btn btn-lg btn-primary" href="#" role="button">Login &raquo;</a></Link>

	</div>

	</div>
          );
  }
}

export default Home;
