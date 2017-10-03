import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			goTo : "/"
		};
	}

	
  render() {
  
    return (
	<div className="container">

	<div className="jumbotron">
	    <h1>Dlearn.Helsinki</h1>
	    <p>Learning global competencies with new pedagogical tools</p>
	    <Link style={{display: 'block', height: '100%'}} to="/login"><a className="btn btn-lg btn-primary" href="#" role="button">Login &raquo;</a></Link>

	</div>

	</div>
          );
  }
}

export default Home;
