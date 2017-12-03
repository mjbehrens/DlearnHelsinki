import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants.js';
import CompetenceWallLog from './CompetenceWallLog.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class ProgressionRender extends Component {

    constructor(props) {
        super(props);
        this.state = {
        
        };
    }



    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog /></div>
                    <div className="col-sm-9">Graph / Progression here...</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ProgressionRender);
