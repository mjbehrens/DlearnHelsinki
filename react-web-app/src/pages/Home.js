import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

class Home extends Component {

  render() {
  
    return (
      <div className="mx-auto text-center" style={{width: 500}}>
        <Header />
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
		    <label><input type="radio" name="status" />Student</label>
		  </div>
		  <div className="radio">
		    <label><input type="radio" name="status" />Teacher</label>
		  </div>
		  <div className="radio disabled">
		    <label><input type="radio" name="status" disabled />Researcher</label>
		  </div>
		  
		  <Link style={{display: 'block', height: '100%'}} to='/student-dashboard'><button type="button" className="btn btn-primary">Connection</button></Link>
	      
          <Footer />
      </div>
    );
  }
}

export default Home;
