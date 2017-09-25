import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import SpiderGraph from '../components/shared/SpiderGraph.js';
import OpenSurvey from '../components/teacherCompo/OpenSurvey.js';
import HeadbandsLastResults from '../components/teacherCompo/HeadbandsLastResults.js';


class TeacherDashboard extends Component {

  render() {

    return (
      <div className="text-center">

        <h1>Welcome Teacher </h1>
        <HeadbandsLastResults />
        <div className="row">
          <OpenSurvey />
          <OpenSurvey />
          <OpenSurvey />
        </div>
      </div>
    );
  }
}

export default TeacherDashboard;

