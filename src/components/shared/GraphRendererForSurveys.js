import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';

import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}


const buttonStyle = {
    margin: '5px'
}

var groups = [];
var compo = null;


class GraphRendererForSurveys extends Component {

    constructor(props) {
        super(props);
        groups = this.props.groups;
        compo = this;

        const {translate} = this.props;
        this.state = {
            isLoading: false,
            graphs: []
        }
    }


    componentDidMount() {

    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
           groups = nextProps.groups;
        }
    }


    loadClassGraphs = function () {

        let currentClass = this.props.classes.filter(function (c) {
            return c._id === compo.props.user.classid;
        })[0];

        let spiderGraphs = [];
        spiderGraphs.push(<SpiderGraph name={currentClass.name} parameters={{
            teachers: compo.props.user.id,
            students: null,
            classes: compo.props.user.classid,
            groups: null,
            surveys: compo.props.survey._id,
        }} />);

        this.setState({ graphs: spiderGraphs });
    }

    loadGroupsGraphs = function () {

        let spiderGraphs = [];
        groups.forEach(function (g) {
            spiderGraphs.push(
                <div key={g._id}><SpiderGraph name={g.name} parameters={{
                    teachers: compo.props.user.id,
                    students: null,
                    classes: compo.props.user.classid,
                    groups: g._id,
                    surveys: compo.props.survey._id,
                }} color={g.name} /></div>);
        });

        this.setState({ graphs: spiderGraphs });
    }

    loadStudentsGraphs = function () {
        let spiderGraphs = [];
        //to change and go to students
        groups.forEach(function (g) {
            g.students.forEach(function (s) {
                let parameters = {
                    teachers: compo.props.user.id,
                    students: s._id,
                    classes: compo.props.user.classid,
                    groups: null,
                    surveys: compo.props.survey._id,
                };
                spiderGraphs.push(<div key={s._id}><SpiderGraph name={s.username} parameters={parameters} color={s.username} /></div>);
            });
        });

        this.setState({ graphs: spiderGraphs });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <div className="spinner-container">
                    <Spinner />
                </div >
            );
        } else {
            return (
                <div>
                    <h3>{compo.props.survey.title}</h3>
                    <div>
                        <button style={buttonStyle} className="btn btn-primary" onClick={this.loadClassGraphs.bind(this)}>{this.props.translate('class')}</button>
                        <button style={buttonStyle} className="btn btn-primary" onClick={this.loadGroupsGraphs.bind(this)}>{this.props.translate('groups')}</button>
                        <button style={buttonStyle} className="btn btn-primary" onClick={this.loadStudentsGraphs.bind(this)}>{this.props.translate('students')}</button>
                    </div>
                    <div>
                        <br />
                        {this.state.graphs}
                    </div>
                </div>
            );
        }


    }

}
export default connect(mapStateToProps)(withTranslate(GraphRendererForSurveys));
