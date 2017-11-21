import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';

import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}


const style = {
    marginLeft: "100px",
    marginRight: "100px",
    border: "2px solid black",
    borderColor: "black"
};

const styleButton = {
    marginLeft: "15px",
    marginTop: "15px"
}

var GET_GROUPS = '';

//Get unique groups for the teacher from the database
var compo;

class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);
        compo = this;

        let classroom = compo.props.classes.filter(function (c) {
            return c._id === compo.props.user.classid;
        });

        this.state = {
            class_name: classroom[0].name,
            buttonList: compo.createGroupButtons(classroom[0].groups),
            group_id: null,
            group_name: classroom[0].name,
            survey: this.props.survey,
        };
        const { translate } = this.props;
    }

    createGroupButtons = function (groups) {
        var buttonList = [];
        groups.forEach(function (element) {
            buttonList.push(
                <button key={element._id}
                    onClick={compo.onClickGroupButton()}
                    type="button"
                    className="btn btn-primary"
                    value={element._id}>
                    {element.name}
                </button>)
        });

        return buttonList;
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {

        if (compo.state.survey != nextProps.survey) {
            compo.setState({survey: nextProps.survey});
        }
    }

    onClickGroupButton = () => (e) => {
        e.preventDefault();
        compo.setState({
            group_id: e.target.value,
            group_name: e.target.innerText
        });
    }

    onClickClassButton = () => {
        //e.preventDefault();
        compo.setState({
            group_id: null,
            group_name: this.state.class_name,
        });
    }

    render() {

        console.log(this.state)

        if (compo.state.survey == null) {
            return (
                <div className="container">
                </div>
            );
        }
        else {
          
          //requires for spiderGraph
          let parameters = {
              teachers: this.props.user.id,
              students: null,
              classes: this.props.user.classid,
              groups: compo.state.group_id,
              surveys: compo.state.survey._id,
            }

            return (
                <div className="container">
                    <div className="jumbotron">
                        <div className="text-left">
                            <div className="row">
                                <div className="col-sm-3" style={styleButton}>
                                    <div className="btn-group-vertical">
                                        {compo.state.buttonList}
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.onClickClassButton.bind(this)}>
                                            {this.state.class_name}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <h6> {this.props.translate('survey_results', {title: compo.state.survey.title})}</h6>
                                    <SpiderGraph name={this.state.group_name} parameters={parameters} color={this.state.group_name} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }

    }

}

export default connect(mapStateToProps)(withTranslate(HeadbandsLastResults));
