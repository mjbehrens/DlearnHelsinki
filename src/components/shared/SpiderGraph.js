import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

const ORIGIN = 'http://dlearn-helsinki-backend.herokuapp.com/webapi';
var GET_ANSWERS = 'students/1/classes/1/surveys/27/answers';
var GET_QUESTIONS_FOR_SURVEY = 'students/1/classes/1/surveys/27/questions';

class SpiderGraph extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cpt: 0,
			data: {
				labels: [], //label of the questions 
				datasets: [{
					label: this.props.name,
					lineTension: .1,
					backgroundColor: 'rgba(179,181,198,0.2)',
					borderColor: 'rgba(179,181,198,1)',
					pointBackgroundColor: 'rgba(179,181,198,1)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgba(179,181,198,1)',
					data: []
				}
				]
			}
		};
	}

	componentDidMount() {
		this.getDataForGraph();
	}

	
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.name !== this.props.name;
	}

	componentWillReceiveProps(nextProps) {
		this.getDataForGraph();
	}
	

	getDataForGraph = function (){
		this.buildRequestRest();
		this.getSurveyQuestionsREST();
		this.getSurveyAnswersREST();
	}

	buildRequestRest= function (){

		var s = "";
		if(this.props.students != null){
			console.log('students/'+this.props.students);
			s += '/students/'+this.props.students;
		}
		if(this.props.teachers != null){
			console.log('teachers/'+this.props.teachers);
			s += '/teachers/'+this.props.teachers;
		}
		if(this.props.classes != null){
			console.log('classes/'+this.props.classes);
			s += '/classes/'+this.props.classes;
		}
		if(this.props.groups != null){
			console.log('groups/'+this.props.groups);
			s += '/groups/'+this.props.groups;
		}
		if(this.props.surveys != null){
			console.log('surveys/'+this.props.surveys);
			s += '/surveys/'+this.props.surveys;
		}

		GET_ANSWERS = s + '/answers';
		GET_QUESTIONS_FOR_SURVEY = s + '/questions';

	}



	getSurveyQuestionsREST = function () {
		var component = this;

		var questionLabels = [];

		fetch(ORIGIN + GET_QUESTIONS_FOR_SURVEY, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + btoa('teacher:password')
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					data.forEach(function (e) {
						questionLabels.push(e.question);
					}, this);

					if (questionLabels.length > 0) {
						component.setState({
							...component.state,
							data: {
								...component.state.data,
								labels: questionLabels
							}
						});
					} else {
						console.log("problem while parsing json data")
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

	getSurveyAnswersREST = function () {
		var component = this;
		var arrayAnswers = [];

		fetch(ORIGIN + GET_ANSWERS, {
			method: "GET",
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Basic ' + btoa('teacher:password')
			}
		}).then(function (response) {
			if (response.ok) {
				response.json().then(data => {
					data.forEach(function (e) {
						arrayAnswers.push(e.answer);
					}, this);

					if (arrayAnswers.length > 0) {
						component.setState({
							...component.state,
							data: {
								...component.state.data,
								datasets: [{
									...component.state.data.datasets,
									label: component.props.name,
									data: arrayAnswers,
								}]
							}
						});
					} else {
						console.log("problem while parsing json data")
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


	render() {
		return (
			<Radar data={this.state.data} />
		);
	}
}

export default SpiderGraph;
