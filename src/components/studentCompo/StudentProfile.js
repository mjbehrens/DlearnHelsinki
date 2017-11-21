import React, { Component } from 'react';
import _ from 'underscore';

//redux setup
import { ROUTES, BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class StudentProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="container" id="studentProfile">
                    <ul className="list-group">
                        <li className="list-group-item active">
                            <div className="row">
                                <div className="col">User information</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>Username</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.name}</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>Gender</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.sex}F</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>Age</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.age}8</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <br/>
                Strengths and weaknesses:
            </div>
        )
    }
}

export default connect(mapStateToProps)(StudentProfile);