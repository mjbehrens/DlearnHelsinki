import React, { Component } from 'react';

//http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/

const margins = {
    margin: '5px'
}

class HistoryFinder extends Component {    

    constructor(props) {
        super(props);
    }

    searchHistory = function(event) {
        var query = event.target.value.toLowerCase();
        this.props.doSearch(query);
    }

    render() {
        
        return(
            <div>
                <div className = "searchBar">
                    <input type="text" style = {margins} placeholder="Search" value = {this.props.query} onChange = {this.searchHistory.bind(this)}/>
                    <button className="btn btn-primary" style = {margins} onClick = {this.props.sortData}> Sort by Date </button>
                </div>
            </div>
        ); 

    }
} export default HistoryFinder;