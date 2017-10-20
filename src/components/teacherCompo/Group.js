import React from "react";
import { Link } from 'react-router-dom';
import Popup from 'react-popup';

import InfoStudent from "./InfoStudent";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import AddStudent from "./AddStudent";


const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi/';

let POST_STUDENT = '';

var compo;

class Group extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        this.state = {
            picture: null,
            student: {
                id: 0,
                name: [],
                password: null,
            }
        };

    }

    addStudent = function () {
        Popup.plugins().addStudent(function (infoStudent) {
            let data = JSON.stringify({
                "groud_id": compo.props.idGroup,
                "class_id": 1,
                "password": infoStudent._password,
                "student": {
                    "username": infoStudent._username,
                    "age": infoStudent._age,
                    "gender": infoStudent._gender
                }
            });
            let POST_STUDENT = 'teachers/1/create_student';

            fetch(ORIGIN + POST_STUDENT, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('teacher:password')
                },
                body: data,
            }).then(function (response) {
                if (response.ok) {
                    console.log(response.body)
                    console.log("answer put on server")
                    compo.props.callbackGM();
                } else {
                    console.log('Network response was not ok.');
                }
            }).catch(function (err) {
                // Error :(
                console.log(err);
                alert(err);
            });
        });
    }

    onClickStudent = (student) => {
        Popup.plugins().studentInformation(this.updateState, student, this.props.listGroups);

        // open a new suvey

        if (this.state.open === true) {
            Popup.plugins().createSurveyForm(this.updateState);

        } else {
            //close the previously opened survey
            if (this.state.open === false) {
                console.log('Survey close');
                this.setState({
                    ...this.state,
                    open: true,
                    text: "Open survey"
                });
            }
        }
    }
    //                 <img src={this.state.picture} width="30" height="30" alt="info"/>

    render() {
        return (
            <div className="row">
                {this.props.name}
                <ul className="list-group">
                    {this.props.list.map(function (listValue) {
                        return <li className="list-group-item"><button onClick={() => compo.onClickStudent(listValue)}>{listValue.username}</button></li>;
                    })}
                    <li className="list-group-item"><button onClick={compo.addStudent}>+</button></li>
                </ul>
            </div>
        )
    }
}

Popup.registerPlugin('studentInformation', function (callbackConfirm, student, listGroups) {
    let _title = null;
    let _gender = null;
    let _age = null;
    let _studentId = null;
    console.log('Hey');

    let getTitle = function (e) {
        _title = e.target.value;
    };

    let getGender = function (e) {
        _gender = e.target.value;
    };
    let getAge = function (e) {
        _age = e.target.value;
    };
    let getStudentId = function (e) {
        _studentId = e.target.value;
    };

    this.create({
        title: 'Student information',
        content: <InfoStudent onChangeTitle={getTitle}
            onChangeGender={getGender}
            onChangeAge={getAge}
            title={student.username}
            gender={student.gender}
            age={student.age}
            listGroups={listGroups}
            studentId={student._id} />,
        buttons: {
            left: [{
                text: 'Quit',
                className: null, // optional
                action: function (popup) {
                    //do things
                    popup.close();
                }
            }],
            /* right: [{
                 text: 'Confirm',
                 className: 'success', // optional
                 action: function (popup) {
                     callbackConfirm(_title);
                     popup.close();
                 }
             }]*/
        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});

Popup.registerPlugin('addStudent', function (callbackConfirm) {
    let _username = null;
    let _age = null;
    let _gender = null;
    let _password = null;

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

    this.create({
        title: 'Add student',
        content: <AddStudent
            onChangeUsername={getUsername}
            onChangeAge={getAge}
            onChangeGender={getGender}
            onChangePassword={getPassword}
            username={"New student - Username"}
            age={"New student - Age"}
            password={"New student - Password"} />,
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
                    callbackConfirm({
                        _username: _username,
                        _age: _age,
                        _gender: _gender,
                        _password: _password
                    });
                    popup.close();
                }
            }]
        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});

export default Group;