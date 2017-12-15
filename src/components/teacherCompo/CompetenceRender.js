import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompetenceWallLog from './CompetenceWallLog.js';
import SpiderGraph2 from '../shared/SpiderGraph2.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

class CompetenceRender extends Component {

    constructor(props) {

        super(props);
        this.state = {
            data_competence: [{
                name: "Antti",
                students: "",
                classes: "",
                groups: "",
                request: "teachers/1/classes/1/students/1/surveys/27/answers",
            },{
                name: "Jaakko",
                students: "",
                classes: "",
                groups: "",
                request: "teachers/1/classes/1/students/2/surveys/27/answers",
            },
            {
                name: "Veera",
                students: "",
                classes: "",
                groups: "",
                request: "teachers/1/classes/1/students/3/surveys/27/answers",
            }]  
        };
    }

    helloWolrd = function () {
        console.log("hello")
    }

    deleteFromLog = function (id) {
        let temp = [] 
        this.state.data_competence.forEach(function(element) {
            if(element.request != id){
                temp.push(element)
            }
        }, this);

        this.setState({
            data_competence : temp
        })

    }



    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog data_competence={this.state.data_competence} functionDelete={this.deleteFromLog.bind(this)}/></div>
                    <div className="col-sm-9"><SpiderGraph2 parameters={this.state.data_competence} name="toto" color="black" /></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceRender);
