import React from "react";
import TeacherGroupManagement from "../../pages/TeacherGroupManagement";

class CompetenceWallLog extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item active">Log</li>
                    <li className="list-group-item">
                        Student 1 &nbsp;
                        <input class="form-check-input" type="checkbox" value="" />
                    </li>
                    <li className="list-group-item">
                        Student 2 &nbsp;
                        <input class="form-check-input" type="checkbox" value="" />
                    </li>
                    <li className="list-group-item">
                        Student 3 &nbsp;
                        <input class="form-check-input" type="checkbox" value=""/>
                    </li>
                    <li className="list-group-item">
                        Student 4 &nbsp;
                        <input class="form-check-input" type="checkbox" value=""/>
                    </li>
                    <button className="btn btn-primary">Add stuff</button>
                </ul>
            </div>
        )
    }
}


export default CompetenceWallLog;