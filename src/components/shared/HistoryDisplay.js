import React, { Component } from 'react';

const buttonStyle = {
    margin: '5px'
}

var compo = null;
class HistoryDisplay extends Component {

    constructor(props) {
        super(props);

        compo = this;

        this.state = {
            searchData: [],
        }
    }
//    
//    shouldComponentUpdate(nextProps, nextState) {       
//        return nextProps.searchData !== this.props.searchData; 
//    } 
  
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                //...this.state,
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

    onClickSurvey = function (surveyId) {
        // TODO : change color of the button 
        this.props.loadResult(surveyId);
    }

    render() {
        var searchResults = [];
        let i = 0;
        this.state.searchData.forEach(function (result) {
                searchResults.push(<button key={i}
                    className="btn btn-default left-align"
                    onClick={compo.onClickSurvey.bind(compo, result._id)}>
                    {result.start_date + " " + result.title}
                </button>)
                i = i + 1;
        });

        return (
            <div style={buttonStyle} className="btn-group-vertical">
                {searchResults}
            </div>
        )
    }
} export default HistoryDisplay;