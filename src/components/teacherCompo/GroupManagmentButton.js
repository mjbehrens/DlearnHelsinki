import React from "react";
import { Link } from 'react-router-dom';


import iconGrpManagment from "../../res/icons/manage_groups.svg";

const style = { padding: 50,
                margin: 50, 
                textAlign : 'center',
                background : 'green' };


class GroupManagmentButon extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text : "Group Managment",
            picture : iconGrpManagment,
        }
    }

    onClickGrpManagment = () => {
       
    }

    render(){
        return (
<div className="card">
            <Link to = "">
		<img className="card-img-top teacher-card-img" src={this.state.picture} width="100" height="100"
	    onClick={this.onClickSurvey}
	    alt="survey icon" />
    <div className="card-body">
		<h4 className="card-title">{this.state.text}</h4>
    </div>
            </Link>
  </div>
        )
    }

}

export default GroupManagmentButon;
