import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants.js';
import CompetenceWallLog from './CompetenceWallLog.js';
import SpiderGraph from '../shared/SpiderGraph.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class CompetenceRender extends Component {

    constructor(props) {
        super(props);
        this.state = {
        
        };
    }



    render() {
        let p = {
            teachers: this.props.user.id,
            students: null,
            classes: 1,
            groups: 1,
            surveys: 27,
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog /></div>
                    <div className="col-sm-9"><SpiderGraph parameters = {p}/></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceRender);
