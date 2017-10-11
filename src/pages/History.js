import React, { Component } from 'react';
import _ from 'underscore';


import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';
import GraphRenderer from '../components/shared/GraphRenderer.js';

//http://underscorejs.org/#sortBy


//Select * From Surveys
var sampleData = [];
var sampleDataJSON = '[{"_id": 1, "testInput": "This is a test.", "start_date": "2017-12-05"}, \n\
{"_id": 2, "testInput": "There is nothing interesting here.", "start_date": "2016-05-10"},\n\
{"_id": 3, "testInput": "For now...", "start_date": "2017-05-01"}, \n\
{"_id": 4, "testInput": "No, seriously!", "start_date": "2018-03-10"}]';
var tempData = [];

class History extends Component {
    
    constructor(props) {

        super(props);
        sampleData = [];
        var tempData = [];
        this.parseData();
        this.state = {
            query: "",
            filteredData: sampleData,
            selectedSurvey: 27,
            dateSelected: false,
            warning: "",
            sorter: 0 // 0 = no order, 1 = date ascending, 2 = date descending
        }
    }

    // You can narrow down the dates and search by name at the same time, but
    // the process is buggy and you will have to reset if there is a typo.
    
    doSearch = function(queryText){
        this.setState({ warning: "" });
        if (this.state.dateSelected) {
            tempData = this.state.filteredData
        } else { tempData = sampleData }
        var queryResult = [];
        tempData.forEach(function(i) {
           if ((i.testInput.toLowerCase().indexOf(queryText) != -1) 
                || (i._id.toString().indexOf(queryText) != -1)
                || (i.start_date.indexOf(queryText) != -1)) {
               
                queryResult.push(i); 
           }
        });
        this.setState({ 
            query: queryText,
            filteredData: queryResult
        });
    }
    
    parseData = function () {
        var compo = this;
        sampleData = JSON.parse(sampleDataJSON);
    }
    
    // Final function will alter the value that is passed to the GraphRenderer. 
    // Functional part of code commented out because with the current database 
    // implementation and dummy data used here, clicking on buttons would break things.
    loadResult = function(surveyID) { 
        // this.setState({selectedSurvey: surveyID}); 
        console.log("Loading...");
    }

    // As SQL's Date-datatype ends up parsed into a conveniently structured string, 
    // we just sort things alphabetically
    sortData = function() {
        this.setState({ warning: "" })
        let sortThis = this.state.filteredData;
        if (this.state.sorter == 1) {
            this.setState({sorter: 2, filteredData: _.sortBy(sortThis, 'start_date').reverse()});
        } else {
            this.setState({sorter: 1, filteredData: _.sortBy(sortThis, 'start_date')});
        }
    }

    // Known issue: If you enter a date while query is non-empty, clearing or changing the dates
    // while the query is non-empty will cause the app to not enter selectRange at all. If you
    // enter a date range that contains no data, clear the search bar before pressing "Go".

    selectRange = function(start, end) {
        let narrowDown = [];
        let compo = this;
        this.setState({ warning: "" });
        if (this.state.query != "") {
            tempData = this.state.filteredData
        } else { tempData = sampleData }

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
            console.log("Updating...");
        }
    }

    render() {
        let parameters = {
            teachers : 1,
            students : null,
            classes:1, 
            groups: 1, 
            surveys:27,
        }
        
        return(
            <div className = "centered">
                <h1> History </h1>
                <div className = "row">
                    <div className = "left-align col-sm-4">
                        <HistoryFinder query = {this.state.query}
                            selectRange = {this.selectRange.bind(this)}
                            sortData = {this.sortData.bind(this)}
                            doSearch = {this.doSearch.bind(this)} />
                        <div className = "warning">
                            {this.state.warning}
                        </div>
                        <HistoryDisplay loadResult = {this.loadResult.bind(this)}
                            searchData = {this.state.filteredData} />
                    </div>
                    <div className = "col-sm-8">
                        <GraphRenderer surveyID={this.state.selectedSurvey} />
                    </div>
                </div>
            </div>
        )
    }
} export default History;