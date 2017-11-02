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
	    <Link to={ROUTES.LOGIN}><button className="btn btn-lg btn-primary" role="button">Login &raquo;</button></Link>
	    </div>
	</div>
          );
  }
}

export default Home;
