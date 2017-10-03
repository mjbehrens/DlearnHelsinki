import React from "react";
import Popup from 'react-popup';
import SurveyCreationForm from './SurveyCreationForm.js'

import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/history.svg";

const style = {
    padding: 50,
    margin: 50,
    textAlign: 'center',
    background: 'yellow'
};


class OpenSurveyButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            text: "Open Survey",
            picture: iconSurveyOpen,
            survey: {
                title: null,
                description: null,
                date: null,
                teacherID: null,
                classID: null,
            }
        }
    }

    updateState = (t, d) => {
        this.setState({
            ...this.state,
            open: false,
            picture: iconSurveyOpen,
            text: "Close survey",
            survey: {
                title: t,
                description: d,
                date: new Date(),
                teacherID: '1',
                classID: '1'
            }
        });

        this.requestOpenSurvey();
    }

    requestOpenSurvey = () => {

        var newProcess = {
            name: this.state.survey.title,
            //WARING not group_id but class_id 
            group_id: this.state.survey.classID,
            start_data: this.state.survey.date,
            end_date: null,
            teacher_id: this.state.survey.teacherID,
        };
    
        var data = new FormData();
        data.append( "json", JSON.stringify( newProcess ) );
    
        fetch(  'teachers/'+this.state.survey.teacherID+'/surveys', {
            method: 'post',
            body: data
        });

    }

    onClickSurvey = () => {
        // open a new suvey
        if (this.state.open === true) {
            Popup.plugins().createSurveyForm(this.updateState);

        } else {
            //close the previously opened survey
            if (this.state.open === false) {
                console.log('Survey close');
                this.setState({
                    ...this.state,
                    open: true,
                    picture: iconSurveyOpen,
                    text: "Open survey"
                });
            }
        }
    }

    render() {

        return (
            <div style={style} className={this.props.className}>
                <img
                    src={this.state.picture} width="100" height="100"
                    onClick={this.onClickSurvey}
                />
                <h3 >{this.state.text}</h3>
            </div>
        )
    }
}


/** Survey Form plugin */
Popup.registerPlugin('createSurveyForm', function (callbackConfirm) {
    let _title = null;
    let _description = null;

    let getTitle = function (e) {
        _title = e.target.value;
    };

    let getDescription = function (e) {
        _description = e.target.value;
    };

    this.create({
        title: 'Creation of a new Survey',
        content: <SurveyCreationForm    onChangeTitle={getTitle} 
                                        onChangeDescription={getDescription} 
                                        title={"New Survey"} 
                                        description={"new survey for today\'s exercices"} />,
        buttons: {
            left: [{
                text: 'Cancel',
                className: 'special-btn', // optional
                action: function (popup) {
                    //do things
                    popup.close();
                }
            }],
            right: [{
                text: 'Confirm',
                className: 'success', // optional
                action: function (popup) {
                    callbackConfirm(_title, _description);
                    popup.close();
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