import React, { Component } from 'react';
import new_survey from './icons/survey.svg';

import { Link } from 'react-router-dom';

import OpenSurveyButton from '../components/teacherCompo/OpenSurveyButton.js';
import HistoryButton from '../components/teacherCompo/HistoryButton.js';
import GroupManagmentButton from '../components/teacherCompo/GroupManagmentButton.js';

import HeadbandsLastResults from '../components/teacherCompo/HeadbandsLastResults.js';

class TeacherDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      className: "",
      groups: [],
    };
  }

  render() {

    return (
      <div className="text-center">

          <h1> Insert Class Name Here {this.state.className} </h1>

        <div className="row">
          <HeadbandsLastResults />
        </div >

        <div className="row">
          <OpenSurveyButton className="col-sm-3" />
          <GroupManagmentButton className="col-sm-3" />
          <HistoryButton className="col-sm-3" />
        </div>
      </div>
    );
  }
}

export default TeacherDashboard;

