import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import Popup from 'react-popup';
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
            loading: false,
	    warning: Boolean(this.props.location.state && this.props.location.state.warning),
        }
    }

    componentDidMount() {
        if(this.props.classes.length === 0){
            this.getClasses();
        }
    }

    getClasses = () => {

        this.setState({
            ...this.state,
            loading: true,
        })
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
                loading: false,
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    isClassAlreadyExist = (class_name) => {
        let c = this.props.classes.filter(function(classroomm){
            return classroomm.name === class_name;
        })
        console.log(c);
        if(c.length > 0){
            return true;
        }
        else{
            return false;
        }
    }

    postClass = (class_name) => {
        this.setState({
            loading: true,
        })

        if(this.isClassAlreadyExist(class_name)){
            alert(class_name + ' Class already exist. Please enter another name.');
            this.setState({
                loading: false,
            });
        }else{
            let data = JSON.stringify({
                "name": class_name,
            });
    
            let POST_CREATE_CLASS = 'teachers/' + this.props.user.id + '/classes';
    
            fetch(BACKEND_API.ROOT + POST_CREATE_CLASS, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + this.props.user.hash,
                },
                body: data,
            }).then((response) => {
                if (response.ok) {
                    this.getClasses();
                } else {
                    console.log('Network response was not ok.');
                    alert("Error while creating this new class. Please retry");
                    this.setState({
                        ...this.state,
                        loading: false,
                    })
                }
    
    
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    selectClass = (classid) => {
        this.props.dispatch(userActions.setUserClassId(classid))
        this.props.history.push({
            pathname: this.state.goTo,
        })
    }

    createClass = () => {
        Popup.plugins().addClass(this.postClass);
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
        let x = 1;
        var buttons = this.props.classes.map(function (classroom, i) {
            if (classroom._id > x) {
                x = classroom._id;
            }
            return this.renderButton(classroom);
        }, this);
        // 'create new class' button
	if (this.props.user.type === 'teacher') {
	    buttons.push(
		<button style={{ margin: "1vmin" }}
		    key={x + 1}
		    onClick={() => this.createClass()}
		    className="btn btn-info">
		    {"+ new Class"}
		</button>);
	}
        // console.log(buttons);

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
		    {this.state.warning &&
		    <div className="alert alert-danger alert-dismissible fade show" role="alert">
		     You must select a class first
		    </div>
		    }

                    <div>
                        {buttons}
                    </div>
                </div>
            );
        }
    }
}


Popup.registerPlugin('addClass', function (callbackConfirm) {
    let _class_name = '';

    let getClassName = function (e) {
        _class_name = e.target.value;
    };

    this.create({
        title: 'Create new Class',
        content: (<div>
            <h6>Name:</h6><input type="text" placeholder={"class name"}
                onChange={getClassName} />
        </div>),
        buttons: {
            left: [{
                text: 'Cancel',
                className: null, // optional
                action: function (popup) {
                    popup.close();
                }
            }],
            right: [{
                text: 'Confirm',
                className: 'success', // optional
                action: function (popup) {
                    if (_class_name.length > 5) {
                        callbackConfirm(_class_name);
                        popup.close();
                    } else {
                        alert("The new class must have a name !. Please enter a name with more than 5 letters")
                    }

                }
            }]
        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});

export default connect(mapStateToProps)(ClassSelection);
