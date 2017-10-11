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
    
    padNumber = function(number, size) {
        let s = ""+number;
        while (s.length < size) {
            s = "0"+s;
        } return s;
    }
    
    getDisplayDate(d) {
        return this.padNumber(d.getDate(), 2)+"-"+this.padNumber((d.getMonth()+1), 2)+"-"+d.getFullYear();
    }
    render() {
        var searchResults = [];
        let compo = this;
        let i = 0;
        let d = '';
        this.props.searchData.forEach( function(result) {
            d = new Date(result.start_date);
            let displayDate = compo.getDisplayDate(d);
            searchResults.push(<button 
                key = {i} 
                className="btn btn-default left-align" 
                onClick = {compo.props.loadResult(result._id)}> 
                        { displayDate +" "+ result.testInput } 
                </button>)
                 i = i+1;
        });
        return(
            <div style = {buttonStyle} className="btn-group-vertical">
                { searchResults }
            </div>
        )
    }
} export default HistoryDisplay;