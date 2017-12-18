import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";


let select_value = null;

class DeleteGroup extends React.Component {

    constructor(props) {
        super(props);
        select_value = null;
    }

    createSelect = function(){
        let lst = this.props.listGroups;
        let options = [];
        if (lst != null) {
            options.push(<option value={-1}> {"select a group..."} </option>);
            lst.forEach(function (g) {
                if (g.groupsLength === 0) {
                    options.push(<option value={g.groupId}> {g.groupName}</option>)
                }
            })
        }



        return (
            <select defaultValue={select_value} onChange={this.props.onChangeSelectGroup}>
                {options}
            </select>
        )
    }

    //onChangeSelectGroup = function (e) {

    //}




    render() {

        return (
            <div>
                <label>
                    Delete a group:
                    {this.createSelect()}
                </label>
            </div>
        )
    }
}


export default DeleteGroup;