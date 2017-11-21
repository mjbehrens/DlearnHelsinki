import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class CompetenceWall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: "graph",
        };
    }

    selectView = (newView) => {
        this.setState({
            ...this.state,
            view: newView,
        })
    }


    render() {

        return (
            <div className="container">
                <h1>Competence Wall</h1>
                <div className="btn-group btn-group-lg" role="group">
                    <button className="btn btn-primary" onClick={() => this.selectView('graph')}>Graph</button>
                    <button className="btn btn-primary" onClick={() => this.selectView('progression')}>Progression</button>
                </div>
                {this.state.view === 'graph' ? <p>render graph</p> : <p>render progression</p>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceWall);
