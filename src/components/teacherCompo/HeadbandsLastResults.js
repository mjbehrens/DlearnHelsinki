import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';


const style = {
    marginLeft : "100px",
    marginRight : "100px",
    border : "2px solid black",
    borderColor : "black"
};

const styleButton = {
    marginLeft : "15px",
    marginTop : "15px"
}

//Get unique groups for the teacher from the database
const groupsJSON = '[{"_id": 1, "groupNumber": 122}, {"_id": 2, "groupNumber": 135}, {"_id": 3, "groupNumber": 9999}, {"_id": 5, "groupNumber":19000}, {"_id": 6, "groupNumber": 32}]';

class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             groupNr: "Average between all groups",
             };
    }

    onClickSurvey = () => {

    }
    
    
    buttonClicked = (buttonValue) => (e) => {
            e.preventDefault();
            this.setState({groupNr: "Group " + buttonValue}); 
    }
    
    renderButton(buttonValue) {
        return (
           <button  
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
	    <div className="container">
<div className="jumbotron">
                <div className="text-left">
                    <div className="row">
                        <div className="col-sm-2" style = {styleButton}>
                            <div className="btn-group-vertical">
                               { group_list.map(function(buttonValue, i){
                                       return this.renderButton(buttonValue)
                                    }, this) 
                                }
                            </div>
                        </div>
                        <div className="col-sm-9">
		<div className="graph-container">
                            <SpiderGraph name={this.state.groupNr} students={1} classes={1} groups={null} surveys={27} color={this.state.groupNr} />
		</div>

                        </div>
                    </div>

                </div>
</div>
		</div>
        );

    }


}

export default HeadbandsLastResults;
