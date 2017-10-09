import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js'


// We will need:
// - Array of every studentID in class
// - Groups of the classroom


var fakeJson = '[ \n\
  { \n\
    "_id" : 1, \n\
    "name" : "Grp1",\n\
    "students" : [\n\
      {\n\
        "_id" : 1,\n\
        "username" : "nico",\n\
        "age" : 10,\n\
        "gender" : "male"\n\
      },\n\
      {\n\
        "_id" : 2,\n\
        "username" : "maria",\n\
        "age" : 10,\n\
        "gender" : "female"\n\
      }\n\
    ]\n\
  },\n\
  {\n\
    "_id" : 2,\n\
    "name" : "Grp2",\n\
    "students" : [\n\
      {\n\
        "_id" : 3,\n\
        "username" : "pascal",\n\
        "age" : 10,\n\
        "gender" : "male"\n\
      },\n\
      {\n\
        "_id" : 4,\n\
        "username" : "colinne",\n\
        "age" : 10,\n\
        "gender" : "female"\n\
      }\n\
    ]\n\
  }\n\
]';

var groups = [];

class GraphRenderer extends Component {    

    constructor(props) {
        
        super(props);
        
        groups = [];
             
        this.state = {
            graphs : []
        }
        
        
    }
    
        
	componentDidMount() {
		this.tempParsingJson();
                   
	}
    
    tempParsingJson = function () {
        var compo = this;
        groups = JSON.parse(fakeJson);
        console.log("Groups after init: "+groups)
/*
        groups.forEach(function (g) {
           
           console.log(g);
           let students = g.students;
           students.forEach(function (s) {
               console.log(s);
           
           });

        });
*/

    }
    
    /*
     * While it would be possible to load all graphs through a single function, the
     * resulting function would be both too long, and a mess of conditional statements.
     */
    
    loadGroupsGraphs = function() { 
        let compo = this;
        console.log("Groups: "+groups)
        let spiderGraphs = [];
        groups.forEach(function(g) {
           let parameters = {
                teachers : 1,
                students : null,
                classes:1, 
                groups: g._id, 
                surveys:compo.props.surveyID,
            } ;
            console.log("Group "+ g._id + " added");
            spiderGraphs.push(<div key = {g._id}><SpiderGraph name={g.name} parameters = { parameters } color={g.name} /></div>);
        });
        
        console.log(spiderGraphs);
        this.setState({graphs : spiderGraphs});
    }
    
    loadClassGraphs = function() { 
        let compo = this;

        let spiderGraphs = [];
        let parameters = {
                teachers : 1,
                students : null,
                classes: 1, 
                groups: null, 
                surveys:compo.props.surveyID,
            }
            spiderGraphs.push(<SpiderGraph name="Class name" parameters = { parameters } />);
        
        this.setState({graphs : spiderGraphs});
    }
    

    loadStudentsGraphs = function() { 
        let compo = this;
        let spiderGraphs = [];
        //to change and go to students
        groups.forEach(function(g) {
           g.students.forEach(function (s) {
                let parameters = {
                teachers : null,
                students : s._id,
                classes:1, 
                groups: null, 
                surveys:compo.props.surveyID,
            } ;
            spiderGraphs.push(<div key = {s._id}><SpiderGraph name={s.username} parameters = { parameters } color={s.username}/></div>);
           });
           
        });
        
        this.setState({graphs : spiderGraphs});
    }
    
            

    render() {
        
        return(
            <div>
                <div>
                    <button onClick={this.loadClassGraphs.bind(this)}>Class</button>
                    <button onClick={this.loadGroupsGraphs.bind(this)}>Groups</button>
                    <button onClick={this.loadStudentsGraphs.bind(this)}>Students</button>
                </div>
                <div>
                    {this.state.graphs}
                </div>
            </div>
           );
    }
    
    
} export default GraphRenderer;