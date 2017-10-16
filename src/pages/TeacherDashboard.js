import React, { Component } from 'react';

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

    if (this.props.location.state == null) {
      this.props.history.push("/class-selection");
      return null;
    }

    else return (
      <div className="text-center">

        <h1> {this.props.location.state.className} </h1>

        <div className="row">
          <HeadbandsLastResults />
        </div>

        <div className="container">
          <div className="card-deck">
            <OpenSurveyButton />
            <GroupManagmentButton />
            <HistoryButton />
          </div>
        </div>

      </div>

    );
  }
}

export default TeacherDashboard;

