import React, { Component } from 'react';
import _ from 'underscore';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';


import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';
import GraphRendererForSurveys from '../components/shared/GraphRendererForSurveys.js';
import GraphRendererForStudents from '../components/shared/GraphRendererForStudents.js';
import GraphRendererForGroups from '../components/shared/GraphRendererForGroups.js';


import { BACKEND_API } from '../constants.js';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}


//Select * From Surveys
var sampleData = [];
var tempData = [];
var compo = null;

class History extends Component {

    constructor(props) {
        super(props);

        sampleData = [];
        tempData = [];
        compo = this;

        const {translate} = this.props;

        this.state = {
            isLoading: true,
            query: "",
            groups: [],
            students: [],
            surveys: [],
            filteredData: [],
            selectedItemId: null,
            researchType: '',
            dateSelected: false,
            warning: "",
            sorter: 1 // 0 = no order, 1 = date ascending, 2 = date descending
        }

    }

    componentWillMount() {
        this.getAllSurveyREST();
        this.getClassComposition();
    }


    getStudents = function (groups) {
        let students = [];
        groups.forEach(function (grp) {
            grp.students.forEach(function (std) {
                students.push(std);
            });
        });
        return students;
    }

    doSearch = function (queryText) {
        this.setState({ warning: "" });

        //if (this.state.dateSelected) {
        //    tempData = this.state.filteredData;
        //} else {
        tempData = sampleData;
        //}
        var queryResult = [];

        console.log(tempData);
        // different research for the different types
        switch (this.state.researchType) {
            case 'student':
                tempData.forEach(function (i) {
                    if ((i.username == null)
                        || (i.username.toLowerCase().indexOf(queryText) != -1)
                        || (i._id.toString().indexOf(queryText) != -1)) {
                        queryResult.push(i);
                    }
                });
                break;
            case 'group':
                tempData.forEach(function (i) {
                    if ((i.name == null)
                        || (i.name.toLowerCase().indexOf(queryText) != -1)
                        || (i._id.toString().indexOf(queryText) != -1)) {
                        queryResult.push(i);
                    }
                });
                break;
            case 'survey':
                tempData.forEach(function (i) {
                    if ((i.title == null || i.start_date == null)
                        || (i.title.toLowerCase().indexOf(queryText) != -1)
                        || (i._id.toString().indexOf(queryText) != -1)
                        || (i.start_date.indexOf(queryText) != -1)) {

                        queryResult.push(i);
                    }
                });
                break;

            default:
                break;
        }

        console.log(queryResult);
        this.setState({
            warning: "",
            query: queryText,
            filteredData: queryResult
        });
    }

    // Get all the survey from one class
    getAllSurveyREST = function () {

        compo.setState({ isLoading: true });

        let GET_SURVEYS = 'teachers/' + this.props.user.id + '/classes/' + this.props.user.classid + '/surveys';

        fetch(BACKEND_API.ROOT + GET_SURVEYS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    sampleData = data;
                    compo.setState({
                        surveys: data,
                        isLoading: false,
                    });
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    // Get all the groups/students from the class
    getClassComposition = function () {

        compo.setState({ isLoading: true });

        let GET_CLASS = 'teachers/' + this.props.user.id + '/classes/' + this.props.user.classid + '/groups?all=true';

        fetch(BACKEND_API.ROOT + GET_CLASS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    compo.setState({
                        isLoading: false,
                        students: compo.getStudents(data),
                        groups: data,
                    })
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }


    // Final function will alter the value that is passed to the GraphRenderer.
    loadResult = (surveyID) => {
        compo.setState({ selectedItemId: surveyID });
    }

    // As SQL's Date-datatype ends up parsed into a conveniently structured string,
    // we just sort things alphabetically
    sortData = function () {
        this.setState({ warning: "" })
        let sortThis = this.state.filteredData;
        if (this.state.sorter == 1) {
            this.setState({ sorter: 2, filteredData: _.sortBy(sortThis, 'start_date').reverse() });
        } else {
            this.setState({ sorter: 1, filteredData: _.sortBy(sortThis, 'start_date') });
        }
    }

    // Was used for searching with calendar
    selectRange = function (start, end) {
        let narrowDown = [];
        let compo = this;
        this.setState({ warning: "" });
        if (this.state.query != "" && start != null && end != null) {
            tempData = this.state.filteredData
        }
        else {
            tempData = sampleData
        }
        tempData.forEach(function (i) {
            if (start <= end && ((i.start_date == null || i.end_date == null) || (i.start_date >= start && i.start_date <= end))) {
                narrowDown.push(i);
            } else if (start > end && ((i.start_date == null || i.end_date == null) || (i.start_date <= start && i.start_date >= end))) {
                narrowDown.push(i);
            } else if (start == null || end == null) {
                if (start == null && end == null) {
                    compo.setState({
                        dateSelected: false
                    }, () => compo.doSearch(compo.state.query));
                } else {
                    compo.setState({
                        warning: "Please input both a start and an end date.",
                        dateSelected: false
                    });
                }
            }
        });
        if (start != null && end != null) {
            this.setState({
                filteredData: narrowDown,
                dateSelected: true
            });
        }
    }

    selectGraphRenderer = function () {
        if (this.state.selectedItemId !== null) {

            switch (this.state.researchType) {
                case 'survey':
                    let s = this.state.surveys.filter(function (s) {
                        return s._id === compo.state.selectedItemId;
                    });
                    return (
                        <GraphRendererForSurveys survey={s[0]} groups={this.state.groups} />
                    )
                    break;
                case 'group':
                    let grp = this.state.groups.filter(function (g) {
                        return g._id === compo.state.selectedItemId;
                    });
                    return (
                        <GraphRendererForGroups group={grp[0]} surveys={this.state.surveys} />
                    )
                    break;
                case 'student':
                    let std = this.state.students.filter(function (s) {
                        return s._id === compo.state.selectedItemId;
                    });
                    return (
                        <GraphRendererForStudents student={std[0]} surveys={this.state.surveys} />
                    )
                    break;

                default:
                    break;
            }
        }
    }

    OnClickSurveys = function () {
        sampleData = this.state.surveys;
        this.setState({
            filteredData: this.state.surveys,
            researchType: 'survey',
            selectedItemId: null,
        })
    }

    OnClickGroups = function () {
        sampleData = this.state.groups;
        this.setState({
            filteredData: this.state.groups,
            researchType: 'group',
            selectedItemId: null,

        });

    }

    OnClickStudents = function () {
        sampleData = this.state.students;
        this.setState({
            filteredData: this.state.students,
            researchType: 'student',
            selectedItemId: null,
        })
    }

    render() {

        if (compo.state.isLoading) {
            return (
                <div className="centered">
                    <h1> {this.props.translate('history')} </h1>
                    <div className="row">
                        <div className="spinner-container">
                            <Spinner />
                        </div >
                    </div>
                </div>
            )
        }
        else {

            return (
                <div className="centered">
                    <h1> {this.props.translate('history')} </h1>
                    <div className="row">
                        <div className="left-align col-sm-4">
                            <div className="btn-group">
                                <button className="btn btn-primary" onClick={this.OnClickSurveys.bind(this)}>{this.props.translate('surveys')}</button>
                                <button className="btn btn-primary" onClick={this.OnClickStudents.bind(this)}>{this.props.translate('students')}</button>
                                <button className="btn btn-primary" onClick={this.OnClickGroups.bind(this)}>{this.props.translate('groups')}</button>
                            </div>

                            <HistoryFinder query={this.state.query}
                                selectRange={this.selectRange.bind(this)}
                                sortData={this.sortData.bind(this)}
                                doSearch={this.doSearch.bind(this)} />

                            <div className="warning">
                                {this.state.warning}
                            </div>

                            <HistoryDisplay loadResult={this.loadResult.bind(this)}
                                searchData={this.state.filteredData}
                                dataType={this.state.researchType}
                            />

                        </div>
                        <div className="col-sm-8" hidden={this.state.selectedItemId == null}>
                            {compo.selectGraphRenderer()}
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default connect(mapStateToProps)(withTranslate(History));
