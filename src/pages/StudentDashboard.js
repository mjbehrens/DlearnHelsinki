import React, { Component } from 'react';
import { ROUTES, BACKEND_API } from '../constants.js';
import { withTranslate } from 'react-redux-multilingual';

import SpiderGraph from '../components/shared/SpiderGraph.js';
import SpiderGraph2 from '../components/shared/SpiderGraph2.js';
import LinearGraph from '../components/shared/LinearGraph.js';
import Spinner from 'react-spinner';
import StudentProfile from '../components/studentCompo/StudentProfile.js';
import StudentProfileButton from '../components/studentCompo/StudentProfileButton.js';
import StudentHistory from '../components/studentCompo/StudentHistory.js';


//icons:
import iconGrpManagment from "../res/icons/manage_groups.svg";
import iconSurveyOpen from "../res/icons/survey.svg";
import iconSurveyClose from "../res/icons/close_survey.svg";
import iconMyCompetenceWall from "../res/icons/competence_wall.png"
import iconHistory from "../res/icons/history.svg";


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

		const { translate } = this.props;
		compo = this;

		let survey_id = null;
		if (this.props.location.state != null) {
			survey_id = this.props.location.state.survey_id
		}

		this.state = {
			toRender: (<StudentProfile />),
			isLoading: true,
			disabledSurvey: true,
			lastSurvey: {
				_id: survey_id,
				open: false,
				title: translate('latest_result'),
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
					console.log(data);
					compo.setState({
						toRender: (
							<div>
								<h4><u>Result</u></h4>
								<br /><br />
								<StudentHistory data={surveys} />
							</div>)
					})

					// check if a survey is open & check the last survey done
					compo.checkIfSurveyOpen(surveys);
					compo.checkLastSurveyDone(surveys);

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
	checkIfSurveyOpen = function (surveys) {

		let noSurveyOpen = true;
		surveys.forEach(function (s) {
			if (s.open) {
				noSurveyOpen = false;
				this.updateState(s);
			}
		}, this);

		// if no survey open then do nothing.
		if (noSurveyOpen) {
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


		}
	}

	checkLastSurveyDone = function (surveys) {

		let lastSurvey = null;

		if (surveys.length > 0) {
			// only look for closed surveys
			let tempSurveys = surveys.filter(function (s) {
				return s.open == false;
			});

			if (tempSurveys.length > 0) {

				// find the highest date of all surveys
				let last_d = tempSurveys.map(function (s) { return new Date(s.end_date); }).sort(function (a, b) { return b - a; })[0]
				// get the survey that match this date
				lastSurvey = surveys.filter(function (s) {
					let d = new Date(s.end_date)
					return d.toString() === last_d.toString();
				})[0];
				// update the last survey id.
				this.setState({
					...this.state,
					lastSurvey: lastSurvey,
					isLoading: false,
				});
			}
		}
		this.setState({
			...this.state,
			isLoading: false,
		});

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
					<img className="card-img-top teacher-card-img" src={iconSurveyClose} width="100" height="100"

						alt="profil icon" />
					<div className="card-body">
						<h4 className="card-title">{"Survey closed"}</h4>
					</div>
				</div>
			)

			//return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">No Survey</button>
		} else {
			return (
				<div className="card card-inverse w-100" onClick={this.startSurvey}>
					<div className="hoverCard">
						<img className="card-img-top teacher-card-img" src={iconSurveyOpen} width="100" height="100"
							alt="profil icon" />
						<div className="card-body">
							<h4 className="card-title">{"Answer survey"}</h4>
						</div>
					</div>
				</div>
			)

			//return <button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">Survey</button>
		}

	}

	renderProfileButton = function () {
		return (

			<div className="card card-inverse w-100" onClick={this.showProfile}>
				<div className="hoverCard">
					<img className="card-img-top teacher-card-img" src={iconGrpManagment} width="100" height="100"
						alt="profil icon"
					/>
					<div className="card-body">

						<h4 className="card-title">{"My Profile"}</h4>
					</div>
				</div>
			</div >
		)
	}


	renderHistoryButton = function () {
		return (
			<div className="card card-inverse w-100" onClick={this.showStudentHistory}>
				<div className="hoverCard">
					<img className="card-img-top teacher-card-img" src={iconHistory} width="100" height="100"
						alt="competence wall icon"
					/>
					<div className="card-body">
						<h4 className="card-title">{"Result"}</h4>

					</div>
				</div>
			</div>
		)
	}

	showProfile = function () {
		let item = (<div></div>)
		item = <StudentProfile />
		compo.setState({ toRender: item })
	}

	showStudentHistory = function () {
		let item = (<div></div>)
		item = <StudentHistory data={surveys} />
		item = (
			<div>
				<h4><u>Result</u></h4>
				<br /><br />
				{item}
			</div>)
		compo.setState({ toRender: item })
	}


	render() {
		const { translate } = this.props;

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
									<br />
									{this.renderProfileButton()}
									<br />
									{this.renderHistoryButton()}
								</div>
							</div>

						</div>

						<div className="col-sm-9 expand-width">
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

export default connect(mapStateToProps)(withTranslate(StudentDashboard));
