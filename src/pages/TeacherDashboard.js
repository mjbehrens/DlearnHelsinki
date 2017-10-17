import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import OpenSurveyButton from '../components/teacherCompo/OpenSurveyButton.js';
import HistoryButton from '../components/teacherCompo/HistoryButton.js';
import GroupManagmentButton from '../components/teacherCompo/GroupManagmentButton.js';

import HeadbandsLastResults from '../components/teacherCompo/HeadbandsLastResults.js';

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return {
    user: store.user.user,
    baseURL: store.settings.baseURL,
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
      open: false,
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
  }

  componentDidMount() {
    this.getAllSurveyREST();
  }

  // Get all the survey from the current class
  getAllSurveyREST = function () {
    this.setState({ isLoading: true });

    let GET_SURVEYS = 'teachers/' + this.props.user.id + '/classes/' + 1 + '/surveys'; // TODO : UPDATE WITH REAL CLASS    

    fetch(this.props.baseURL + GET_SURVEYS, {
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
  checkLastSurveyDone = function () {

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

    compo.setState({ lastSurveyDone: lastSurvey });

  }

  // check if a survey is currently open 
  checkIfSurveyOpen = function () {

    let noSurveyOpen = true;
    let openSurvey = null;
    surveys.forEach(function (s) {
      console.log(s);
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

  render() {
    return (
      <div className="text-center">

        <h1> {this.state.className} </h1>

        <div className="row">
          <HeadbandsLastResults survey={this.state.lastSurveyDone} />
        </div>

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

export default connect(mapStateToProps)(TeacherDashboard);


