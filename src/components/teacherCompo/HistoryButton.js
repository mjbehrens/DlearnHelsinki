import React from "react";
import { Link } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

import iconHistory from "../../res/icons/history.svg";
import { ROUTES } from '../../constants.js';

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'orange'
};


class HistoryButton extends React.Component {

    constructor(props) {
        super(props);
        const { translate } = this.props;
        this.state = {
            text: this.props.translate('history'),
            picture: iconHistory,
        }
    }

    onClickHistory = (e) => {

    }

    render() {
        return (


            <div className="card">
                <Link to={ROUTES.HISTORY}>
                    <img className="card-img-top teacher-card-img" src={this.state.picture} width="100" height="100"
                        onClick={this.onClickHistory}
                        alt="survey icon" />
                    <div className="card-body">
                        <h4 className="card-title">{this.state.text}</h4>
                    </div>
                </Link>
            </div>



        )
    }

}

export default withTranslate(HistoryButton);
