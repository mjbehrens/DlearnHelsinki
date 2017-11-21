import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from 'react-spinner'
import Popup from 'react-popup';
import { ROUTES, BACKEND_API } from '../constants.js';
import * as userActions from '../actions/userActions';
import * as classActions from '../actions/classActions';
import { withTranslate } from 'react-redux-multilingual'

require('../css/classSelection.css')

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
        const translate = this.props;
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
            alert(class_name + ' ' + this.props.translate('error_already'));
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
                    alert(this.props.translate('error_try_again'));
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
        Popup.plugins().addClass(this.postClass, this.props);
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
		    {this.props.translate('new_class')}
		</button>);
	}
        // console.log(buttons);

        if (this.state.loading) {
            return (
                <div className="SelectClass">
                    <h1>{this.props.translate('select_class')}</h1>
                    <div className='spinner-container'>
                        <Spinner />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="class-selection">
                    <h1>{this.props.translate('select_class')}</h1>
		    {this.state.warning &&
		    <div className="alert alert-danger alert-dismissible fade show" role="alert">
		     {this.props.translate('error_select_class')}
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


Popup.registerPlugin('addClass', function ( callbackConfirm, props) {

    let _class_name = '';


    let getClassName = function (e) {
        _class_name = e.target.value;
    };


    this.create({
        title: props.translate('create_class'),
        content: (<div>

            <h6>{props.translate('name')}  :</h6>
              <input type="text" className='input' placeholder={props.translate('class_name_placeholder')}
              onChange={getClassName} />

        </div>),
        buttons: {
            left: [{
                text: props.translate('cancel'),
                className: null, // optional
                action: function (popup) {
                    popup.close();
                }
            }],
            right: [{
                text: props.translate('confirm'),
                className: 'success', // optional
                action: function (popup) {
                    if ( _class_name.length > 5  ) {
                        callbackConfirm(_class_name);
                        popup.close();
                    } else {

                        alert(props.translate('error_class_name'))
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

export default connect(mapStateToProps)(withTranslate(ClassSelection));
