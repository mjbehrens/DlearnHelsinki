import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES, BACKEND_API } from '../constants.js';

import StudentSurveyQuestion from './StudentSurveyQuestion.js'
import SpiderGraph from '../components/shared/SpiderGraph.js';
import LinearGraph from '../components/shared/LinearGraph.js';
import Spinner from 'react-spinner';
import StudentProfile from '../components/studentCompo/StudentProfile.js';
import StudentProfileButton from '../components/studentCompo/StudentProfileButton.js';
import StudentCWButton from '../components/studentCompo/StudentCWButton.js';

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';


let GET_SURVEYS = '';

var surveys = [];
let compo;
const HISTORY = "histroy";
const PROFILE = "profile";
const COMPETENCE_WALL = "competence_wall";


function mapStateToProps(store) {
	return {
		user: store.user.user,
	}
}

class StudentDashboard extends Component {

	// send the survey ID to the next page
	startSurvey = (e) => {
		e.preventDefault();
		this.props.history.push({
			pathname: ROUTES.STUDENT_SURVEY,
			state: {
				survey_id: compo.state.survey._id,
				survey_title: compo.state.survey.title
			}
		});
	}

	constructor(props) {
		super(props);

		compo = this;

		let survey_id = null;
		if (this.props.location.state != null) {
			survey_id = this.props.location.state.survey_id
		}

		this.state = {
			toRender: null,
			disabledSurvey: true,
			lastSurvey: {
				_id: survey_id,
				open: false,
				title: "Last Result Survey",
				description: null,
				start_date: null,
				end_date: null,
			},
			survey: {
				_id: null,
				open: false,
				title: null,
				description: null,
				start_date: null,
				end_date: null,
			}
		}


	}

	buildRequestRest = function () {
		GET_SURVEYS = 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys';
	}

	componentDidMount() {
		//call for survey open
		compo.buildRequestRest();
		compo.getAllSurveyREST();
	}

	// Get all the survey from one class
	getAllSurveyREST = function () {

		fetch(BACKEND_API.ROOT + GET_SURVEYS, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + this.props.user.hash,
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					surveys = data;
					//print received surveys
					console.log(surveys);

					// check if a survey is open & check the last survey done
					compo.checkIfSurveyOpen();
					compo.checkLastSurveyDone();
				});
			} else {
				console.log('Network response was not ok.');
			}
		}).catch(function (err) {
			// Error
			console.log(err);
		});
	}

	// check if a survey is currently open 
	checkIfSurveyOpen = function () {

		let noSurveyOpen = true;

		let lastDate = Date.parse(surveys[0].end_date);
		let lastSurveyId = surveys[0]._id;

		surveys.forEach(function (s) {

			let tempDate = Date.parse(s.end_date);

			if (lastDate < tempDate) {
				lastDate = tempDate;
				lastSurveyId = s._id;
			}

			if (s.open) {
				noSurveyOpen = false;
				this.updateState(s);
			}

		}, this);

		// if no survey open then do nothing.
		if (noSurveyOpen) {
			compo.updateState({
				_id: lastSurveyId,
				open: false,
				title: null,
				description: null,
				start_date: null,
			});
		}
	}


	// check if a survey is currently open 
	checkLastSurveyDone = function () {

		if (this.state.lastSurvey._id == null) {

			let tempSurveys = surveys.filter(function (s) {
				return s.open === false;
			});

			let lastDate = Date.parse(tempSurveys[0].end_date);
			let lastSurvey = tempSurveys[0];


			tempSurveys.forEach(function (s) {

				let tempDate = Date.parse(s.end_date);

				if (lastDate < tempDate) {
					lastDate = tempDate;
					lastSurvey = s;
				}
			}, this);

			// update the last survey id.
			this.setState({
				...this.state,
				lastSurvey: lastSurvey,
			});
		}
	}

	// call for update the state with the survey
	updateState = (s) => {
		//if a survey is open
		if (s.open) {
			this.setState({
				...this.state,
				disabledSurvey: false,
				survey: {
					_id: s._id,
					title: s.title,
					description: s.description,
					open: s.open,
					start_date: s.start_date,
				}
			});
			//else if they are all closed
		} else {
			this.setState({
				...this.state,
				disabledSurvey: true,
				survey: {
					_id: s._id,
					title: s.title,
					description: s.description,
					open: s.open,
					start_date: s.start_date,
				}
			});
		}

		console.log(this.state.survey);
	}

	displaySpiderGraph = function () {

		let parametersStudent = {
			teachers: null,
			students: this.props.user.id,
			classes: null,
			groups: null,
			surveys: compo.state.lastSurvey._id,

		}

		/*
		let parametersClass = {
			teachers: null,
			students: this.props.user.id,
			classes: this.props.user.classid,
			groups: null,
			surveys: compo.state.lastSurvey._id,

		}
		*/

		if (parametersStudent.surveys) {
			return (
				<div>
				<SpiderGraph name={this.state.lastSurvey.title} parameters={parametersStudent} />
				{
				//<SpiderGraph name={this.state.lastSurvey.title} parameters={parametersClass} />
				}
				
				</div>
			)
		}
		else {
			return (
				<div>
					<div className='spinner-container'>
						<Spinner />
					</div>
				</div>
			)
		}
	}


	changeSurveyButton = function () {
		if (this.state.disabledSurvey) {
			return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">No Survey</button>
		} else {
			return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">Survey</button>
		}
	}

	renderAccessSurveyButton = function () {
		if (this.state.disabledSurvey) {
			return (
				<div className="card card-inverse w-100">
					<img className="card-img-top teacher-card-img" src={"http://www.swissfruit.ch/sites/default/files/styles/sf_matrix/public/fruechte/pink_lady_0.jpg?itok=JfpYtcrT&c=80aed0c096c1765c9fefc5ff39e840df"} width="100" height="100"
						
						alt="profil icon" />
					<div className="card-body">
						<h4 className="card-title">{"Survey"}</h4>
					</div>
				</div>
			)

			//return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">No Survey</button>
		} else {
			return (
				<div className="card card-inverse w-100">
					<img className="card-img-top teacher-card-img" src={"http://thumb1.shutterstock.com/photos/thumb_large/676765/132109130.jpg"} width="100" height="100"
						onClick={this.startSurvey}
						alt="profil icon" />
					<div className="card-body">
						<h4 className="card-title">{"Survey"}</h4>
					</div>
				</div>
			)

			//return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">Survey</button>
		}
		
		
		
		
	}

	renderProfileButton = function () {
		return (
			<div className="card card-inverse w-100" >
				<img className="card-img-top teacher-card-img" src={"http://www.swissfruit.ch/sites/default/files/styles/sf_matrix/public/fruechte/pink_lady_0.jpg?itok=JfpYtcrT&c=80aed0c096c1765c9fefc5ff39e840df"} width="100" height="100"
					onClick={this.showProfile}
					alt="profil icon"
					 />
				<div className="card-body">
					<h4 className="card-title">{"My Profile"}</h4>
				</div>
			</div >
		)
	}


	renderCompetenceWallButton = function () {
		return (
			<div className="card card-inverse w-100" >
				<img className="card-img-top teacher-card-img" src={"http://www.swissfruit.ch/sites/default/files/styles/sf_matrix/public/fruechte/pink_lady_0.jpg?itok=JfpYtcrT&c=80aed0c096c1765c9fefc5ff39e840df"} width="100" height="100"
					onClick={this.showCompetenceWall}
					alt="competence wall icon"
					 />
				<div className="card-body">
					<h4 className="card-title">{"My Competence Wall"}</h4>
				</div>
			</div>
		)
	}

	showProfile = function (){
		let item = (<div></div>)
		item = <StudentProfile />
		compo.setState({ toRender: item })
	}

	showCompetenceWall = function (){
		let item = (<div></div>)
		item = compo.displaySpiderGraph()
		compo.setState({ toRender: item })
	}

	render() {

		return (
			<div>
				<div className="container text-center">
					<h1>Welcome {this.props.user.name}</h1>
					<br />

					<div className="row">

						<div className="col-sm-3">

							<div class="btn-group" role="group">
								<div className="btn-group-vertical">
									{this.renderAccessSurveyButton()}
									<br/>
									{this.renderProfileButton()}
									<br/>
									{this.renderCompetenceWallButton()}
									<br />
									<StudentProfileButton onClick={this.showProfile}/>
									<br />
								</div>
							</div>

						</div>

						<div className="col-sm-9">
							<div className="jumbotron">
								{this.state.toRender}
							</div>
						</div>

					</div>

				</div>

			</div>
		);
	}
}

export default connect(mapStateToProps)(StudentDashboard);

