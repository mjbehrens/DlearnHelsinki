import React, { Component } from 'react';

import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import Slider, { Range } from 'rc-slider';
import {Redirect} from 'react-router'
import 'rc-slider/assets/index.css';


const style = { width: 600, margin: 50, textAlign : 'center' };

function log(value) {
    console.log(value); //eslint-disable-line
  }

class StudentSurveyQuestion extends Component {

    constructor(props){
        super(props);
        this.state = {
            buttonValue : 'Next',
            redirect : false,
            index : 0,
            questions : [],
            currentQuestion : "",
            startPoint : 3
        }
    }
     

    componentDidMount(){
        this.setState({...this.state.currentQuestion = this.getQuestions()[this.state.index]}) 
    }

    
    getQuestions = function () {
        // do the REST code here to GET questions
        return ["I presented my own viewpoints in the group",
                "I listening other's opinions", 
                "I argued my own perspective in group discussions",
                "I tried to understand others ideas",
                "I gave feedback of the developments for others",
                "I participated actively to the groupework",
                "I took enought responsibility of the groupwork",
                "I helped others in the challenges of the groupwork",
                "I received useful feedback in the group to continue the work",
                "I focused completely on doing the groupwork",
                "I took others ideas into account in the groupwork",
                "Everyone participated equally in the groupwork",
                "I worked with others who could help",
                "I encouraged our group in doing the collaborative task"]
    }
    
    onSliderChange = (value) => {
        this.setState({
          ...this.state.startPoint = value,
        });
      }

      onAfterChange = (value) => {
      
    }

    onClickNext = () =>{
              
        if (this.state.index < this.getQuestions().length){
            this.state.index =  this.state.index + 1;
            this.setState({...this.state,
                            currentQuestion : this.getQuestions()[this.state.index]});      
            //for the last click on the button
            if(this.state.index == this.getQuestions().length){
                this.setState({... this.state,
                        buttonValue : 'Quit',
                        currentQuestion : 'You have finished the survey'});
            }
        }else{
            this.setState({...this.state.redirect = true})
        }

    }

    render() {

        if(this.state.redirect){
            return <Redirect to="/student-dashboard"/>
        }else{
            return (
                <div style={style}>
                  <Header />
    
                    <p> { this.state.currentQuestion } </p>
                    <Slider min={1} max={5} dots={true} 
                            value={this.state.startPoint} 
                            onChange={this.onSliderChange}
                            onAfterChange={this.onAfterChange}/>
                    
                    <span>{ this.state.startPoint }/5 </span>
                    <button type="button" 
                            className="btn btn-primary"
                            onClick={this.onClickNext}>{ this.state.buttonValue }</button>
                  
                  <Footer />
                </div>
              );
        }

    }
}

export default StudentSurveyQuestion;
