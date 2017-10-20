import React from "react";
import Popup from 'react-popup';
import Spinner from 'react-spinner';

// Popup form
import SurveyCreationForm from './SurveyCreationForm.js'

// icons for the page
import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/close_survey.svg";

import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}


let GET_SURVEYS = '';
let POST_SURVEY = '';
let POST_CLOSE_SURVEY = '';

var surveys = [];
var compo = null;

class OpenSurveyButton extends React.Component {

    constructor(props) {
        super(props);
        compo = this;
        surveys = [];

        this.state = {
            isLoading: true,
            disable: true,
            text: "Open Survey",
            picture: iconSurveyOpen,
            teacherID: this.props.user.id,
            classID: this.props.user.classid,     
            survey: this.props.survey,
        }

        this.buildRequestRest();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        console.log(compo.state.survey);
        console.log(nextProps.survey);

        if ((compo.state.survey.open !== nextProps.survey.open)) {
            compo.updateState(nextProps.survey);
        }


    }


    buildRequestRest = function () {

        POST_SURVEY = 'teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';
        POST_CLOSE_SURVEY = 'teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';

    }

    // call for update the state with the survey
    updateState = (s) => {

        if (s.open !== null) {
            //if a survey is open
            if (s.open) {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    picture: iconSurveyClose,
                    text: "Close Survey",
                    survey: {
                        _id: s._id,
                        title: s.title,
                        description: s.description,
                        open: s.open,
                        start_date: s.start_date,
                    }
                });
                //else if they are all closed
            } else {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    picture: iconSurveyOpen,
                    text: "Open Survey",
                    survey: {
                        _id: s._id,
                        title: s.title,
                        description: s.description,
                        open: s.open,
                        start_date: s.start_date,
                    }
                });
            }
        }
    }


    // send a request to the database to open a new survey
    // get the info of the new survey
    requestToOpenSurveyREST = (t, d, ts) => {

        compo.setState({ isLoading: true });
        var data = JSON.stringify({
            title: t,
            description: d,
            theme_ids : ts,
        });
        console.log(data);

        fetch(BACKEND_API.ROOT + POST_SURVEY, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.props.user.hash,
            },
            body: data
            //TODO !
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    compo.props.callback();
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    requestToCloseSurveyREST = (t, d) => {

        compo.setState({ isLoading: true });

        fetch(BACKEND_API.ROOT + POST_CLOSE_SURVEY + '/' + compo.state.survey._id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.props.user.hash,
            },
            //TODO !
        }).then(function (response) {
            if (response.ok) {
                compo.props.callback();
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    // executed when the user click on the survey button
    onClickSurvey = () => {
        // open a new suvey
        console.log(this.state.survey);
        if (this.state.survey.open === false) {
            Popup.plugins().createSurveyForm(this.requestToOpenSurveyREST);

        } else {
            //close the previously opened survey
            if (this.state.survey.open === true) {
                console.log('Survey Close');
                // do the fetch for close

                Popup.create({
                    title: "Closing the current survey",
                    content: 'You are about to close the survey. \n\
                    The students will no longer be able to answer this survey after that. \n\
                    Do you really want to close the survey \"' + compo.state.survey.title + '\" (from ' + compo.state.survey.start_date + ') ?',
                    buttons: {
                        left: [{
                            text: 'Cancel',
                            className: 'danger',
                            action: function () {
                                /** Close this popup. Close will always close the current visible one, if one is visible */
                                Popup.close();
                            }
                        }],
                        right: [{
                            text: 'Confirm',
                            className: 'success',
                            action: function () {
                                compo.requestToCloseSurveyREST();
                                Popup.close();
                            }
                        }]
                    }
                });
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className="card">
                    <div className="spinner-container">
                        <Spinner />
                    </div >

                </div>
            )

        } else {
            return (
                <div className="card" onClick={this.onClickSurvey} >
                    <img className="card-img-top teacher-card-img"
                        src={this.state.picture}
                        width="100" height="100"
                        alt="survey icon" />
                    <div className="card-body">
                        <h4 className="card-title">{this.state.text}</h4>
                    </div>
                </div>
            )
        }
    }
}


/** Survey Form plugin */
// create a popup when the user want to open a new survey
Popup.registerPlugin('createSurveyForm', function (callbackConfirm) {
    let _title = "";
    let _description = "";
    let _theme_ids = [];

    let getTitle = function (e) {
        _title = e.target.value;
    };

    let getDescription = function (e) {
        _description = e.target.value;
    };

    let getThemes = function (e) {

        // function to remove item
        function removeItem(array, item) {
            for (var i in array) {
                if (array[i] == item) {
                    array.splice(i, 1);
                    break;
                }
            }
        }
        let box = e.target;

        if (box.checked) {
            _theme_ids.push(box.value);
        } else if (box.checked == false) {
            removeItem(_theme_ids, box.value);
        }
        console.log(_theme_ids);
    }

    this.create({
        title: 'Creation of a new Survey',
        content: <SurveyCreationForm
            onChangeTitle={getTitle}
            onChangeDescription={getDescription}
            onChangeThemes={getThemes}
            title={"New Survey"}
            description={"new survey for today\'s exercices"} />,
        buttons: {
            left: [{
                text: 'Cancel',
                className: 'danger', // optional
                action: function (popup) {
                    popup.close();
                }
            }],
            right: [{
                text: 'Create',
                className: 'success', // optional
                action: function (popup) {
                    console.log(_title);
                    console.log(_description);
                    if ((_theme_ids.length > 0)
                        && (_title.length !== 0)
                        && (_description.length !== 0)) {
                        //TODO : add the _theme_ids to the callback function 
                        callbackConfirm(_title, _description, _theme_ids);
                        popup.close();
                    } else { // popup if information are missing
                        alert("Make sure every information has been filled before creating the survey.")
                    }


                }
            }]
        },
        className: null, // or string
        noOverlay: true, // hide overlay layer (default is false, overlay visible)
        position: { x: 0, y: 0 }, // or a function, more on this further down
        closeOnOutsideClick: false, // Should a click outside the popup close it? (default is closeOnOutsideClick property on the component)
    });
});



export default connect(mapStateToProps)(OpenSurveyButton);
