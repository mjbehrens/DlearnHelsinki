import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';

import DataCollector from '../components/shared/DataCollector.js'
import CompetenceWallLog from '../components/teacherCompo/CompetenceWallLog.js';
import CompetenceRender from '../components/teacherCompo/CompetenceRender.js';
import ProgressionRender from '../components/teacherCompo/ProgressionRender.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class CompetenceWall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: "competence",
            buttonState1: "btn btn-primary",
            buttonState2: "btn btn-secondary"
        };
    }

    selectView = (newView) => {

        if(newView=="competence"){
            this.setState({
                ...this.state,
                buttonState1: "btn btn-primary",
                buttonState2: "btn btn-secondary",
                view: newView,
            })
        }else {
            this.setState({
                ...this.state,
                buttonState1: "btn btn-secondary",
                buttonState2: "btn btn-primary",
                view: newView,
            })
        }
    }


    render() {

        let parameters = [{
            teachers: this.props.user.id,
            students: 8,
            classes: 1,
            groups: null,
            surveys: 27,
        },
        {
            teachers: this.props.user.id,
            students: 12,
            classes: 1,
            groups: null,
            surveys: 27,
        }
        ]

        return (
            <div className="container">
                <h1>Competence Wall</h1>
                <br />
                <div className="btn-group btn-group-lg" role="group">
                    <button className={this.state.buttonState1} onClick={() => this.selectView('competence')}>Competence</button>
                    <button className={this.state.buttonState2} onClick={() => this.selectView('progression')}>Progression</button>
                </div>
                <br /><br /><br />
                {this.state.view === 'competence' ? <CompetenceRender /> : <ProgressionRender />}
                {
                    
                }
                <br />
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceWall);
