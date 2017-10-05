import React, { Component } from 'react';

import HistoryFinder from '../components/shared/HistoryFinder.js';
import HistoryDisplay from '../components/shared/HistoryDisplay.js';

//Select * From SpiderGraphs
var sampleData = ["This is a test\n", "There is nothing interesting here\n", "For now\n"];

class History extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            filteredData: sampleData
        }
    }
    
    doSearch = (queryText) => (e) => { console.log("You searched for "+{queryText});
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
                <HistoryFinder query = {this.state.query} doSearch = {this.doSearch} />
                <HistoryDisplay searchData = {this.state.filteredData} />
            </div>
        )
    }
} export default History;