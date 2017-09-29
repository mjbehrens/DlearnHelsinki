import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'


import SpiderGraph from '../components/shared/SpiderGraph.js';

class StudentDashboard extends Component {

startSurvey = (e) => {
        e.preventDefault();
        return <Redirect to="/student-survey"/>;
}

	render() {

		return (
			<div className="text-center">

				<h1>Welcome Tobi!</h1>

				<div className="row">
					<div className="col-sm-4">
						<div className="btn-group-vertical">
							<button type="button" onClick = {this.startSurvey} className="btn btn-primary">Survey</button>
							<button type="button" className="btn btn-primary">History</button>
							<button type="button" className="btn btn-primary">Profile</button>
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
