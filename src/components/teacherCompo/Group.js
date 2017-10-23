import React from "react";
import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import { ROUTES, BACKEND_API } from '../../constants.js';


import InfoStudent from "./InfoStudent";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import AddStudent from "./AddStudent";

import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.user.classes,
    }
}


var compo = null;

class Group extends React.Component {

    constructor(props) {
        super(props);
        compo = this;

        this.state = {
            picture: null,
            group_id: props.group_id,
            group_name: props.group_name,
            student: {
                id: 0,
                name: [],
                password: null,
            }
        };
    }

    /*
    + Requiere the group_id to be pass when the button is render. otherwise it won't work 
    + this should be investiget
    */
    onClickAddStudent = function (group_id, allStudentsList) {
        Popup.plugins().addStudent((infoStudent) => {
            console.log(infoStudent);
            let data = JSON.stringify({
                "group_id": group_id,
                "class_id": compo.props.user.classid,
                "password": infoStudent._password,
                "student": {
                    "_id": infoStudent._id,
                    "username": infoStudent._username,
                    "age": infoStudent._age,
                    "gender": infoStudent._gender
                }
            });

            let POST_STUDENT = 'teachers/' + compo.props.user.id + '/create_student';
            console.log(data);

            fetch(BACKEND_API.ROOT + POST_STUDENT, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + compo.props.user.hash
                },
                body: data,
            }).then(function (response) {
                if (response.ok) {
                    console.log("answer put on server")
                    compo.props.callbackGM();
                } else {
                    console.log('Network response was not ok.');
                    alert("Error while creating the account. Please check if this account does not already exist.");
                }
            }).catch(function (err) {
                // Error :(
                console.log(err);
                alert(err);
            });
        }, allStudentsList);
    }

    onClickStudent = (student) => {
        Popup.plugins().studentInformation(this.updateState, student, this.props.listGroups);
    }

    render() {

        return (
            <div className="card">
                <div className="card-body no-padding">
                    <div className="card-text">
                        <div className="list-group">
                            <button type="button" className="card-title list-group-item list-group-item-action active">{this.props.group_name}</button>
                            {this.props.list.map(function (listValue) {
                                return <button type="button" className="list-group-item list-group-item-action" onClick={() => compo.onClickStudent(listValue)}>{listValue.username}</button>;
                            })}
                            <button type="button" className="list-group-item list-group-item-action no-padding" onClick={() => compo.onClickAddStudent(this.props.group_id, this.props.allStudentsList)}><div className="card-footer">+</div></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Popup.registerPlugin('studentInformation', function (callbackConfirm, student, listGroups) {
    let _gender = null;
    let _age = null;
    let _studentId = null;
    let _applied_changes = false;

    let getGender = function (e) {
        _gender = e.target.value;
    };
    let getAge = function (e) {
        _age = e.target.value;
    };
    let getStudentId = function (e) {
        _studentId = e.target.value;
    };
    let getChanges = function (hasChanged) {
        _applied_changes = hasChanged;
    };

    this.create({
        title: 'Student information',
        content: <InfoStudent
            onChangeGender={getGender}
            onChangeAge={getAge}
            onChangesToApply={getChanges}
            username={student.username}
            gender={student.gender}
            age={student.age}
            listGroups={listGroups}
            studentId={student._id} />,
        buttons: {
            left: [{
                text: 'Quit',
                className: null,
                action: function (popup) {
                    //this is bad...
                    if (_applied_changes) {
                        compo.props.callbackGM();
                    }
                    popup.close();
                }
            }],

        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});

Popup.registerPlugin('addStudent', function (callbackConfirm, allStudentsList) {
    let _id = null;
    let _username = '';
    let _age = 0;
    let _gender = '';
    let _password = '';

    let onSelectStudent = function (e) {
        let id = e.target.value;

        let student = allStudentsList.filter(function (stud) {
            return stud._id == id;
        })[0];

        if (student !== null) {
            _id = student._id;
            _username = student.username;
            _age = student.age;
            _gender = student.gender;
            _password = "password";
        }

        console.log(student);

    }

    let getUsername = function (e) {
        _username = e.target.value;
    };

    let getAge = function (e) {
        _age = e.target.value;
    };

    let getGender = function (e) {
        _gender = e.target.value;
    };

    let getPassword = function (e) {
        _password = e.target.value;
    };

    let checkForm = function () {

        console.log("student info");        
        console.log(_username.length);
        console.log(_password.length);
        console.log(_gender.length);
        
        if ((_username.length > 5)
            && (_age > 1) 
            && (_password.length > 5) 
            && (_gender.length > 1) ) {
            return true;
        } else {
            return false;
        }
    }

    this.create({
        title: 'Add student',
        content: <AddStudent
            onChangeSelect={onSelectStudent}
            onChangeUsername={getUsername}
            onChangeAge={getAge}
            onChangeGender={getGender}
            onChangePassword={getPassword}
            username={"5 letters min"}
            age={"7"}
            password={"5 letters min"}
            allStudentsList={allStudentsList} />,
        buttons: {
            left: [{
                text: 'Quit',
                className: null, // optional
                action: function (popup) {
                    //do things
                    popup.close();
                }
            }],
            right: [{
                text: 'Confirm',
                className: 'success', // optional
                action: function (popup) {
                    if (checkForm()) {
                        if (_id !== null) {
                            callbackConfirm({
                                _id: _id,
                                _username: _username,
                                _age: _age,
                                _gender: _gender,
                                _password: _password
                            });
                        } else {
                            callbackConfirm({
                                _username: _username,
                                _age: _age,
                                _gender: _gender,
                                _password: _password
                            });
                        }
                        popup.close();
                    } else {
                        alert('The information are not filled correctly.')
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

export default connect(mapStateToProps)(Group);
