import React, { Component } from 'react';

import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';

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
           if (i.toLowerCase().indexOf(queryText != -1)) {
               queryResult.push(i);
           }
        });
        this.setState({ 
            query: queryText,
            filteredData: queryResult
        });
    }
    

                

    render() {
        return(
            <div className = "left-align">
                <HistoryFinder query = {this.state.query} doSearch = {this.doSearch.bind(this)} />
                <HistoryDisplay searchData = {this.state.filteredData} />
            </div>
        )
    }
} export default History;