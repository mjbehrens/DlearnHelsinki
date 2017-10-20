import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import LinearGraph from "../shared/LinearGraph";
import Spinner from 'react-spinner';

import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

var compo = null;
let new_password = '';
let select_value = null;

class InfoStudent extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        new_password = '';
        select_value = null;
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount(){
        this.setState();
    }

    onClickResetPassword = function (studentId, compo) {

        if (new_password.length > 5) {
            compo.setState({isLoading:true});
            
            let POST_RESET_PASSWORD = 'teachers/' + compo.props.user.id + '/change_student_password';

            let data = JSON.stringify({
                "student_id": studentId,
                "password": new_password
            });

            fetch(BACKEND_API.ROOT + POST_RESET_PASSWORD, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + compo.props.user.hash
                },
                body: data
            }).then(function (response) {
                if (response.ok) {
                    alert('Password change with success. New password = \"' + new_password + '\"  (press \'Quit\' to see the changes).');
                } else {
                    console.log('Network response was not ok.');
                    alert('Problem while updating password.')
                }
                compo.setState({isLoading:false});
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });
        }
        else {
            alert('Please make sure that the password is more than 5 letters long.')
        }
    }

    onClickChangeGroup = function (studentId, compo) {

        if (select_value !== null) {
            compo.setState({isLoading:true});
            let POST_CHANGE_GROUP = 'teachers/' + compo.props.user.id + '/classes/' + compo.props.user.classid + '/students/' + studentId + '/move_to_group/' + select_value;

            fetch(BACKEND_API.ROOT + POST_CHANGE_GROUP, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + compo.props.user.hash
                },
            }).then(function (response) {
                if (response.ok) {
                    alert('The group\'s student has been change ! (press \'Quit\' to see the changes)');
                } else {
                    console.log('Network response was not ok.');
                    alert('Problem while modifing the group...')
                }
                compo.setState({isLoading:false});
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });
        }
        else {
            alert('Please make sure we have select a group first.')
        }
    }

    createSelect = function () {
        let lst = this.props.listGroups;
        let options = [];
        if (lst != null) {
            options.push(<option value={null}> {"default"} </option>);
            lst.forEach(function (g) {
                options.push(<option value={g.groupId}> {g.groupName} </option>)
            });
        }
        return (
            <select defaultValue={this.state.select_value} onChange={this.onChangeSelect}>
                {options}
            </select>
        )
    }

    onChangeSelect = function (e) {
        select_value = e.target.value;
        console.log(select_value);
    }

    onChangePassword = function (e) {
        let pwd = e.target.value;
        if (pwd.length > 0) {
            new_password = pwd;
        }
    }

    render() {

        //requires for linearGraph
        /*let parameters = {
            teachers: this.props.user.id, // need to be change
            students: this.props.studentId,
            classes: this.props.user.classid, // need to be change
            groups: null,
            progression: 10, // need to be change
        }*/

        if (this.state.isLoading) {
            return (
                <div className="spinner-container">
                    <Spinner />
                </div>
            )
        }
        else {
            return (
                <div>
                    <h6>Name: {this.props.title}</h6>
                    <h6>Gender: {this.props.gender}</h6>
                    <h6>Age: {this.props.age}</h6>
                    <h6>Change group:</h6>
                        {this.createSelect()}
                    <button onClick={this.onClickChangeGroup.bind(this, this.props.studentId, this)}>Change group</button>
                    <h6>Password:</h6><input type="text" onChange={this.onChangePassword}></input><button onClick={this.onClickResetPassword.bind(this, this.props.studentId, this)}>Reset password</button>
                    {
                        /*<br />
                        <div>
                            <LinearGraph name={this.props.title} parameters={parameters} />
        
                        </div>
                        */
                    }
                </div>
            )
        }
    }
}


export default connect(mapStateToProps)(InfoStudent);
