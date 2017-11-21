import React from "react";
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import iconGrpManagment from "../../res/icons/manage_groups.svg";

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'green'
};


class GroupManagmentButon extends React.Component {

    constructor(props) {
        super(props);
        const { translate } = this.props;
        this.state = {
            text: this.props.translate('group_management'),
            picture: iconGrpManagment,
        }
    }

    onClickGrpManagment = () => {

    }

    render() {
        return (
            <div className="card">
                <Link to="/groups-management">
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

export default withTranslate(GroupManagmentButon);
