import React from "react";

class InfoStudent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Name: {this.props.title}</h6>
                <h6>Gender: {this.props.gender}</h6>
                <h6>Age: {this.props.age}</h6>
                <h6>Password:</h6><input></input><button>Reset password</button>
            </div>
        )
    }
}

export default InfoStudent;