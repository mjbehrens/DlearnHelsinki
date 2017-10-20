import React from "react";

class AddStudent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Username:</h6><input type="text" placeholder={this.props.username}
                    onChange={this.props.onChangeUsername} />
                <h6>Gender:</h6>
                <select onChange={this.props.onChangeGender}>
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <h6>Age:</h6><input type="number" min={1} max={99} placeholder={this.props.age}
                    onChange={this.props.onChangeAge} />
                <h6>Password:</h6><input type="text" placeholder={this.props.password}
                    onChange={this.props.onChangePassword} />
                <h6>Please, the password must be given to the student</h6>
            </div>
        )
    }
}


export default AddStudent;