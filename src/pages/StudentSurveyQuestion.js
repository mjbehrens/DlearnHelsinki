import React, { Component } from 'react';
import axios from 'axios';

import Slider from 'rc-slider';
import { Redirect } from 'react-router'
import 'rc-slider/assets/index.css';



const surveyJson = '[{"_id": 1,"question": "I presented my own viewpoints in the group","min_answer": 1,"max_answer": 10},{"_id": 2,"question": "I listening other\'s opinions","min_answer": 1,"max_answer": 5},{"_id": 3,"question": "I tried to understand others ideas","min_answer": 1,"max_answer": 5},{"_id": 4,"question": "I gave feedback of the developments for others","min_answer": 1,"max_answer": 5},{"_id": 5,"question": "I participated actively to the groupework","min_answer": 1,"max_answer": 5},{"_id": 6,"question": "I took enough responsibility of the groupwork","min_answer": 1,"max_answer": 5},{"_id": 7,"question": "I helped others in the challenges of the groupwork","min_answer": 1,"max_answer": 5},{"_id": 8,"question": "I received useful feedback in the group to continue the work","min_answer": 1,"max_answer": 5},{"_id": 9,"question": "I focused completely on doing the groupwork","min_answer": 1,"max_answer": 5},{"_id": 10,"question": "I took others ideas into account in the groupwork","min_answer": 1,"max_answer": 5},{"_id": 11,"question": "Everyone participated equally in the groupwork","min_answer": 1,"max_answer": 5},{"_id": 12,"question": "I worked with others who could help","min_answer": 1,"max_answer": 5},{"_id": 13,"question": "I encouraged our group in doing the collaborative task","min_answer": 1,"max_answer": 5}]';


class StudentSurveyQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonValue: 'Next',
            redirect: false,
            index: 0,
            survey_id : 0,
            survey: [],
            currentQuestion: {
                id: 0,
                question: '',
                min_answer: 0,
                max_answer: 0,
            },
            startPoint: 3
        }
    }

    componentDidMount() {

        this.setState({
            ...this.state,
            survey: this.parsingJsonQuestion(),
            currentQuestion: this.parsingJsonQuestion()[this.state.index]
        })
    }

    parsingJsonQuestion = function () {
        let survey = [];
        var myObject = JSON.parse(surveyJson);
        myObject.forEach(function (e) {
            let question = {
                id: e._id,
                question: e.question,
                min_answer: e.min_answer,
                max_answer: e.max_answer,
            }

            survey.push(question);

        }, this);
        return survey;
    }

    requestSurveyContent = function () {
        let result = {
            data: [],
            message: ''
        };

        fetch('http://dlearn-helsinki-backend.herokuapp.com/webapi/teachers/1/classes/1/surveys/', {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Basic ' + btoa('teacher:password')
            }
        }).then(function (response) {
                if (response.ok) {
                    console.log(response)
                    response.json().then(data => {

                        result.data = data;
                        result.message = response.statusText;
                        //console.log(result.data);
                        console.log(result);
                    });
                } else {
                    result.message = 'Network response was not ok.';
                    console.log(result);
                }
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });

    }

    onSliderChange = (value) => {
        this.setState({
            ...this.state.startPoint = value,
        });
    }


    onClickNext = () => {
        this.requestSurveyContent();

        if (this.state.index < this.state.survey.length) {
            //send answer to server
            var newProcess = {
                answer: this.state.startPoint
            };

            var data = new FormData();
            data.append("json", JSON.stringify(newProcess));

            /* fetch('/student/groups/1/surveys/3/questions/' + this.state.currentQuestion.id + '/answer', {
                 method: 'put',
                 body: data
             });
             */
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
                    <p> {this.state.currentQuestion.question} </p>
                    <Slider
                        min={this.state.currentQuestion.min_answer}
                        max={this.state.currentQuestion.max_answer} dots={true}
                        value={this.state.startPoint}
                        onChange={this.onSliderChange} />

                    <span>{this.state.startPoint}/{this.state.currentQuestion.max_answer} </span>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={this.onClickNext}>{this.state.buttonValue}</button>
                </div>
            );
        }
    }
}

export default StudentSurveyQuestion;
