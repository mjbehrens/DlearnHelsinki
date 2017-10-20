import React from "react";
import Popup from 'react-popup';

import { Link } from 'react-router-dom';
//import SurveyCreationForm from './SurveyCreationForm.js'

//import infoGroupManagement from "../res/icons/icon.png";
import Group from "../components/teacherCompo/Group";
import InfoStudent from "../components/teacherCompo/InfoStudent";
import AddGroup from "../components/teacherCompo/AddGroup";



//const groupsJSON = '[{"group_id" : 1, "grpName" : "Grp1", "students" : [{"_id" : 1, "lastname" : "Meikäläinen", "firstname" : "Matti", "username" : "iloinen tanssiva aurinko"},{"_id" : 2, "lastname" : "Jo", "firstname" : "Doe", "username" : "iloinen tanssiva aurinko"}]},{"group_id" : 2, "grpName" : "Grp2", "students" : [{"_id" : 3, "lastname" : "Thomas", "firstname" : "Mimi", "username" : "iloinen tanssiva aurinko"}, {"_id" : 3, "lastname" : "Jean", "firstname" : "Dujardin", "username" : "iloinen tanssiva aurinko"}]}]';
const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi/';
var GET_GROUPS = '';
var groups = [];
var listGrps = [];

var compo ;

class TeacherGroupManagement extends React.Component {

    constructor(props){
        super(props);
        compo = this;
        groups = [];
        listGrps = [];

        this.state = {
            listGrps: [], //id and name
            groups: [], // students in groups
            //picture: infoGroupManagement,
        };
    }

    buildRequestREST = function() {
        var s = '';
        // Build request here
        // teachers/{teacher_id}/classes/{class_id}/groups/

    }

    getGroupsREST = function() {

        let GET_GROUPS = 'teachers/1/classes/1/groups';
        
        fetch(ORIGIN + GET_GROUPS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa('teacher:password') // This needs to be changed in the final version...
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(data => {
                    groups = data;
                    compo.loadStudentsGraphs();

                });
            }else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    componentDidMount() {
        this.buildRequestREST();
        this.getGroupsREST();
    }

    loadStudentsGraphs = function() {
        let listGroups = [];
        //to change and go to students
        this.loadGroups();
        groups.forEach(function(g) {
            listGroups.push(<div key = {g._id}><Group list={g.students} name={g.name} listGroups={compo.state.listGrps} callbackGM={compo.getGroupsREST}/></div>);
        });
        console.log('Here');
        this.setState({groups : listGroups});
        console.log(groups);
    }

    loadGroups = function() {
        let listGroups = [];
        //to change and go to students
        groups.forEach(function(g) {
            listGroups.push({groupId : g._id, groupName: g.name});
        });
        console.log('Ici');
        console.log(listGroups);
        this.setState({listGrps : listGroups});
    }

    addGroup = function () {
        Popup.plugins().addGroup();

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
        console.log("Add a group");
    }

    deleteGroup = function () {
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
        console.log("Delete a group");

    }

    render(){
        return (
            <div className="container">
                <h1>Group Management</h1>
                <div className="row">
                    {this.state.groups}

                </div>
                <button onClick={this.addGroup}>Add a group</button>
                <button onClick={this.deleteGroup}>Delete a group</button>
            </div>
        )
    }
}

Popup.registerPlugin('addGroup', function () {
    let _username = null;

    let getUsername = function (e) {
        _username = e.target.value;
    };

    this.create({
        title: 'Add group',
        content: <AddGroup
            />,
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
                    //callbackConfirm(_username);
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



export default TeacherGroupManagement;