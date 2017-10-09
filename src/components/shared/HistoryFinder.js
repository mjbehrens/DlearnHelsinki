import React, { Component } from 'react';
import moment from 'moment';

// http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/
// Pick one: https://react.rocks/tag/DatePicker



const margins = {
    margin: '5px'
}

class HistoryFinder extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            rangeStart: moment(),
            rangeEnd: moment()
        }
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
    }

    searchHistory = function(event) {
        var query = event.target.value.toLowerCase();
        this.props.doSearch(query);
    }

    changeStart(date) {
        this.setState({
           rangeStart: date 
        });
    }
    
    changeEnd(date) {
        this.setState({
           rangeEnd: date 
        });
    }

    render() {
        
        return(
            <div>
                <div className = "searchBar">
                    <input type="text" style = {margins} placeholder="Search" value = {this.props.query} onChange = {this.searchHistory.bind(this)}/>
                    <button className="btn btn-primary" style = {margins} onClick = {this.props.sortData}> Sort by Date </button>
                </div>
                <div className = "timeRange">
                    Narrow down by date
                    
                </div>
            </div>
        ); 

    }
} export default HistoryFinder;