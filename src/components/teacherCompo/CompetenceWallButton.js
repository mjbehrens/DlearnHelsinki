import React from "react";
import { Link } from 'react-router-dom';


import iconCompetenceWall from "../../res/icons/competence_wall.png";
import { ROUTES } from '../../constants.js';

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'green'
};


class CompetenceWallButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "Competence Wall",
            picture: iconCompetenceWall,
        }
    }

    onClickGrpManagment = () => {

    }

    render() {
        return (
            <div className="card">
                <Link to={ROUTES.COMPETENCE_WALL}>
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

export default CompetenceWallButton;
