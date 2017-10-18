import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../constants.js';

import SelectClass from '../components/teacherCompo/SelectClass.js';
import * as userActions from '../actions/userActions';
import * as classActions from '../actions/classActions';

var classesJSON = '[{"_id": 1, "className": "Math 1"}, {"_id": 2, "className": "Math 2"}, \n\
{"_id": 3, "className": "Math 5"}, {"_id": 4, "className": "Math 8"}, {"_id": 12, "className": "Math 9"},\n\
 {"_id": 6, "className": "Math 21"}, {"_id": 7, "className": "Homeroom"}]';
var classes;

var ORIGIN = "https://dlearn-helsinki-backend.herokuapp.com/webapi";
var GET_CLASSES = "";

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
	}
        var classes = [];
    }

    componentDidMount() {
	if (this.props.user.type === 'teacher') {
	    this.setState({
		...this.state,
		goTo: ROUTES.TEACHER_DASHBOARD
	    })
	} else {
	    this.setState({
		...this.state,
		goTo: ROUTES.STUDENT_DASHBOARD
	    })
	}
    }

    // There are no classes implemented in the database, so it's currently impossible
    // to test this function.
    buildRequestREST = function() {
        var s = '';
        s = s + '/teachers/1/classes/'; // Warning! Hard coded for testing purposes.
        GET_CLASSES = s;
    }
    // There are no classes implemented in the database, so it's currently impossible
    // to test this function.
    getClassesREST = function() {
        console.log(ORIGIN + GET_CLASSES);
        fetch(ORIGIN + GET_CLASSES, {
            method: "GET",
            headers: {
		'Access-Control-Allow-Origin': '*',
		'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(data => {
                                    classes = data;
				});
            }else {
		console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
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
                        onClick = {this.selectClass(buttonValue.className)}
                        className="btn btn-primary">
                            {buttonValue.className}
                </button>
        );
    }
    
    render() {
        var class_list = JSON.parse(classesJSON);;
        var temp = 0;
        
        var buttons = class_list.map(function(classInList, i){
                            return this.renderButton(classInList);
                        }, this);
        
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
// MOVE THIS BACK TO RENDER SHOULD YOU FIND IT MORE APPEALING
//                    <div style = {{margin: "1vmin"}}>   
//                        <button onClick = {this.moveToDashboard} className = "btn btn-default">Continue</button>
//                    </div>
export default connect(mapStateToProps)(ClassSelection);
