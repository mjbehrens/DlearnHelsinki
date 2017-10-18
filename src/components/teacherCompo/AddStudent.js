import React from "react";

class AddStudent extends React.Component {

    constructor(props) {
        super(props);
        console.log('constructor of Add student.js')
    }

    render() {
    console.log('test');
        return (
            <div>
                <h6>Username:</h6><input ></input>
                <h6>Gender:</h6>
                <select>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <h6>Age:</h6><input></input>
                <h6>Password:</h6><input></input>
                <h6>Please, the password must be given to the student</h6>
            </div>
        )
    }
}


export default AddStudent;