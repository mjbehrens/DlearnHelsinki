import React, { Component } from 'react';

class HistoryDisplay extends Component {
    
    constructor(props) {
        super(props);
    }
//    
//    shouldComponentUpdate(nextProps, nextState) {       
//        return nextProps.searchData !== this.props.searchData; 
//    } 
  
  componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({...this.state,
            	searchData: nextProps.searchData
            });
        }
  }
    
    render() {
        var searchResults = [];
        this.props.searchData.forEach( function(result) {
            if (true) {
                searchResults.push(<div> {result} </div>)
            }
        });
        return(
            <div>
                { searchResults }
            </div>
        )
    }
} export default HistoryDisplay;