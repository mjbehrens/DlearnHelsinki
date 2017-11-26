import React from "react";
import { Link } from 'react-router-dom';


import iconGrpManagment from "../../res/icons/manage_groups.svg";

import StudentProfile from './StudentProfile.js';

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'green'
};


class StudentProfileButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Profile",
            picture: iconGrpManagment,
        }
    }

    onClickGrpManagment = () => {

    }

    render() {
        return (
            <div className="card w-100">
                    <img className="card-img-top teacher-card-img" src={this.state.picture} width="100" height="100"
                        onClick={<StudentProfile />}
                        alt="survey icon" />
                    <div className="card-body">
                        <h4 className="card-title">{this.state.text}</h4>
                    </div>
            </div>
        )
    }

}

export default StudentProfileButton;
