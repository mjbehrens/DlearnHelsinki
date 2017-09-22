import React, { Component } from 'react';
import new_survey from './icons/survey.svg';
import history from './icons/history.svg';
import manage_groups from './icons/manage groups.svg';

class TeacherDashboard extends Component {
    
    render() {
        return (
            <div className = "App">
                <h1>Latest Survey</h1> 
                <div className = "Latest-results">
                    <div className = "btn-toolbar">
                        <button type="button" className="btn btn-primary">Group 1</button>
                        <button type="button" className="btn btn-primary">Group 2</button>
                        <button type="button" className="btn btn-primary">Group 3</button>
                        <button type="button" className="btn btn-primary">Group 4</button>
                        <button type="button" className="btn btn-primary">Group 5</button>
                    </div>
                    Box for survey data
                </div>
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