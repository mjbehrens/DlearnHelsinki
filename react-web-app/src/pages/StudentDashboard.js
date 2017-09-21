import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import SpiderGraph from '../components/SpiderGraph.js';

class StudentDashboard extends Component {

  render() {
  
    return (
      <div className="text-center">
        <Header />
        <h1>Welcome Tobi!</h1>
         
        <div className="row">
		  <div className="col-sm-4">
		    <div className="btn-group-vertical">
				<Link to='/student-survey'><button type="button" className="btn btn-primary">Survey</button></Link>
				<button type="button" className="btn btn-primary">Historic</button>
		      <button type="button" className="btn btn-primary">Profil</button>
		    </div>
		  </div>
		  <div className="col-sm-8">
		    <SpiderGraph />
		  </div>
		</div> 
        <Footer />
      </div>
    );
  }
}

export default StudentDashboard;
