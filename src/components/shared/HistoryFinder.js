import React, { Component } from 'react';
import moment from 'moment';
import Calendar from 'react-input-calendar';
import 'react-input-calendar/style/index.css';
import { withTranslate } from 'react-redux-multilingual';
// http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/
// Pick one: https://react.rocks/tag/DatePicker
// https://github.com/Rudeg/react-input-calendar

var rangeStart;
var rangeEnd;

const margins = {
    margin: '5px'
}

const pickDate = {
    margin: '5px',
    position: 'relative',
    zIndex: '30'
}

class HistoryFinder extends Component {

    constructor(props) {
        var rangeStart = null;
        var rangeEnd = null;
        super(props);
        const {translate} = this.props;
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
    }

    searchHistory = function (event) {
        var query = event.target.value.toLowerCase();
        this.props.doSearch(query);
    }

    changeStart(date) {
        rangeStart = date;
    }

    changeEnd(date) {
        rangeEnd = date;
    }

    selectRange = function (event) {
        this.props.selectRange(rangeStart, rangeEnd);
    }



    render() {

        return (
            <div>
                <div className="searchBar">
                    <input type="text"
                        style={margins}
                        placeholder={this.props.translate('search')}
                        value={this.props.query}
                        onChange={this.searchHistory.bind(this)} />
                    <button className="btn btn-primary"
                        style={margins}
                        onClick={this.props.sortData}>
                        {this.props.translate('sort')}
                    </button>
                </div>
                {
                /**
                 *  REMOVE FOR THIS VERSION
                <div className = "row" style = {pickDate}>
                    <Calendar
                        format='DD-MM-YYYY'
                        computableFormat = 'YYYY-MM-DD'
                        date = {rangeStart}
                        onChange = {this.changeStart} />
                    <Calendar
                        format='DD-MM-YYYY'
                        computableFormat = 'YYYY-MM-DD'
                        date = {rangeEnd}
                        onChange = {this.changeEnd} />
                    <button className="btn btn-primary"
                        style = {margins}
                        onClick = {this.selectRange.bind(this)}>
                            Go
                    </button>
                </div>
                 */

                }

            </div>
        );

    }
} export default withTranslate(HistoryFinder);
