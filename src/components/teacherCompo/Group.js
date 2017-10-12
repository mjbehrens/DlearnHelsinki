import React from "react";
import { Link } from 'react-router-dom';
import Popup from 'react-popup';

import InfoStudent from "./InfoStudent";


const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';

var compo ;

class Group extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        this.state = {
            picture: null,
            student: {
                name: [],
                password: null,
            }
        };
    }

    addStudent = function () {
        /** fetch(ORIGIN + this.state.currentQuestion.id, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('teacher:password')
            },
            body: data
        }).then(function (response) {
            if (response.ok) {
                console.log(response.body)
                console.log("answer put on server")
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error :(
            console.log(err);
        }); */
        console.log('test');
        compo.props.callbackGM();
    }

    onClickStudent = (student) => {
        console.log("test 2");
        console.log(student);
        Popup.plugins().studentInformation(this.updateState, student);

        // open a new suvey
        /**
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
        }*/
    }
    //                 <img src={this.state.picture} width="30" height="30" alt="info"/>

    render(){
        return (

            <ul className="list-group">
                <h3>Groups</h3>
                {this.props.list.map(function(listValue, picture){
                    return <li className="list-group-item"><button onClick={() => compo.onClickStudent(listValue)}>{listValue.username}</button></li>;
                })}
                <li className="list-group-item"><button onClick={compo.addStudent}>+</button></li>
            </ul>

    )
    }

}

/** Survey Form plugin */
Popup.registerPlugin('studentInformation', function (callbackConfirm, student) {
    let _title = null;
    let _gender = null;
    let _age = null;

    console.log("test 1");
    let getTitle = function (e) {
        _title = e.target.value;
    };

    let getGender = function (e) {
        _gender = e.target.value;
    };
    let getAge = function (e) {
        _age = e.target.value;
    };
    console.log("test 5");
    console.log(this.student);

    this.create({
        title: 'Student information',
        content: <InfoStudent onChangeTitle={getTitle}
                              onChangeGender={getGender}
                              onChangeAge={getAge}
                              title={student.username}
                              gender={student.gender}
                              age={student.age}/>,
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

export default Group;