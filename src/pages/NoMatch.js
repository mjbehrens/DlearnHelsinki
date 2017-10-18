
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';


class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
		    goTo : ROUTES.ROOT
		};
	}

	
  render() {
  
    return (
	<div className="container">
	    <h1>Error 404</h1>
	    <p>Oups ! The page you are looking for doesn't exist...</p>
	</div>
          );
  }
}

export default Home;
