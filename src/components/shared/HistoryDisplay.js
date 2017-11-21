import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

const buttonStyle = {
    margin: '5px'
}

var compo = null;
class HistoryDisplay extends Component {

    constructor(props) {
        super(props);

        compo = this;

        const {translate} = this.props;
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

    padNumber = function (number, size) {
        let s = "" + number;
        while (s.length < size) {
            s = "0" + s;
        } return s;
    }

    getDisplayDate(d) {
        return this.padNumber(d.getDate(), 2) + "-" + this.padNumber((d.getMonth() + 1), 2) + "-" + d.getFullYear();
    }

    onClickItem = function (id) {
        // TODO : change color of the button
        this.props.loadResult(id);
    }

    buildList = function () {
        var searchResults = [];
        let i = 0;

        switch (this.props.dataType) {
            case 'student':
                this.state.searchData.forEach(function (result) {
                    searchResults.push(<button key={i}
                        className="btn btn-default left-align"
                        onClick={compo.onClickItem.bind(compo, result._id)}>
                        {result.username}
                    </button>)
                    i = i + 1;
                });
                break;
            case 'group':
                this.state.searchData.forEach(function (result) {
                    searchResults.push(<button key={i}
                        className="btn btn-default left-align"
                        onClick={compo.onClickItem.bind(compo, result._id)}>
                        {result.name}
                    </button>)
                    i = i + 1;
                });
                break;
            case 'survey':
                this.state.searchData.forEach(function (result) {
                    searchResults.push(<button key={i}
                        className="btn btn-default left-align"
                        onClick={compo.onClickItem.bind(compo, result._id)}>
                        {result.start_date + " " + result.title}
                    </button>)
                    i = i + 1;
                });
                break;

            default:
                break;
        }

        return searchResults;
    }

    render() {

        return (
            <div style={buttonStyle} className="btn-group-vertical">
                {this.buildList()}
            </div>
        )
    }
} export default HistoryDisplay;
