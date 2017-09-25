import React from "react";
import iconSurveyOpen from "../../res/icons/survey.svg";
import iconSurveyClose from "../../res/icons/history.svg";

const style = { padding: 50,
                margin: 50, 
                textAlign : 'center',
                background : 'yellow' };


class OpenSurvey extends React.Component {

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
        var pic= this.state.open? this.state.iconOpen : this.state.iconClose
        return (
        <div style={style} >
            <img 
                src={ this.state.picture } width="100" height="100"
                onClick= {this.onClickSurvey}  //updateFilter is wierd name
            />
            <h3 >{this.state.text}</h3>
        </div>
        )
    }

   /* render(){

        return(
            <div>
                <button type="button" 
                        className="btn btn-primary"
                        onClick={this.onClickSurvey}>{this.state.text }</button>
            </div>

            
        );

    }*/


}

export default OpenSurvey;