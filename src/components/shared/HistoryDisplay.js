import React, { Component } from 'react';

const buttonStyle = {
    margin: '5px'
}

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
        let compo = this;
        let i = 0;
        this.props.searchData.forEach( function(result) {
            if (true) {
                searchResults.push(<button key = {i} className="btn btn-default left-align" onClick = {compo.props.loadResult(result._id)}> {result.start_date +" "+ result.testInput} </button>)
                i = i+1;
            }
        });
        return(
            <div style = {buttonStyle} className="btn-group-vertical">
                { searchResults }
            </div>
        )
    }
} export default HistoryDisplay;