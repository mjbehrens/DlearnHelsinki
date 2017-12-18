import React, { Component } from 'react';
import _ from 'underscore';
import { withTranslate } from 'react-redux-multilingual';

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
        const { translate } = this.props;
        return (
            <div>
                <h4><u>{translate('profile')}</u></h4>
                <br/><br/>
                <div className="container" id="studentProfile">
                    <ul className="list-group">
                        <li className="list-group-item active">
                            <div className="row">
                                <div className="col">{translate('user_info')}</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{translate('username')}</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.name}</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{translate('gender')}</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.sex}Male</div>
                            </div>
                        </li>
                        <li className="list-group-item" style={{ margin: 0, padding: 0 }}>
                            <div className="row">
                                <div className="col right-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{translate('age')}</div>
                                <div className="col left-align border border-top-0 border-bottom-0" style={{ margin: 0, padding: 10 }}>{this.props.user.age}8</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withTranslate(StudentProfile));
