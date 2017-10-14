import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js'

const buttonStyle = {
    margin: '5px'
}


const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';
var GET_GROUPS = '';

var groups = [];

class GraphRenderer extends Component {

    constructor(props) {
        super(props);
        groups = [];
        this.state = {
            graphs: []
        }
    }
    
    buildRequestREST = function() {
        var s = '';
        // Build request here
        // teachers/{teacher_id}/classes/{class_id}/groups/
        
        s = s + '/teachers/1/classes/1/groups'; // Warning! Hard coded for testing purposes. 
        
        GET_GROUPS = s;
    }
    
    getGroupsREST = function() {
        console.log(ORIGIN + GET_GROUPS);
        fetch(ORIGIN + GET_GROUPS, {
            method: "GET",
            headers: {
		'Access-Control-Allow-Origin': '*',
		'Authorization': 'Basic ' + btoa('teacher:password') // This needs to be changed in the final version...
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(data => {
                                    groups = data;
				});
            }else {
		console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
	});
    }
    
    componentDidMount() {
        this.buildRequestREST();
        this.getGroupsREST();
    }
        
    
    loadClassGraphs = function() { 
        let compo = this;

        let spiderGraphs = [];
        spiderGraphs.push(<SpiderGraph name="Class name" parameters={{
            teachers: 1,
            students: null,
            classes: 1,
            groups: null,
            surveys: compo.props.surveyID,
        }} />);

        this.setState({ graphs: spiderGraphs });
    }

    loadGroupsGraphs = function () {
        let compo = this;
        console.log("Groups: " + groups)
        let spiderGraphs = [];
        groups.forEach(function (g) {
            console.log("Group " + g._id + " added");
            spiderGraphs.push(<div key={g._id}><SpiderGraph name={g.name} parameters={{
                teachers: 1,
                students: null,
                classes: 1,
                groups: g._id,
                surveys: compo.props.surveyID,
            }} color={g.name} /></div>);
        });

        console.log(spiderGraphs);
        this.setState({ graphs: spiderGraphs });
    }

    loadStudentsGraphs = function () {
        let compo = this;
        let spiderGraphs = [];
        //to change and go to students
        groups.forEach(function (g) {
            g.students.forEach(function (s) {
                let parameters = {
                    teachers: 1,
                    students: s._id,
                    classes: 1,
                    groups: null,
                    surveys: compo.props.surveyID,
                };
                spiderGraphs.push(<div key={s._id}><SpiderGraph name={s.username} parameters={parameters} color={s.username} /></div>);
                console.log(parameters);
            });
        });

        this.setState({ graphs: spiderGraphs });
    }



    render() {

        return (
            <div>
                <div>
                    <button style = {buttonStyle} className="btn btn-primary" onClick={this.loadClassGraphs.bind(this)}>Class</button>
                    <button style = {buttonStyle} className="btn btn-primary" onClick={this.loadGroupsGraphs.bind(this)}>Groups</button>
                    <button style = {buttonStyle} className="btn btn-primary" onClick={this.loadStudentsGraphs.bind(this)}>Students</button>
                </div>
                <div>
                    {this.state.graphs}
                </div>
            </div>
        );
    }


} export default GraphRenderer;