import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";

class AddGroup extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <h6>Name:</h6><input type="text" placeholder={"group name"}
                    onChange={this.props.onChangeGroupName} />
            </div>
        )
    }
}


export default AddGroup;