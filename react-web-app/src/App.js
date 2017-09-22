import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './css/App.css';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import StudentDashboard from './pages/StudentDashboard.js';


import StudentSurveyQuestion from './pages/StudentSurveyQuestion.js'

class App extends Component {
  render() {
  
    return (
      <div classsName="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/student-dashboard' component={StudentDashboard}/>
          <Route path='/student-survey' component={StudentSurveyQuestion}/>
		    </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
