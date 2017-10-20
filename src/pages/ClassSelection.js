import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import { ROUTES, BACKEND_API } from '../constants.js';
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
            goTo: this.props.user.type === 'teacher' ? ROUTES.TEACHER_DASHBOARD : ROUTES.STUDENT_DASHBOARD,
            api: null,
            getClassesEndpoint: (this.props.user.type === 'teacher' ? 'teachers/' : 'students/')
	        + this.props.user.id + '/classes/',
            loading: true,
        }
    }

    componentDidMount() {
        this.getClasses();
    }

    getClasses = () => {

        fetch(BACKEND_API.ROOT + this.state.getClassesEndpoint, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    this.props.dispatch(classActions.setClasses(data));
                });
            } else {
                console.log('Network response was not ok.');
            }
            this.setState({
                ...this.state,
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    selectClass = (classid) => {
	this.props.dispatch(userActions.setUserClassId(classid))
        this.props.history.push({
            pathname: this.state.goTo,
        })
    }

    renderButton(classroom) {
        return (
            <button style={{ margin: "1vmin" }}
                key={classroom._id}
		onClick={() => this.selectClass(classroom._id)}
                className="btn btn-primary">
                {classroom.name}
            </button>
        );
    }

    render() {
        var buttons = this.props.classes.map(function (classroom, i) {
            return this.renderButton(classroom);
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

export default connect(mapStateToProps)(ClassSelection);
