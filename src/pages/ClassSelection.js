import React, { Component } from 'react';

import SelectClass from '../components/teacherCompo/SelectClass.js';

var classesJSON = '[{"_id": 1, "className": "Math 1"}, {"_id": 2, "className": "Math 2"}, \n\
{"_id": 3, "className": "Math 5"}, {"_id": 4, "className": "Math 8"}, {"_id": 12, "className": "Math 1"},\n\
 {"_id": 6, "className": "Math 21"}, {"_id": 7, "className": "Homeroom"}]';


class ClassSelection extends Component {
    
    render() {
        var parsed_classes = JSON.parse(classesJSON);
        var class_list = [];
        var temp = 0;
        parsed_classes.forEach(function(e){
           class_list[temp] = e.className;
           temp = temp+1;
        });
        
        var buttons = class_list.map(function(object, i){
                             return <SelectClass nameOfClass={object} key={i} />;
                        });
        
        return (
            <div className="SelectClass">
                <h1>Select a Class</h1> 

                    <div>
                        {buttons}
                    </div>
                    <div style = {{margin: "1vmin"}}>
                        <button className = "btn btn-default">Continue</button>
                    </div>
            </div>
        );
    }
}

export default ClassSelection;