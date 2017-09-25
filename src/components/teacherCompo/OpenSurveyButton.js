import React from "react";
import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/history.svg";

const style = { padding: 50,
                margin: 50, 
                textAlign : 'center',
                background : 'yellow' };


class OpenSurveyButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open : true,
            text : "Open Survey",
            picture : iconSurveyOpen,
        }
    }

    onClickSurvey = () => {
        // open a new suvey
        if(this.state.open === true ){
            console.log('Survey open');
            this.setState({...this.state,
                            open : false,
                            picture : iconSurveyOpen,
                            text : "close survey"});
        }else{
            //close the previously opened survey
            if(this.state.open === false) {
                console.log('Survey close');
                this.setState({...this.state,
                                open : true,
                                picture : iconSurveyOpen, 
                                text : "open survey"});
            }
        }
    }

    render(){
        return (
        <div style={style} className = {this.props.className}>
            <img 
                src={ this.state.picture } width="100" height="100"
                onClick= {this.onClickSurvey}  
            />
            <h3 >{this.state.text}</h3>
        </div>
        )
    }
}

export default OpenSurveyButton;