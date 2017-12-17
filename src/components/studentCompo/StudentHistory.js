import React, { Component } from 'react';
import _ from 'underscore';
import SpiderGraph2 from '../shared/SpiderGraph2.js';


//redux setup
import { ROUTES, BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class StudentHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            survey_id: 27
        };
    }


    onSelectSurvey = function (e) {
        let id = e.target.value;
        this.setState({
            survey_id: id
        })
    }

    renderSurveysSelect = function (data) {

        console.log(data)

        let options = [];
        if (data != null) {
            options.push(<option value={-1}> {"All surveys"} </option>);
            data.forEach(function (s) {
                options.push(<option value={s._id}> {s.title} </option>)

            });
        }
        return (
            <select defaultValue={null}
                onChange={this.onSelectSurvey.bind(this)}>
                {options}
            </select>
        )
    }


    render() {

        let requests = [];
        if (this.state.survey_id != -1) {
            requests = [{
                name: 'your class',
                request: 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/class_averages'
            },
            {
                name: 'your group',
                request: 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/group_averages'
            },
            {
                name: 'your result',
                request: 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys/' + this.state.survey_id + '/answers'
            }];
        } else if (this.state.survey_id == -1) {
            requests = [{
                name: 'your class',
                request: 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/class_averages'
            },
            {
                name: 'your group',
                request: 'students/' + this.props.user.id + '/classes/' + this.props.user.classid + '/group_averages'
            },
            {
                name: 'your result',
                request: 'students/' + this.props.user.id + '/survey_averages'
            }];
        }



        return (
            <div>
                <div className="container" >
                    <div className="row">
                        {this.renderSurveysSelect(this.props.data)}
                    </div>
                    <div className="row">
                        <div className="col-sm-9 expand-width"><SpiderGraph2 parameters={requests} name="Previous results" /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(StudentHistory);
