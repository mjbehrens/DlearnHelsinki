import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SpiderGraph from '../components/shared/SpiderGraph.js';
import OpenSurvey from '../components/teacherCompo/OpenSurvey.js'

class TeacherDashboard extends Component {

  render() {
  
    return (
      <div className="text-center">

        <h1>Welcome Teacher </h1>
         
        <OpenSurvey />

      </div>
    );
  }
}

export default TeacherDashboard;
