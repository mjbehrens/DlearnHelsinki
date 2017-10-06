import React, { Component } from 'react';

import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';
import GraphRenderer from '../components/shared/GraphRenderer.js';

//Select * From SpiderGraphs
var sampleData = ["This is a test.", "There is nothing interesting here.", "For now.", "No, seriously!"];

//var sampleData = '[{"_id": 1, "testInput": "This is a test."}, \n\
//{"_id": 2, "testInput": "There is nothing interesting here."},\n\
// {"_id": 3, "testInput": "For now..."}, {"_id": 4, "testInput": "No, seriously!"}]'

class History extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            filteredData: sampleData
        }
    }
    
    doSearch = function(queryText){
        var queryResult = [];
        sampleData.forEach(function(i) {
           if (i.toLowerCase().indexOf(queryText) != -1) {
               queryResult.push(i);
           }
        });
        this.setState({ 
            query: queryText,
            filteredData: queryResult
        });
    }
    

    loadResult = function() {
        console.log("Hello world!");
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
                        <HistoryFinder query = {this.state.query} doSearch = {this.doSearch.bind(this)} />
                        <HistoryDisplay loadResult = {this.loadResult.bind(this)} searchData = {this.state.filteredData} />
                    </div>
                    <div className = "col-sm-8">
                        <GraphRenderer surveyID={27} />
                    </div>
                </div>
            </div>
        )
    }
} export default History;