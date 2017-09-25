import React, { Component } from 'react';

import SelectClass from '../components/teacherCompo/SelectClass.js';

//Change this part to pull information from the database once it's implemented.
var tempList = ["Math 1", "Math 2", "Math 5", "Math 8", "Math 12", "Math 21"];

var buttons = tempList.map(function(object, i){
                             return <SelectClass nameOfClass={object} key={i} />;
                        });

class ClassSelection extends Component {
    
    render() {
        
        return (
            <div className="SelectClass">
                <h1>Select a Class</h1> 

                    <div>
                        {buttons}
                    </div>
                    <div>
                        <button type = "button" className = "btn btn-default">Add New</button>
                    </div>
            </div>
        );
    }
}

export default ClassSelection;