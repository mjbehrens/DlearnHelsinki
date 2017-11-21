import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES, BACKEND_API } from '../constants.js';
import { withTranslate } from 'react-redux-multilingual';

import StudentSurveyQuestion from './StudentSurveyQuestion.js'
import SpiderGraph from '../components/shared/SpiderGraph.js';
import LinearGraph from '../components/shared/LinearGraph.js';
import Spinner from 'react-spinner';

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';


let GET_SURVEYS = '';

var surveys = [];
let compo;


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
			state: { survey_id: compo.state.survey._id,
				 survey_title: compo.state.survey.title }
		});
	}

	constructor(props) {
		super(props);

		const {translate} = this.props;
		compo = this;

		let survey_id = null;
		if (this.props.location.state != null) {
			console.log(this.props.location.state);
			survey_id = this.props.location.state.survey_id
			console.log(survey_id);
		}

		this.state = {
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

		console.log(this.props.user);
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
				lastSurvey: lastSurvey
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

		let parameters = {
			teachers: null,
			students: this.props.user.id,
			classes: 1,
			groups: null,
			surveys: compo.state.lastSurvey._id,

		}

		if (parameters.surveys) {
			return (
				<SpiderGraph name={this.state.lastSurvey.title} parameters={parameters} />
			)
		}
		else {
			return (
				<div>
					<div className='spinner-container'>
						<Spinner />
					</div>
					{this.props.translate('check_open_survey')} ...
				</div>
			)
		}
	}

	render() {

		return (
			<div className="container text-center">
			    <h1>{this.props.translate('welcome')} {this.props.user.name}</h1>
				<div className="jumbotron">


					<div className="row">
						<div className="col-sm-3">
							<div className="btn-group-vertical">
								<button type="button" disabled={this.state.disabledSurvey} onClick={this.startSurvey} className="btn btn-primary">{this.props.translate('survey')}</button>
								<button type="button" className="btn btn-primary">{this.props.translate('history')}</button>
								<button type="button" className="btn btn-primary">{this.props.translate('profile')}</button>
							</div>
						</div>
						<div className="col-sm-9">
							{compo.displaySpiderGraph()}
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(withTranslate(StudentDashboard));
