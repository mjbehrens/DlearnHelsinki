import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import Spinner from 'react-spinner'

//redux setup
import { ROUTES, BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


let GET_ANSWERS = '';
let GET_QUESTIONS_FOR_SURVEY = '';




function mapStateToProps(store) {
	return {
		user: store.user.user,
	}
}

// VERY IMPORTANT !
let params;

class SpiderGraph extends Component {

	constructor(props) {
		super(props);

		params = this.props.parameters;

		this.state = {
			isLoading: true,
			noData: true,
			cpt: 0,
			data: {
				labels: [], //label of the themes 
				datasets: [{
					label: this.props.name, // name of the graph
					lineTension: .05,
					backgroundColor: this.stringToColour(this.props.color),
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
					data: [] // answers
				}
				]
			}
		};

		this.getDataForGraph();
	}

	componentDidMount() {
		//this.getDataForGraph();
	}

	// Called everytime a props value change
	componentWillReceiveProps(nextProps) {
		if (params != nextProps.parameters) {
			params = nextProps.parameters;
			console.log(params);
			this.getDataForGraph();
		}
	}

	// Fetch resquest for questions and answer
	getDataForGraph = function () {
		this.buildRequestRest();
		this.getSurveyAnswersREST();
	}

	// Build request from props send to the component
	// ( looks ugly but it's a propotype :) )
	buildRequestRest = function () {

		let s = "";

		if (params.teachers != null) {
			s += 'teachers/' + params.teachers;


			if (params.classes != null) {
				s += '/classes/' + params.classes;
			}
			if (params.groups != null) {
				s += '/groups/' + params.groups;
			}
			if (params.students != null) {
				s += '/students/' + params.students;
			}

		} else if (params.students != null) {
			s += 'students/' + params.students;

			if (params.classes != null) {
				s += '/classes/' + params.classes;
			}
			if (params.groups != null) {
				s += '/groups/' + params.groups;
			}
		}

		if (params.surveys != null) {
			s += '/surveys/' + params.surveys;
		}

		GET_ANSWERS = s + '/answers';
		GET_QUESTIONS_FOR_SURVEY = s + '/questions';

	}

	getSurveyAnswersREST = function () {
		// set the spinner to true
		this.setState({ isLoading: true });

		let component = this;
		let Answers = [];


		fetch(BACKEND_API.ROOT + GET_ANSWERS, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + this.props.user.hash,
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					data.forEach(function (a) {
						let answer = {
							theme_id: a.theme_id,
							answer: a.answer,
							theme_title: a.theme_title,
							description: a.description,
							start_date: a.start_date,
						}
						Answers.push(a);

					}, this);

					if (Answers.length > 0) {

						let labelsArray = [];
						let answerArray = [];
						Answers.forEach(function (e) {
							labelsArray.push(e.theme_title);
							answerArray.push((e.answer).toFixed(1));
							// if description supported, added here
						}, this);

						component.setState({
							...component.state,
							isLoading: false,
							noData: false,
							data: {
								...component.state.data,
								labels: labelsArray,
								datasets: [{
									...component.state.data.datasets,
									label: component.props.name,
									data: answerArray,
									backgroundColor: component.stringToColour(component.props.color),
								}]
							}
						});
					} else {
						console.log("problem while parsing json data")
						component.setState({
							isLoading: false,
							noData: true
						});
					}
				});
			} else {
				console.log('Network response was not ok.');
			}
		}).catch(function (err) {
			// Error :(
			console.log(err);
		});
	}

	//take a string and create a original color 
	stringToColour = function (str) {

		// default value if props null
		if (str == null) {
			str = 'unkle - lonely soul';
		}

		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = '#';
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}

		function cutHex(h) { return (h.charAt(0) === "#") ? h.substring(1, 7) : h }
		function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
		function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
		function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }

		let R = hexToR(colour);
		let G = hexToG(colour);
		let B = hexToB(colour);

		return 'rgba(' + R + ',' + G + ',' + B + ',0.4)';
	}


	render() {

		var options = {
			responsive: true,
			maintainAspectRatio: true,
			scale: {
				ticks: {
					beginAtZero: true,
					max: 5
				}
			}
		};

		if (this.state.isLoading) {
			return (
				<div className='spinner-container'>
					<Spinner />
				</div>

			)
		} else if (this.state.noData === true) {
			return (
				<div className="jumbotron">
					<h5>{this.props.name}</h5>
					No Data Found
				</div>

			);
		}
		else {
			return (
				<Radar data={this.state.data} options={options} />
			);
		}

	}
}

export default connect(mapStateToProps)(SpiderGraph);

