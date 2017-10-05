import React, { Component } from 'react';

import Slider from 'rc-slider';
import { Redirect } from 'react-router'
import 'rc-slider/assets/index.css';

const ORIGIN = 'http://dlearn-helsinki-backend.herokuapp.com/webapi/';
const GET_SURVEYS = 'teachers/1/classes/1/surveys/';
const GET_QUESTIONS_FOR_SURVEY = 'students/1/classes/1/surveys/27/questions';
const PUT_QUESTION_ANSWER = 'students/1/classes/1/surveys/27/answers/'; //needs one more parameters

class StudentSurveyQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonValue: 'Next',
            redirect: false,
            index: 0,
            survey_id: 0,
            survey: [],
            currentQuestion: {
                id: 0,
                question: 'Loading the survey...',
                min_answer: 0,
                max_answer: 0,
            },
            startPoint: 3
        }
    }

    componentDidMount() {
        this.getSurveyQuestionsREST();
    }

    getSurveyQuestionsREST = function () {
        var component = this;

        var survey = [];

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
        }).catch(function (err) {
            // Error :(
            console.log(err);
        });
    }

    putQuestionsAnswerREST = function (data) {
        fetch(ORIGIN + PUT_QUESTION_ANSWER + this.state.currentQuestion.id, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('teacher:password')
            },
            body: data
        }).then(function (response) {
            if (response.ok) {
                console.log(response.body)
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
        this.getSurveyQuestionsREST();

        if (this.state.index < this.state.survey.length) {
            //send answer to server

            var data = JSON.stringify({
                answer: this.state.startPoint
            });
            this.putQuestionsAnswerREST(data);
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
            return <Redirect to="/student-dashboard" />
        }
        else {

            return (
                <div className="Login-form">
                    <p><h3>{this.state.currentQuestion.id}</h3>{this.state.currentQuestion.question}</p>
                    <Slider
                        min={this.state.currentQuestion.min_answer}
                        max={this.state.currentQuestion.max_answer} dots={true}
                        value={this.state.startPoint}
                        onChange={this.onSliderChange} />

                    <p> 
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

export default StudentSurveyQuestion;
