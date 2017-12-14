import React, { Component } from 'react';
import Spinner from 'react-spinner';

import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}

var compo = null;

class OutlierList extends Component {

    constructor(props) {
        super(props);
        compo = this;
        this.state = {
            isLoading: false,
        }
    }


    render() {
        return (
        	<div>
            	Moi
            </div>
        );
    }

}
export default connect(mapStateToProps)(OutlierList);
