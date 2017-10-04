import React, { Component } from 'react';

//http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/

//Select * From SpiderGraphs
var sampleData = ["This is a test\n", "There is nothing interesting here\n", "For now\n"];
//var searchResults = [];

class HistoryFinder extends Component {    

    constructor(props) {
        super(props);
        this.state = { searchResults: sampleData };
    }

    doSearch = (queryText) => (e) => {
        //Search through the spider graphs with seach parameters
        var temp = 0;
        var results = [];
        sampleData.forEach(function(e){
            results[temp] = e;
            temp = temp+1;
        });
        this.setState({searchResults: results})
        return "Search completed";
    }

    render() {
        return(
            <div>
                An amazing search bar is supposed to be here, but it hasn't been implemented yet.
                <div className = "searchBar">
                    <input type="text" ref="searchInput" placeholder="Search" onChange = {this.doSearch}/>
                </div>
                <div className = "searchResults">
                    {this.state.searchResults}
                </div>
            </div>
        )
    }
} export default HistoryFinder;