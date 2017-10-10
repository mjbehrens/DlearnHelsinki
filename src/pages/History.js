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

class History extends Component {
    
    constructor(props) {

        super(props);
        sampleData = [];
        this.parseData();
        this.state = {
            query: "",
            filteredData: sampleData,
            selectedSurvey: 27,
            sorter: 0 // 0 = no order, 1 = date ascending, 2 = date descending
        }
    }

    
    doSearch = function(queryText){
        var queryResult = [];
        sampleData.forEach(function(i) {
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
        let sortThis = this.state.filteredData;
        if (this.state.sorter == 1) {
            this.setState({sorter: 2, filteredData: _.sortBy(sortThis, 'start_date').reverse()});
        } else {
            this.setState({sorter: 1, filteredData: _.sortBy(sortThis, 'start_date')});
        }
    }

    selectRange = function(start, end) {
        console.log("I'm supposed to be narrowing down results, but right now, I'm idle.");
        console.log(start + " to "+ end + ". Format: "+typeof(start));
        console.log("Does start come before end? " + start>end); //Why is this always true?
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