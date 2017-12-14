import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompetenceWallLog from './CompetenceWallLog.js';
import SpiderGraph2 from '../shared/SpiderGraph2.js';

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

        let parameters = [{
            name : "student 8 - hlqejqe",
            teachers: this.props.user.id,
            students: 8,
            classes: 1,
            groups: null,
            surveys: 27,
          },
          {
            name : "1 - class",
            teachers: this.props.user.id,
            students: null,
            classes: 1,
            groups: null,
            surveys: 27,
          }
        ]

        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog /></div>
                    <div className="col-sm-9"><SpiderGraph2 parameters={parameters} name="toto" color="black"/></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceRender);
