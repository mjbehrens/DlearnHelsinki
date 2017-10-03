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
          <h1>Insert Class Name Here {this.state.className} </h1>

        <div className="row">
          <HeadbandsLastResults />
        </div >
 <div class="card-group">
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-block">
      <h4 class="card-title">Card title</h4>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
	    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-block">
      <h4 class="card-title">Card title</h4>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="..." alt="Card image cap"/>
    <div class="card-block">
      <h4 class="card-title">Card title</h4>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>   


        <div className="row">
        </div>
      </div>
    );
  }
}

export default TeacherDashboard;

