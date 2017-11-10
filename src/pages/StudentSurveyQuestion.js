import React, { Component } from 'react';
import Spinner from 'react-spinner'
import { ROUTES, BACKEND_API } from '../constants.js';

import Slider from 'rc-slider';
import { Redirect } from 'react-router'
import 'rc-slider/assets/index.css';

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

import Star from '../components/Star.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

let GET_QUESTIONS_FOR_SURVEY = '';
let PUT_QUESTION_ANSWER = ''; //needs one more parameters

class StudentSurveyQuestion extends Component {

    constructor(props) {
        super(props);

        let survey_id = null;
        try {
            survey_id = this.props.location.state.survey_id
        } catch (err) {
	    // FIXME
	    // No survey was passed along. Probably there is no survey opened.
	    // Temporary fix : Redirect to NoMatch.
	    this.props.history.replace('/404-error-page')
	}

        this.state = {
            buttonValue: 'Next',
            redirect: false,
	    loading: true,
            index: 0,
            survey_id: survey_id,
            survey: [{
                id: 0,
                question: 'Loading the survey...',
                min_answer: 0,
                max_answer: 0,
            },],
            currentQuestion: {
                id: 0,
                question: 'Loading the survey...',
                min_answer: 0,
                max_answer: 0,
            },
            startPoint: 3
        }

        GET_QUESTIONS_FOR_SURVEY = 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/questions';
        PUT_QUESTION_ANSWER = 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/answers/'; //needs one more parameters

    }

    componentDidMount() {
        this.getSurveyQuestionsREST();
    }

    getSurveyQuestionsREST = () => {
        var component = this;
        var survey = [];

        fetch(BACKEND_API.ROOT + GET_QUESTIONS_FOR_SURVEY, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    data.forEach((e) => {
                        let q = {
                            id: e._id,
                            question: e.question,
                            min_answer: e.min_answer,
                            max_answer: e.max_answer,
                        }
                        survey.push(q);
                    }, this);


                    var tempSurvey = survey;
                    var tempCurrentQuestion = tempSurvey[component.state.index];

                    if (tempSurvey.length > 0) {
                        component.setState({
                            ...component.state,
                            survey: tempSurvey,
                            currentQuestion: tempCurrentQuestion,
                        })
                    }
                });
            } else {
                console.log('Network response was not ok.');
            }
	    this.setState({...this.state,
			loading: false,
			})
        }).catch(function (err) {
            // Error :(
            console.log(err);
        });
    }

    postQuestionsAnswerREST = function (data) {
        fetch(BACKEND_API.ROOT + PUT_QUESTION_ANSWER + this.state.currentQuestion.id, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.props.user.hash,
            },
            body: data
        }).then(function (response) {
            if (response.ok) {
                console.log("answer put on server")
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error :(
            console.log(err);
        });
    }

    // Called every time the slider bar changes its value
    // update the state
    onSliderChange = (value) => {
        this.setState({
            ...this.state.startPoint = value,
        });
    }

    onClickNext = () => {

        if (this.state.index < this.state.survey.length) {
            //send answer to server

            var data = JSON.stringify({
                answer: this.state.startPoint
            });
            this.postQuestionsAnswerREST(data);
            //check if message send correctly

            this.state.index = this.state.index + 1;
            this.setState({
                ...this.state,
                currentQuestion: this.state.survey[this.state.index]
            });
            //for the last click on the button
            if (this.state.index === this.state.survey.length) {
                //show the quit button to the student
                this.setState({
                    ... this.state,
                    buttonValue: 'Quit',
                    currentQuestion: {
                        question: 'You have finished the survey',
                        min_answer: 0,
                        max_answer: 0,
                        _id: 0
                    }
                });
            }
        } else {
            this.setState({ ...this.state.redirect = true })
        }
    }
    

    render() {
        // if survey finish (no more survey)
        if (this.state.redirect) {
            let compo = this;
            this.props.history.push({
                pathname: ROUTES.STUDENT_DASHBOARD,
                state: { survey_id: compo.state.survey_id }
            });
            //return <Redirect to="/student-dashboard" />
        } else if (this.state.loading) {
            return (
                <div className="spinner-container">
		    <Spinner />
                </div>
            );
	} else {

            return (
                <div className="Login-form">
                    <p>{this.state.currentQuestion.question}</p>
                    <Slider
                        min={this.state.currentQuestion.min_answer}
                        max={this.state.currentQuestion.max_answer} dots={true}
                        value={this.state.startPoint}
                        onChange={this.onSliderChange} />

                    <p> <Star actual_size = {this.state.startPoint} max_size = {this.state.currentQuestion.max_answer} />
                        <h5>{this.state.startPoint}/{this.state.currentQuestion.max_answer} </h5>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={this.onClickNext}>{this.state.buttonValue}</button>
                    </p>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(StudentSurveyQuestion);
