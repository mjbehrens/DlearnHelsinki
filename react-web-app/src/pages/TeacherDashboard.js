import React, { Component } from 'react';
import new_survey from './icons/survey.svg';
import history from './icons/history.svg';
import manage_groups from './icons/manage groups.svg';

class TeacherDashboard extends Component {
    
    render() {
        return (
            <div className="App">
                <h1>Latest Survey</h1> 
                Box for survey data
                
                <div>
                    <img src={new_survey} className="Icon" alt="icon" />
                    <img src={history} className="Icon" alt="icon" />
                    <img src={manage_groups} className="Icon" alt="icon" />
                </div>
            </div>
        );   
    } 
}

export default TeacherDashboard;