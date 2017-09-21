import React, { Component } from 'react';

import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class StudentSurveyQuestion extends Component {

    constructor(props){
        super(props);
        this.state = {
            index : 0,
            questions : [],
            currentQuestion : ""
        }
    }

    componentDidMount(){
        this.questions = getQuestions();
        this.index = 0;
        this.setState({...this.state,
            this.state.currentQuestion : this.questions}) 
    }

    getQuestions = function () {
        // do the REST code here to GET questions
        return ["I presented my own viewpoints in the group",
                 "I listening other's opinions", 
                 "I argued my own perspective in group discussions"]
    }

    render() {


        var question = "";
        var questions = [];
        questions = this.getQuestions();

        return (
            <div className="text-center">
              <Header />
              <h1>Welcome Tobi!</h1>
               
                <p> { this.question } </p>
                <Slider min={1} max={5} defaultValue={2} />
                <button type="button" className="btn btn-primary">NEXT</button>

              <Footer />
            </div>
          );

    }
}

export default StudentSurveyQuestion;
