import React from "react";
import Popup from 'react-popup';
import Spinner from 'react-spinner';

// Popup form
import SurveyCreationForm from './SurveyCreationForm.js'

// icons for the page
import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/close_survey.svg";


const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';
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
            teacherID: 1,
            classID: 1,
            survey: {
                _id: null,
                open: false,
                title: null,
                description: null,
                start_date: null,
            }
        }

        this.buildRequestRest();
        this.getAllSurveyREST();
    }


    buildRequestRest = function () {

        GET_SURVEYS = '/teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';
        POST_SURVEY = '/teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';
        POST_CLOSE_SURVEY = '/teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';

    }

    // call for update the state with the survey
    updateState = (s) => {
        //if a survey is open
        if (s.open) {
            this.setState({
                ...this.state,
                isLoading : false,
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
                isLoading : false,
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

    // Get all the survey from one class
    getAllSurveyREST = function () {
        compo.setState({isLoading: true});

        fetch(ORIGIN + GET_SURVEYS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa('teacher:password') // This needs to be changed in the final version...
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {                    
                    surveys = data;
                    console.log(surveys);
                    // TODO : check if a survey is open
                    compo.checkIfSurveyOpen();
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    // check if a survey is currently open 
    checkIfSurveyOpen = function () {

        let noSurveyOpen = true;
        surveys.forEach(function (s) {
            console.log(s);
            if (s.open) {
                noSurveyOpen = false;
                console.log('is open');
                this.updateState(s);
            }
        }, this);

        // if no survey open then do nothing.
        if (noSurveyOpen) {
            compo.updateState({
                _id: null,
                open: false,
                title: null,
                description: null,
                start_date: null,
            });
        }

    }

    // send a request to the database to open a new survey
    // get the info of the new survey
    requestOpenSurveyREST = (t, d) => {
        compo.setState({isLoading : true});

        var data = JSON.stringify({
            title: t,
            description: d,
        });
        console.log(data);

        fetch(ORIGIN + POST_SURVEY, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('teacher:password')
            },
            body: data
            //TODO !
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    compo.updateState(data)
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    requestCloseSurveyREST = (t, d) => {

        fetch(ORIGIN + POST_CLOSE_SURVEY + '/' + compo.state.survey._id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('teacher:password')
            },
            //TODO !
        }).then(function (response) {
            if (response.ok) {
                console.log('HAS BEEN CLOSED');
                compo.getAllSurveyREST();
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
            Popup.plugins().createSurveyForm(this.requestOpenSurveyREST);

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
                                compo.requestCloseSurveyREST();
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
    let _themes = [];

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
            _themes.push(box.value);
        } else if (box.checked == false) {
            removeItem(_themes, box.value);
        }
        console.log(_themes);
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
                    if ((_themes.length > 0)
                        && (_title.length !== 0)
                        && (_description.length !== 0)) {
                        //TODO : add the _themes to the callback function 
                        callbackConfirm(_title, _description);
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



export default OpenSurveyButton;
