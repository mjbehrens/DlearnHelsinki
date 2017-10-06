import React, { Component } from 'react';



var buttonList = [];

class HistoryDisplay extends Component {
    
    constructor(props) {
        
        buttonList = [];
        
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
        this.props.searchData.forEach( function(result) {
            if (true) {
                searchResults.push(<div><button onClick = {compo.props.loadResult}> {result} </button></div>)
            }
        });
        return(
            <div>
                { searchResults }
            </div>
        )
    }
} export default HistoryDisplay;