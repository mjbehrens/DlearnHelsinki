import React from "react";
import jquery from 'jquery';
import jQuery from 'jquery';
import Popup from 'react-popup';
import Spinner from 'react-spinner';
import { withTranslate } from 'react-redux-multilingual';

// Popup form
import SurveyCreationForm from './SurveyCreationForm.js'

// icons for the page
import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/close_survey.svg";

import { connect } from 'react-redux';
import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import * as modalActions from '../../actions/modalActions';


function mapStateToProps(store) {
    return {
        user: store.user.user,
	modal: store.modal,
    }
}


let GET_SURVEYS = '';
let POST_SURVEY = '';
let POST_CLOSE_SURVEY = '';

var surveys = [];

class OpenSurveyButton extends React.Component {

    constructor(props) {
        super(props);
        const { translate } = this.props;
        surveys = [];

        this.state = {
            isLoading: true,
            disable: true,
            text: this.props.translate('create_survey'),
            picture: iconSurveyOpen,
            teacherID: this.props.user.id,
            classID: this.props.user.classid,
            survey: this.props.survey,
	    modalProps: null,
	    titleInput: "",
	    descriptionInput: "",
	    themesIdInput: [],
        }

        this.buildRequestRest();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {

        if ((this.state.survey.open !== nextProps.survey.open)) {
            this.updateState(nextProps.survey);
        }
    }


    buildRequestRest = () => {

        POST_SURVEY = 'teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';
        POST_CLOSE_SURVEY = 'teachers/' + this.state.teacherID + '/classes/' + this.state.classID + '/surveys';
    }

    // Call for updating the state with the survey
    updateState = (survey) => {

        if (survey.open !== null) {
	    let picture = null
	    let text = null

            if (survey.open) {
		picture = iconSurveyClose
		text = this.props.translate('close_survey')
            } else {
		picture = iconSurveyOpen
		text = this.props.translate('create_survey')
            }
	    this.setState({
		...this.state,
		isLoading: false,
		picture: picture,
		text: text,
		survey: {
		    _id: survey._id,
		    title: survey.title,
		    description: survey.description,
		    open: survey.open,
		    start_date: survey.start_date,
		}
	    });
        }
    }


    // Send a request to the database to open a new survey
    // Get the info of the new survey
    requestToOpenSurvey = (title, desc, themeIds) => {

        this.setState({...this.state, isLoading: true });
        var data = JSON.stringify({
            title: title,
            description: desc,
            theme_ids : themeIds,
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
        }).then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    this.props.callback();
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch((err) => {
            // Error
            console.log(err);
        });
    }

    requestToCloseSurvey = () => {

        this.setState({...this.state, isLoading: true });

        fetch(BACKEND_API.ROOT + POST_CLOSE_SURVEY + '/' + this.state.survey._id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.props.user.hash,
            },
            //TODO !
        }).then((response) => {
            if (response.ok) {
                this.props.callback();
            } else {
                console.log('Network response was not ok.');
            }
        }).catch((err) => {
            // Error
            console.log(err);
        });
    }

    // executed when the user click on the survey button
    onClickSurvey = () => {
        // open a new suvey
        if (!this.state.survey.open) {
	    // Popup.plugins().createSurveyForm(this.requestToOpenSurvey);

	    let getTitle = (e) => {
		this.setState({
		    ...this.state,
		    titleInput: e.target.value,
		}, checkCreateButtonState)
	    };

	    let getDescription = (e) => {
		this.setState({
		    ...this.state,
		    descriptionInput: e.target.value,
		}, checkCreateButtonState)
	    };

	    let getThemes = (e) => {
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
		let tempArray = this.state.themesIdInput.slice()

		if (box.checked) {
		    tempArray.push(box.value);
		} else if (!box.checked) {
		    removeItem(tempArray, box.value);
		}
		this.setState({
		    ...this.state,
		    themesIdInput: tempArray,
		}, checkCreateButtonState)
	    }

	    let checkCreateButtonState = () => {
		let createAllowed = false
		console.log('TITLE STATE: ' + this.state.titleInput)
		if ((this.state.themesIdInput.length > 0)
		    && (this.state.titleInput.length !== 0)
		    && (this.state.descriptionInput.length !== 0)) {
                  createAllowed = true
		}

		this.setState({
		    ...this.state,
		    modalProps: {
			...this.state.modalProps,
			title: this.state.titleInput,
			description: this.state.descriptionInput,
			theme_ids: this.state.themesIdInput,
			createButtonEnabled: createAllowed,
		    }
		}, () => this.props.dispatch(modalActions.setModal('OpenSurveyModal', this.state.modalProps)));
	    }

		this.setState({
		    ...this.state,
		    modalProps: {
			getTitle: getTitle,
			getDescription: getDescription,
			getThemes: getThemes,
			requestToOpenSurvey: this.requestToOpenSurvey,
			title: this.state.titleInput,
			description: this.state.descriptionInput,
			theme_ids: this.state.themesIdInput,
			createButtonEnabled: false,
		    }
		}, () => this.props.dispatch(modalActions.setModal('OpenSurveyModal', this.state.modalProps)))

	    this.props.dispatch(modalActions.showModal())

        } else {
            //close the previously opened survey
            if (this.state.survey.open === true) {
                console.log('Close survey...');

		this.setState({
		    ...this.state,
		    modalProps: {
		      survey: this.state.survey,
		      requestToCloseSurvey: this.requestToCloseSurvey,
		    }
		}, () => this.props.dispatch(modalActions.setModal('CloseSurveyModal', this.state.modalProps)))
		this.props.dispatch(modalActions.showModal())
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

export default connect(mapStateToProps)(withTranslate(OpenSurveyButton));
