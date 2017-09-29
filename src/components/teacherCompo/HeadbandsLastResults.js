import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';


const style = {
    marginLeft : "100px",
    marginRight : "100px",
    border : "2px solid black",
    borderColor : "black"
};

const styleButton = {
    marginLeft : "15px"
}

//Get unique groups for the teacher from the database
const groupsJSON = '[{"_id": 1, "groupNumber": 1}, {"_id": 2, "groupNumber": 2}, {"_id": 3, "groupNumber": 3}, {"_id": 5, "groupNumber":4}, {"_id": 6, "groupNumber": 5}]';

class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = { groupNr: "Selected group is supposed to be displayed here, but..." };
    }

    onClickSurvey = () => {

    }
    
    buttonClicked = (buttonValue) => (e) => {
            e.preventDefault();
            this.setState({groupNr: "Something happened..."});
            console.log("You clicked on group "+ buttonValue);
    }
    
    renderButton(buttonValue) {
        return ( //BUG!!!!!!!!!!!!!!!!!!!!
            <button 
                style = {styleButton} 
                onClick = {this.buttonClicked(buttonValue)}
                type="button" 
                className="btn btn-primary">
                        Group {buttonValue}
            </button>
        );
    }

    render() {

        var parsed_groups = JSON.parse(groupsJSON);
        var group_list = [];
        var temp = 0;
        parsed_groups.forEach(function(e){
           group_list[temp] = e.groupNumber
           temp = temp+1;
        });
        

        return (
            <div style={ style }>
                <div className="text-left">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="btn-group-vertical">
                               { group_list.map(function(buttonValue, i){
                                       this.renderButton(buttonValue);   
                                    }, this) 
                                }
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <SpiderGraph name={this.state.groupNr} />

                        </div>
                    </div>

                </div>
            </div>
        );

    }


}

export default HeadbandsLastResults;