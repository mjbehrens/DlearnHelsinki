import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';

import { ROUTES, BACKEND_API } from '../constants.js';
import Star from '../components/Star.js';

// use 'require' to ensure the import order is respected
require('rc-slider/assets/index.css');
require('../css/studentSurveyQuestion.css');

function mapStateToProps(store) {
  return {
    user: store.user.user,
  }
}

let GET_QUESTIONS_FOR_SURVEY = '';
let POST_QUESTION_ANSWERS = ''; //needs one more parameters
var answers = [];

//TODO translation for questions, how to check wich language is now using and then taking that json option?

class StudentSurveyQuestion extends Component {

  constructor(props) {
    super(props);

    const { translate } = this.props;
    try {
      console.log(this.props.location.state.survey_id)
    } catch (err) {
      // FIXME
      // No survey was passed along. Probably there is no survey opened.
      // Temporary fix : Redirect to NoMatch.
      this.props.history.replace('/404-error-page')
    }

    this.state = {
      buttonValue: translate('next'),
      redirect: false,
      loading: true,
      surveyFinished: false,
      index: 0,
      survey_id: this.props.location.state.survey_id,
      survey_title: this.props.location.state.survey_title,
      survey: [{
        id: 0,
        question: translate('loading_survey'),
        question_fi: null,
        min_answer: 0,
        max_answer: 0,
      },],
      currentQuestion: {
        id: 0,
        question: translate('loading_survey'),
        question_fi: null,
        min_answer: 0,
        max_answer: 0,
      },
      startPoint: 1
    }

    GET_QUESTIONS_FOR_SURVEY = 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/questions';
    POST_QUESTION_ANSWERS = 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/answers';

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
              question_fi: e.question_fi,
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

  postQuestionsAnswersREST = function (answers) {
    fetch(BACKEND_API.ROOT + POST_QUESTION_ANSWERS, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + this.props.user.hash,
      },
      body: answers
    }).then(function (response) {
      if (response.ok) {
        console.log("Answers put on server")
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
      ...this.state,
      startPoint: value,
    });
  }
  // todo add go back functionality
  onClickBack = () => {
  }

  onClickNext = () => {

    if (!this.state.surveyFinished) {
      var index = this.state.index + 1
      //send answer to server

      var data = {
        survey_id: this.state.survey_id,
        student_id: this.props.user.id,
        question_id: this.state.currentQuestion.id,
        answer: this.state.startPoint
      }

      answers.push(data)
      //check if message send correctly
      this.setState({
        ...this.state,
        index: index,
        currentQuestion: this.state.survey[index],
        startPoint: 1
      });
      //for the last click on the button
      if (index === this.state.survey.length) {

        // survey is finished
        this.setState({
          ...this.state,
          surveyFinished: true,
        });
      }

    } else {
      this.postQuestionsAnswersREST(JSON.stringify(answers))
      answers = []
      this.setState({
        ...this.state,
        redirect: true,
      })
    }
  }


  render() {
    const { translate } = this.props;
    // if survey finish (no more survey)
    if (this.state.redirect) {
      this.props.history.push({
        pathname: ROUTES.STUDENT_DASHBOARD,
        state: { survey_id: this.state.survey_id }
      });
    } else if (this.state.loading) {
      return (
        <div className="login-form">
          <h1>{translate('survey')}  "{this.state.survey_title}"</h1>
          <div className="spinner-container">
            <Spinner />
          </div>
        </div>
      );
    } else {
      let questionNow = this.state.currentQuestion.question_fi;
      if (this.props.translate('survey') === 'Survey') {
        questionNow = this.state.currentQuestion.question;
      }
      return (
        <div className="container centered">
          <h1>{this.props.translate('survey')} "{this.state.survey_title}"</h1>
          { !this.state.surveyFinished &&
            <div>
              <p>{questionNow}</p>
              <p>{this.state.index}</p>
              <p>
                <Slider
                  min={this.state.currentQuestion.min_answer}
                  max={this.state.currentQuestion.max_answer} dots={true}
                  value={this.state.startPoint}
                  onChange={this.onSliderChange} />
              </p>
              <p> <Star actual_size = {this.state.startPoint} max_size = {this.state.currentQuestion.max_answer} />
              <h5>{this.state.startPoint}/{this.state.currentQuestion.max_answer} </h5>
            </p>
          </div>
        }
        { this.state.surveyFinished &&
          <div className="alert alert-info" role="alert">
            {translate('finish_survey')}
          </div>
        }
        <button type="button"
          className="btn btn-primary"
          onClick={this.onClickBack}>{ 'back' }
        </button>
        <button type="button"
          className="btn btn-primary"
          onClick={this.onClickNext}>{this.state.surveyFinished ? translate('quit') : translate('next')}
        </button>
      </div>
    );
  }
}
}

export default connect(mapStateToProps)(withTranslate(StudentSurveyQuestion));
