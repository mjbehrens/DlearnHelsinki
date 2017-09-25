import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import SpiderGraph from '../components/shared/SpiderGraph.js';
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

        <div className="row">
          <Link to="/"> <button  type="button" className="col-sm-3"> Go Back </button> </Link>
          <h1 className="col-sm-3"> Dashboard of class {this.state.className} </h1>
          <button  type="button" className="col-sm-3"> Log Out </button>
        </div>
        
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

