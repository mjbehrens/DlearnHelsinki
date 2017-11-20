import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import LinearGraph from "../shared/LinearGraph";
import Spinner from 'react-spinner';
import { withTranslate } from 'react-redux-multilingual';

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
        this.props.onChangesToApply(true);
        const {translate} = this.props;
        new_password = '';
        select_value = null;
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount(){
        this.setState();
        compo.props.onChangesToApply(false);

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
                    alert(this.props.translate('alert_password_ok',  {password: new_password }))
                } else {
                    console.log('Network response was not ok.');
                    alert(this.props.translate('error_update_password'))
                }
                compo.setState({isLoading:false});
            }).catch(function (err) {
                // Error :(
                console.log(err);
            });
        }
        else {
            alert(this.props.translate('error_too_short'))
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
                    compo.props.onChangesToApply(true);

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
                    <h6>Name: {this.props.username}</h6>
                    <h6>Gender: {this.props.gender}</h6>
                    <h6>Age: {this.props.age}</h6>
                    <h6>Change group:</h6>
                        {this.createSelect()}
                    <button onClick={this.onClickChangeGroup.bind(this, this.props.studentId, this)}>Change group</button>
                    <h6>Password:</h6><input type="text" onChange={this.onChangePassword}></input><button onClick={this.onClickResetPassword.bind(this, this.props.studentId, this)}>Reset password</button>
                    {
                        /*<br />
                        <div>
                            <LinearGraph name={this.props.username} parameters={parameters} />

                        </div>
                        */
                    }
                </div>
            )
        }
    }
}


export default connect(mapStateToProps)(withTranslate(InfoStudent));
