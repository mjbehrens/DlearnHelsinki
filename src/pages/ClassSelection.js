import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import { ROUTES, BACKEND_API } from '../constants.js';

import SelectClass from '../components/teacherCompo/SelectClass.js';
import * as userActions from '../actions/userActions';
import * as classActions from '../actions/classActions';


function mapStateToProps(store) {
    return {
	user: store.user.user,
	classes: store.classroom.classes,
    }
}

class ClassSelection extends Component {

    constructor(props) {
        super(props);
	this.state = {
	    goTo: ROUTES.CLASS_SELECTION,
	    api: null,
	    getClassesEndpoint: null,
	    loading: true,
	}
        var classes = [];
    }

    componentDidMount() {
	if (this.props.user.type === 'teacher') {
	    this.setState({
		...this.state,
		goTo: ROUTES.TEACHER_DASHBOARD,
		getClassesEndpoint: 'teachers/' + this.props.user.id + '/classes/',
	    })
	} else {
	    this.setState({
		...this.state,
		goTo: ROUTES.STUDENT_DASHBOARD,
		getClassesEndpoint: 'students/' + this.props.user.id + '/classes/',
	    })
	}
    }

    getClasses = () => {
        fetch(BACKEND_API.ROOT + this.state.getClassesEndpoint, {
            method: "GET",
            headers: {
		'Access-Control-Allow-Origin': '*',
		'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then((response) => {
            if(response.ok) {
                response.json().then(data => {
		    this.props.dispatch(classActions.setClasses(data));
		});
            } else {
		console.log('Network response was not ok.');
            }
	    this.setState({
		...this.state,
		loading: false,
	    })
        }).catch((err) => {
            console.log(err);
	});
    }

    selectClass = (buttonValue) => (e) => {
        e.preventDefault();
        this.props.history.push({
                pathname: this.state.goTo,
                state: {className: buttonValue}
            })
    }

    renderButton(buttonValue) {
        return(
                <button style = {{margin: "1vmin"}}
                        key = {buttonValue._id}
                        onClick = {this.selectClass(buttonValue.name)}
                        className="btn btn-primary">
                            {buttonValue.name}
                </button>
        );
    }
    
    render() {
	this.getClasses();
        var buttons = this.props.classes.map(function(classInList, i){
                            return this.renderButton(classInList);
                        }, this);
        
	if (this.state.loading) {
	    return (
		<div className="SelectClass">
		    <h1>Select a Class</h1> 
		    <div className='spinner-container'>
			<Spinner />
		    </div>
		</div>
	    )
	} else {
        return (
            <div className="SelectClass">
                <h1>Select a Class</h1> 

                    <div>
                        {buttons}
                    </div>

            </div>
        );
	}
    }
}
// MOVE THIS BACK TO RENDER SHOULD YOU FIND IT MORE APPEALING
//                    <div style = {{margin: "1vmin"}}>   
//                        <button onClick = {this.moveToDashboard} className = "btn btn-default">Continue</button>
//                    </div>
export default connect(mapStateToProps)(ClassSelection);
