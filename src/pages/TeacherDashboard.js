import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import OpenSurveyButton from '../components/teacherCompo/OpenSurveyButton.js';
import HistoryButton from '../components/teacherCompo/HistoryButton.js';
import GroupManagmentButton from '../components/teacherCompo/GroupManagmentButton.js';
import HeadbandsLastResults from '../components/teacherCompo/HeadbandsLastResults.js';

import { BACKEND_API } from '../constants.js';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return {
    user: store.user.user,
    classes: store.classroom.classes,

  }
}

let surveys = [];
let compo = null;

class TeacherDashboard extends Component {

  constructor(props) {
    super(props);

    compo = this;
    surveys = [];
    let lastSurveyDone = null;
    let openSurvey = null;

    lastSurveyDone = openSurvey = {
      _id: null,
      open: null,
      title: null,
      description: null,
      start_date: null,
      end_date: null,
    };

    this.state = {
      className: "",
      groups: [],
      lastSurveyDone: lastSurveyDone,
      openSurvey: openSurvey,
    };

    const {translate} = this.props
  }

  componentDidMount() {
    this.getAllSurveyREST();
  }

  // Get all the survey from the current class
  getAllSurveyREST = function () {
    this.setState({ isLoading: true });

    let GET_SURVEYS = 'teachers/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys';

    fetch(BACKEND_API.ROOT + GET_SURVEYS, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + this.props.user.hash
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => {
          surveys = data;
          console.log(surveys);
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

  // check the last survey that has been done
  checkLastSurveyDone = function (surveys) {

    let lastSurvey = null;

    if (surveys.length > 0) {
      // only look for closed surveys
      let tempSurveys = surveys.filter(function (s) {
        return s.open == false;
      });

      if (tempSurveys.length > 0) {

        // find the highest date of all surveys
        let last_d = tempSurveys.map(function (s) { return s.end_date; }).sort().reverse()[0]
        // get the survey that match this date
        lastSurvey = surveys.filter(function (s) {
          return s.end_date == last_d;
        })[0];

      }
    }
    compo.setState({ lastSurveyDone: lastSurvey });

  }

  // check if a survey is currently open
  checkIfSurveyOpen = function (surveys) {

    let noSurveyOpen = true;
    let openSurvey = null;
    surveys.forEach(function (s) {
      if (s.open) {
        noSurveyOpen = false;
        openSurvey = s;
      }
    }, this);

    // if no survey open then do nothing.
    if (noSurveyOpen) {
      openSurvey = {
        _id: null,
        open: false,
        title: null,
        description: null,
        start_date: null,
        end_date: null,
      };
    }

    compo.setState({ openSurvey: openSurvey });

  }

  // Display the  message that a survey is open
  renderInfoOpenSurvey = function (survey_title) {
    // We assume that if the title is null
    // then there is no survey open. With is kind of weak...
    if (survey_title != null) {
      return (
        <div className="container">
          <p className="bg-info">
           {this.props.translate('survey_open', {title: survey_title})}
          </p>
        </div>
      );
    }else{
      return (null);
    }
  }

  render() {
    return (
      <div className="text-center">

        <h1> {this.state.className} </h1>

        <div className="row">

         <HeadbandsLastResults survey={this.state.lastSurveyDone} />

        </div>

        {this.renderInfoOpenSurvey(this.state.openSurvey.title)}

        <div className="container">
          <div className="card-deck">
            <OpenSurveyButton survey={this.state.openSurvey} callback={this.getAllSurveyREST.bind(this)} />
            <GroupManagmentButton />
            <HistoryButton />
          </div>
        </div>

      </div>

    );
  }
}

export default connect(mapStateToProps)(withTranslate(TeacherDashboard));
