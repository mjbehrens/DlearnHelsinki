import React, { Component } from 'react';


import SpiderGraph from '../components/SpiderGraph.js';

class StudentDashboard extends Component {

  render() {
  
    return (
      <div className="text-center">

        <h1>Welcome Tobi!</h1>
         
        <div className="row">
		  <div className="col-sm-4">
		    <div className="btn-group-vertical">
		      <button type="button" className="btn btn-primary">Survey</button>
		      <button type="button" className="btn btn-primary">Historic</button>
		      <button type="button" className="btn btn-primary">Profil</button>
		    </div>
		  </div>
		  <div className="col-sm-8">
		    <SpiderGraph />
		  </div>
		</div> 

      </div>
    );
  }
}

export default StudentDashboard;
