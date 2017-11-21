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
        };
    }


    render() {

        return (
            <div className="container">
                <h1>Competence Wall</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceWall);
