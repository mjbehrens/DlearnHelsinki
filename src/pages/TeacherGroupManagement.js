import React from "react";

import { Link } from 'react-router-dom';
//import SurveyCreationForm from './SurveyCreationForm.js'

//import infoGroupManagement from "../res/icons/icon.png";
import Group from "../components/teacherCompo/Group";




//const groupsJSON = '[{"group_id" : 1, "grpName" : "Grp1", "students" : [{"_id" : 1, "lastname" : "Meikäläinen", "firstname" : "Matti", "username" : "iloinen tanssiva aurinko"},{"_id" : 2, "lastname" : "Jo", "firstname" : "Doe", "username" : "iloinen tanssiva aurinko"}]},{"group_id" : 2, "grpName" : "Grp2", "students" : [{"_id" : 3, "lastname" : "Thomas", "firstname" : "Mimi", "username" : "iloinen tanssiva aurinko"}, {"_id" : 3, "lastname" : "Jean", "firstname" : "Dujardin", "username" : "iloinen tanssiva aurinko"}]}]';
const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';
var GET_GROUPS = '';
var groups = [];

var compo ;

class TeacherGroupManagement extends React.Component {

    constructor(props){
        super(props);
        compo = this;
        groups = [];
        this.state = {
            groups: [],
            //picture: infoGroupManagement,
        };
    }

    buildRequestREST = function() {
        var s = '';
        // Build request here
        // teachers/{teacher_id}/classes/{class_id}/groups/

        s = s + '/teachers/1/classes/1/groups'; // Warning! Hard coded for testing purposes. Also, 404.

        GET_GROUPS = s;
    }

    getGroupsREST = function() {
        console.log(ORIGIN + GET_GROUPS);
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
        console.log(groups);
        groups.forEach(function(g) {
            listGroups.push(<div key = {g._id}><Group list={g.students} callbackGM={compo.getGroupsREST}/></div>);

        });

        this.setState({groups : listGroups});
    }



    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3" >
                        {this.state.groups}
                    </div>
                </div>
            </div>

        )
    }



}


export default TeacherGroupManagement;