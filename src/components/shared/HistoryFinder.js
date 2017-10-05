import React, { Component } from 'react';

//http://voidcanvas.com/react-tutorial-understanding-and-making-the-first-application/

class HistoryFinder extends Component {    

    constructor(props) {
        super(props);
    }

    searchHistory = () => (e) => {
        var query = this.refs.searchInput.getDOMNode().value;
        this.props.doSearch(query);
        console.log("Are we even searching for anything?");
    }

    render() {
        
        return(
            <div>
                An amazing search bar is supposed to be here, but it hasn't been implemented yet.
                <div className = "searchBar">
                    <input type="text" ref="searchInput" placeholder="Search" defaultValue = {this.props.query} onChange = {this.searchHistory}/>
                </div>
            </div>
        ); 
    }
} export default HistoryFinder;