import React from "react";
import { Link } from 'react-router-dom';

import iconHistory from "../../res/icons/history.svg";

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'orange'
};


class HistoryButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "History",
            picture: iconHistory,
        }
    }

    onClickHistory = () => {

    }

    render() {
        return (

            <Link to = "">
                <div style={style} className={this.props.className}>
                    <img
                        src={this.state.picture} width="100" height="100"
                        onClick={this.onClickHistory} 
                    />
                    <h3 >{this.state.text}</h3>
                </div>
            </Link>



        )
    }

}

export default HistoryButton;