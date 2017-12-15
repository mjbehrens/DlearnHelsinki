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
            data_competence: ["teachers/1/classes/2/gruops/1/students/3", "teachers/1/classes/2/gruops/2/students/2", "teachers/1/classes/2/gruops/1/students/1"],            
        };
    }

    helloWolrd = function () {
        console.log("hello")
    }

    deleteFromLog = function (id) {
        let temp = [] 
        this.state.data_competence.forEach(function(element) {
            if(element != id){
                temp.push(element)
            }
        }, this);

        this.setState({
            data_competence : temp
        })

    }



    render() {


        let parameters = [{
            name: "student 8 - hlqejqe",
            teachers: this.props.user.id,
            students: 8,
            classes: 1,
            groups: null,
            surveys: 27,
        },
        {
            name: "1 - class",
            teachers: this.props.user.id,
            students: null,
            classes: 1,
            groups: null,
            surveys: 27,
        }
        ]

        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog myFunction={this.helloWolrd} data_competence={this.state.data_competence} functionDelete={this.deleteFromLog.bind(this)}/></div>
                    <div className="col-sm-9"><SpiderGraph2 parameters={parameters} name="toto" color="black" /></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceRender);
