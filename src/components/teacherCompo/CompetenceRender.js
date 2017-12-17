import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompetenceWallLog from './CompetenceWallLog.js';
import SpiderGraph2 from '../shared/SpiderGraph2.js';

function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,

    }
}

class CompetenceRender extends Component {

    constructor(props) {

        super(props);
        this.state = {
            data_competence: []

        };
    }

    helloWolrd = function () {
        console.log("hello")
    }

    deleteFromLog = function (request) {
        let temp = []
        this.state.data_competence.forEach(function (element) {
            if (element.request != request) {
                temp.push(element)
            }
        }, this);

        this.setState({
            data_competence: temp
        })
    }

    getRequest = function (element) {
        let s = "";
        if (element.class_id != -1) {
            s += 'classes/' + element.class_id + '/class_averages'
        }
        if (element.group_id != -1) {
            s = ""
            s += 'classes/' + element.class_id + '/group_averages?group_id=' + element.group_id
        }
        /*if (element.student_id != -1) {
            s += 'students/' + element.student_id + ''
        }*/


        // Because of some reactjs property, the render of spidergraph2 won't
        // update if the insteance of data_competence is not change.
        // so we have to create a entier new array that is not a reference of data_competence
        // in order to have in update 
        // ref : https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/component_will_receive_props.html 
        if (s != "") {
            let temp = []
            this.state.data_competence.forEach(function (element) {
                    temp.push(element)
            }, this);
            
            temp.push({
                name: "test" + this.state.data_competence.length,
                request: 'teachers/' + this.props.user.id + '/' + s,
            });
            this.setState({
                data_competence: temp
            })
        }
       
    }



    render() {
        console.log(this.state.data_competence)
        return (
            <div className="container">
                <div className="row">
                    <div className="left-align col-sm-3"><CompetenceWallLog data_competence={this.state.data_competence} functionDelete={this.deleteFromLog.bind(this)} getRequest={this.getRequest.bind(this)} data={this.props.data} /></div>
                    <div className="col-sm-9"><SpiderGraph2 parameters={this.state.data_competence} name="competence wall" /></div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CompetenceRender);
