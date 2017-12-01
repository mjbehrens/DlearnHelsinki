import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

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
let component;

class DataCollector extends Component {

	constructor(props) {
		super(props);

		const {translate} = this.props;
       
        component = this;

		this.state = {
			isLoading: true,
			noData: true,
			cpt: 0,
			data: {
				labels: [], //label of the themes
				datasets: []
			}
		};

	}

	componentDidMount() {
		this.getDataForGraph2();
	}

	// Called everytime a props value change
	componentWillReceiveProps(nextProps) {
		if ( (params != nextProps.parameters) && (nextProps.parameters.surveys != null) ) {
			params = nextProps.parameters;
			console.log(params);
			this.getDataForGraph2();
		}
	}

	// Fetch resquest for questions and answer
	getDataForGraph = function () {
		//this.buildRequestRest();
		//this.getSurveyAnswersREST();
    }
    
    getDataForGraph2 = function (){
        this.props.parameters.forEach(params => {
            let request = component.buildRequestRest(params);
            component.getSurveyAnswersREST(request);
        });
    }

	// Build request from props send to the component
	// ( looks ugly but it's a propotype :) )
	buildRequestRest = function (params) {

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
        
        return GET_ANSWERS;

	}

	getSurveyAnswersREST = function (request) {
		// set the spinner to true
		this.setState({ isLoading: true });

		let Answers = [];

		fetch(BACKEND_API.ROOT + request, {
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

                        console.log('REP OK')
                        
						let labelsArray = [];
						let answerArray = [];
						Answers.forEach(function (e) {
							labelsArray.push(e.theme_title);
							answerArray.push((e.answer).toFixed(1));
							// if description supported, added here
						}, this);
                        
                        let new_datasets = component.state.data.datasets;

                        new_datasets.push({
                            label: component.props.name,
                            lineTension: .05,
                            backgroundColor: component.stringToColour(component.props.color),
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: answerArray,
                        })

						component.setState({
							...component.state,
							isLoading: false,
							noData: false,
							data: {
								...component.state.data,
								labels: labelsArray,
								datasets: new_datasets,
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

		return (<div> {console.log(this.state.data)} </div>)
	}
}

export default connect(mapStateToProps)(withTranslate(DataCollector));
