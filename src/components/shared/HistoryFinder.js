import React, { Component } from 'react';
import 'react-input-calendar/style/index.css';
import { withTranslate } from 'react-redux-multilingual';
// http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/
// Pick one: https://react.rocks/tag/DatePicker
// https://github.com/Rudeg/react-input-calendar

var rangeStart;
var rangeEnd;

const buttonMargins = {
    margin: '5px'
}
const barMargins = {
    marginTop: '8px',
    marginRight: '5px',
    marginLeft: '15px',
    padding: '2px'
}

class HistoryFinder extends Component {

    constructor(props) {
        super(props);
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
        const { translate } = this.props;

        return (
            <div>
                <div className="searchBar">
                    <input type="text"
                        style={barMargins}
                        placeholder={translate('search')}
                        value={this.props.query}
                        onChange={this.searchHistory.bind(this)} />
                    <button className="btn btn-primary"
                        style={buttonMargins}
                        onClick={this.props.sortData}>
                        {translate('sort')}
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
