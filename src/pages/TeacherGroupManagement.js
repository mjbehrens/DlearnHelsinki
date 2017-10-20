import React from "react";
import Popup from 'react-popup';
import { ROUTES, BACKEND_API } from '../constants.js';
import Spinner from 'react-spinner';

import { Link } from 'react-router-dom';

import Group from "../components/teacherCompo/Group";
import InfoStudent from "../components/teacherCompo/InfoStudent";
import AddGroup from "../components/teacherCompo/AddGroup";

import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.user.classes,
    }
}

var groups = [];
var listGrps = [];

var compo;

class TeacherGroupManagement extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        groups = [];
        listGrps = [];

        this.state = {
            listGrps: [], //id and name
            groups: [], // students in groups
            //picture: infoGroupManagement,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getGroupsREST();
    }


    getGroupsREST = function () {
        compo.setState({ isLoading: true });

        let GET_GROUPS = 'teachers/' + compo.props.user.id + '/classes/' + compo.props.user.classid + '/groups';

        fetch(BACKEND_API.ROOT + GET_GROUPS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + compo.props.user.hash // This needs to be changed in the final version...
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    groups = data;
                    compo.loadStudentsGroups();
                });
            } else {
                console.log('Network response was not ok.');
            }
            compo.setState({ isLoading: false });
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }


    //
    loadStudentsGroups = function () {
        let listGroups = [];
        //to change and go to students
        this.loadGroups();
        groups.forEach(function (g) {
            listGroups.push(<div key={g._id}><Group list={g.students} group_name={g.name} group_id={g._id} listGroups={compo.state.listGrps} callbackGM={compo.getGroupsREST} /></div>);
        });
        this.setState({ groups: listGroups });
        console.log(groups);
    }

    loadGroups = function () {

        let listGroups = [];
        //to change and go to students
        groups.forEach(function (g) {
            listGroups.push({ groupId: g._id, groupName: g.name });
        });
        console.log(listGroups);
        this.setState({ listGrps: listGroups });

    }

    onClickAddGroup = function () {
        Popup.plugins().addGroup(function (group_name) {
            compo.setState({ isLoading: true });
            let POST_CREATE_GROUPS = 'teachers/' + compo.props.user.id + '/classes/' + compo.props.user.classid + '/groups/';

            let data = JSON.stringify({
                "name": group_name,
            });

            fetch(BACKEND_API.ROOT + POST_CREATE_GROUPS, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + compo.props.user.hash,
                },
                body: data
            }).then(function (response) {
                if (response.ok) {
                    console.log(response.body)
                    compo.getGroupsREST();
                } else {
                    console.log('Network response was not ok.');
                }
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });
        });


    }

    onClickDeleteGroup = function () {
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

    render() {

        if (this.state.isLoading) {
            return (
                <div className="container">
                    <h1>Group Management</h1>
                    <br/>
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                </div>

            )
        } else {
            return (
                <div className="container">
                    <h1>Group Management</h1>
                    <div className="row">
                        {this.state.groups}

                    </div>
                    <button onClick={this.onClickAddGroup}>Add a group</button>
                    <button disabled={true} onClick={this.onClickDeleteGroup}>Delete a group</button>
                </div>
            )
        }

    }
}

Popup.registerPlugin('addGroup', function (callbackConfirm) {
    let _group_name = '';

    let getGroupName = function (e) {
        _group_name = e.target.value;
    };

    this.create({
        title: 'Add group',
        content: <AddGroup onChangeGroupName={getGroupName} />,
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
                    if (_group_name.length > 0) {
                        callbackConfirm(_group_name);
                        popup.close();
                    } else {
                        alert("The new group must have a name !")
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


export default connect(mapStateToProps)(TeacherGroupManagement);
