import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";
import SpiderGraph from "../shared/SpiderGraph";

class InfoStudent extends React.Component {

    constructor(props) {
        super(props);
    }
    resetPassword = function () {
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
        console.log('Reset password');
    }

    changeGroup = function () {
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
        console.log('Change group');
    }

    createSelect = function(){
        let lst = this.props.listGroups;
        let options = [];
        if(lst != null){
            lst.forEach(function(g){
                options.push(<option value={g.groupId}> {g.groupName}</option>)
            })
        }
        return (
            <select value="groups">
                {options}
            </select>
        )
    }

    render() {

        //requires for spiderGraph
        let parameters = {
            teachers: 1, // need to be change
            students: null,
            classes: 1, // need to be change
            groups: null,
            surveys: 27, // need to be change
        }

        return (
            <div>
                <h6>Name: {this.props.title}</h6>
                <h6>Gender: {this.props.gender}</h6>
                <h6>Age: {this.props.age}</h6>
                    <label>
                        Change group:
                        {this.createSelect()}
                        {console.log('test')}
                    </label>
                <button onClick={this.changeGroup}>Change group</button>
                    <input type="submit" value="Submit" />
                <h6>Password:</h6><input></input><button onClick={this.resetPassword}>Reset password</button>
                <SpiderGraph name={this.props.title} parameters={parameters}/>
            </div>
        )
    }
}


export default InfoStudent;