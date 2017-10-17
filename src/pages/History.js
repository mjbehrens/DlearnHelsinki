import React, { Component } from 'react';
import _ from 'underscore';
import Spinner from 'react-spinner'


import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';
import GraphRenderer from '../components/shared/GraphRenderer.js';

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
	return {
		user: store.user.user,
		baseURL: store.settings.baseURL,
	}
}


//http://underscorejs.org/#sortBy



//Select * From Surveys
var sampleData = [];
var tempData = [];
var compo = null;
class History extends Component {

    constructor(props) {

        super(props);
        sampleData = [];
        var tempData = [];
        compo = this;

        this.state = {
            isLoading: true,
            query: "",
            filteredData: [],
            selectedSurvey: null,
            dateSelected: false,
            warning: "",
            sorter: 1 // 0 = no order, 1 = date ascending, 2 = date descending
        }
    }

    componentWillMount() {
        this.getAllSurveyREST();
    }

    // You can narrow down the dates and search by name at the same time, but
    // the process is buggy and you will have to reset if there is a typo.
    
    doSearch = function(queryText){
        this.setState({ warning: "" });

        if (this.state.dateSelected) {
            tempData = this.state.filteredData;
        } else {
            tempData = sampleData;
        }
        var queryResult = [];
        tempData.forEach(function (i) {
            if ((i.title.toLowerCase().indexOf(queryText) != -1)
                || (i._id.toString().indexOf(queryText) != -1)
                || (i.start_date.indexOf(queryText) != -1)) {

                queryResult.push(i);
            }
        });
        console.log(queryResult);
        this.setState({
            warning: "",
            query: queryText,
            filteredData: queryResult
        });
    }

    // Get all the survey from one class
    getAllSurveyREST = function () {
        compo = this;
        compo.setState({ isLoading: true });

        let GET_SURVEYS = 'teachers/' + this.props.user.id + '/classes/' + 1 + '/surveys';
        

        fetch(this.props.baseURL + GET_SURVEYS, {
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
                        isLoading: false,
                        filteredData: data,
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


    // Final function will alter the value that is passed to the GraphRenderer. 
    loadResult = (surveyID) => {
        compo.setState({ selectedSurvey: surveyID });
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

        tempData.forEach(function(i) {
            if (start<=end && i.start_date>=start && i.start_date<=end) {
                narrowDown.push(i); 
            } else if (start>end && i.start_date<=start && i.start_date>=end) {
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

    render() {

        if (compo.state.isLoading) {
            return (
                <div className="centered">
                    <h1> History </h1>
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
                    <h1> History </h1>
                    <div className="row">
                        <div className="left-align col-sm-4">

                            <HistoryFinder query={this.state.query}
                                selectRange={this.selectRange.bind(this)}
                                sortData={this.sortData.bind(this)}
                                doSearch={this.doSearch.bind(this)} />

                            <div className="warning">
                                {this.state.warning}
                            </div>

                            <HistoryDisplay loadResult={this.loadResult.bind(this)}
                                searchData={this.state.filteredData} />

                        </div>
                        <div className="col-sm-8" hidden={this.state.selectedSurvey == null}>
                            {
                                // TODO : Give all the information of the survey to GraphRenderer (if possible) 
                            }
                            <GraphRenderer surveyID={this.state.selectedSurvey} />
                        </div>
                    </div>
                </div>
            )
        }

    }
} 

export default connect(mapStateToProps)(History);
