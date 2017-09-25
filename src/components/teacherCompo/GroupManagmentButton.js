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
            <Link to = "">
                <div style={style} className={this.props.className}>
                    <img
                        src={this.state.picture} width="100" height="100"
                        onClick={this.onClickGrpManagment}  //updateFilter is wierd name
                    />
                    <h3>{this.state.text}</h3>
                </div>
            </Link>
        )
    }

}

export default GroupManagmentButon;