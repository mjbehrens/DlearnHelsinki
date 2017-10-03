import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import SpiderGraph from '../components/shared/SpiderGraph.js';

class StudentDashboard extends Component {


	constructor(props) {
		super(props);

	}

	componentDidMount() {
		//call for survey open 
		
	}


	render() {

		return (
			<div className="text-center">

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

			</div>
		);
	}
}

export default StudentDashboard;
