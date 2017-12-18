import React from "react";
import Popup from 'react-popup';
import { BACKEND_API } from '../constants.js';
import Spinner from 'react-spinner';
import { withTranslate } from 'react-redux-multilingual'

import Group from "../components/teacherCompo/Group";
import AddGroup from "../components/teacherCompo/AddGroup";
import DeleteGroup from "../components/teacherCompo/DeleteGroup";

import { connect } from 'react-redux';

function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.user.classes,
    }
}

var groups = []; // groups of this class
var allStudentsList = []; // student of all the school
var listGrps = [];
var compo;

class TeacherGroupManagement extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        groups = [];
        allStudentsList = [];

        this.state = {
            listGrps: [], //id and name
            groups: [], // students in groups
            allStudentsList : allStudentsList,
            //picture: infoGroupManagement,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getGroupsREST();
        this.getAllStudents();
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

    getAllStudents = function () {
        compo.setState({ isLoading: true });

        let GET_GROUPS = 'teachers/' + compo.props.user.id + '/students/';

        fetch(BACKEND_API.ROOT + GET_GROUPS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + compo.props.user.hash // This needs to be changed in the final version...
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    allStudentsList = data;
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
            listGroups.push(<div key={g._id}><Group group_lenght={g.students.length} allStudentsList={allStudentsList} list={g.students} group_name={g.name} group_id={g._id} listGroups={compo.state.listGrps} callbackGM={compo.getGroupsREST} /></div>);
        });
        this.setState({ groups: listGroups });
        console.log(groups);
    }

    loadGroups = function () {

        let listGroups = [];
        //to change and go to students
        groups.forEach(function (g) {
            listGroups.push({ groupId: g._id, groupName: g.name, groupsLength: g.students.length});
        });
        this.setState({ listGrps: listGroups });

    }

    postGroup = (group_name) => {
        compo.setState({ isLoading: true });
        let POST_CREATE_GROUPS = 'teachers/' + compo.props.user.id + '/classes/' + compo.props.user.classid + '/groups?all=false';

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
    }

    onClickAddGroup = () => {
        Popup.plugins().addGroup(this.props, this.postGroup);


    }

    onClickDeleteGroup = function () {
        let groupsToDelete
        Popup.plugins().deleteGroup(compo.state.listGrps);
    }

    render() {
        const { translate } = this.props;

        if (this.state.isLoading) {
            return (
                <div className="container">
                    <h1>{translate('group_management')}</h1>
                    <br/>
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                </div>
            )
        } else {

            return (
                <div className="container">
                    <h1>{translate('group_management')}</h1>
			<div className="card-columns">
			    {this.state.groups}
			</div>
		    <div className="btn-group btn-group-lg" role="group">
                    <button className="btn btn-primary" onClick={this.onClickAddGroup}>{translate('add_group')}</button>
                    <button className="btn btn-primary" onClick={this.onClickDeleteGroup}>{translate('delete_group')}</button>
		    </div>
                </div>
            )
        }

    }
}

Popup.registerPlugin('addGroup', function (props, callbackConfirm) {
    let _group_name = '';

    let getGroupName = function (e) {
        _group_name = e.target.value;
    };

    this.create({
        title: props.translate('add_group'),
        content: <AddGroup onChangeGroupName={getGroupName} />,
        buttons: {
            left: [{
                text: props.translate('cancel'),
                className: null, // optional
                action: function (popup) {
                    //do things
                    popup.close();
                }
            }],
            right: [{
                text: props.translate('confirm'),
                className: 'success', // optional
                action: function (popup) {
                    if (_group_name.length > 0) {
                        callbackConfirm(_group_name);
                        popup.close();
                    } else {
                        alert(props.translate('error_group_name'))
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


Popup.registerPlugin('deleteGroup', function (listGr) {
    let _group_id = '';

    let onChangeSelectGroup = function (e) {
        _group_id = e.target.value;
    }

    let callback = function () {
        let DELETE_GROUP = 'teachers/' + compo.props.user.id + '/classes/' + compo.props.user.classid + '/groups/' + _group_id;
        console.log("delete fetch: " + DELETE_GROUP)
        fetch(BACKEND_API.ROOT + DELETE_GROUP, {
            method: "DELETE",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + compo.props.user.hash,
            },
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
        });
    }

    this.create({
        title: 'Delete group',
        content: <DeleteGroup
            listGroups={listGr} onChangeSelectGroup={onChangeSelectGroup}
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
                    callback();
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


export default connect(mapStateToProps)(withTranslate(TeacherGroupManagement));
