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
        classes: store.classroom.classes,
    }
}

class CompetenceWall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: "competence",
            buttonState1: "btn btn-primary",
            buttonState2: "btn btn-secondary",
            classes: [],
            groups: [],
            students: [],
        };
    }


    getClasses = () => {
        console.log(this.props.classes);
    }

    selectView = (newView) => {

        if (newView == "competence") {
            this.setState({
                ...this.state,
                buttonState1: "btn btn-primary",
                buttonState2: "btn btn-secondary",
                view: newView,
            })
        } else {
            this.setState({
                ...this.state,
                buttonState1: "btn btn-secondary",
                buttonState2: "btn btn-primary",
                view: newView,
            })
        }
    }

    render() {

        this.getClasses();

        return (
            <div className="container">
                <h1>Competence Wall</h1>
                <br />
                <div className="btn-group btn-group-lg" role="group">
                    <button className={this.state.buttonState1} onClick={() => this.selectView('competence')}>Competence</button>
                    <button disabled className={this.state.buttonState2} onClick={() => this.selectView('progression')}>Progression</button>
                </div>
                <br /><br /><br />
                {this.state.view === 'competence' ? <CompetenceRender data={this.props.classes}/> : <ProgressionRender />}
                {

                }
                <br />
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceWall);
