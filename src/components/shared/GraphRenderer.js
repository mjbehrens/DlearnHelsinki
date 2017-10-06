import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js'


// We will need:
// - Array of every studentID in class
// - Groups of the classroom

var parameters;
class GraphRenderer extends Component {    

    constructor(props) {
        
        super(props);
        
        parameters = {
            teachers : 1,
            students : null,
            classes:1, 
            groups: 1, 
            surveys:this.props.surveyID,
        }
        
    }
    

    render() {
        console.log(parameters.teachers);
        
        
        return(
            <SpiderGraph name="Group Name" parameters = {parameters} />
           );
    }
} export default GraphRenderer;