import React, { Component } from 'react';

import SelectClass from '../components/teacherCompo/SelectClass.js';

var classesJSON = '[{"_id": 1, "className": "Math 1"}, {"_id": 2, "className": "Math 2"}, \n\
{"_id": 3, "className": "Math 5"}, {"_id": 4, "className": "Math 8"}, {"_id": 12, "className": "Math 9"},\n\
 {"_id": 6, "className": "Math 21"}, {"_id": 7, "className": "Homeroom"}]';


class ClassSelection extends Component {

    constructor() {
        super();
//        this.state = {
//            selectedClass: null
//        }
    }

//    moveToDashboard = () => {
//        if (this.state.selectedClass != null) {
//            this.props.history.push({
//                pathname: '/teacher-dashboard',
//                state: {className: this.state.selectedClass}  
//            })
//        }
//    }

    selectClass = (buttonValue) => (e) => {
        e.preventDefault();
//        this.setState({selectedClass: buttonValue}); console.log("Changing state...")
        this.props.history.push({
                pathname: '/teacher-dashboard',
                state: {className: buttonValue}
            })
    }

    renderButton(buttonValue) {
        return(
                <button style = {{margin: "1vmin"}}
                        onClick = {this.selectClass(buttonValue)}
                        className="btn btn-primary">
                            {buttonValue}
                </button>
        );
    }
    
    render() {
        var parsed_classes = JSON.parse(classesJSON);
        var class_list = [];
        var temp = 0;
        parsed_classes.forEach(function(e){
           class_list[temp] = e.className;
           temp = temp+1;
        });
        
        var buttons = class_list.map(function(className, i){
//                             return <SelectClass nameOfClass={object} key={i} />; //OBSOLETE
                            return this.renderButton(className);
                        }, this);
        
        return (
            <div className="SelectClass">
                <h1>Select a Class</h1> 

                    <div>
                        {buttons}
                    </div>

            </div>
        );
    }
}
// MOVE THIS BACK TO RENDER SHOULD YOU FIND IT MORE APPEALING
//                    <div style = {{margin: "1vmin"}}>   
//                        <button onClick = {this.moveToDashboard} className = "btn btn-default">Continue</button>
//                    </div>
export default ClassSelection;