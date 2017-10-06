import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';


const style = {
    marginLeft: "100px",
    marginRight: "100px",
    border: "2px solid black",
    borderColor: "black"
};

const styleButton = {
    marginLeft: "15px",
    marginTop: "15px"
}

//Get unique groups for the teacher from the database
const groupsJSON = '[{"group_id": 1, "group_name": "First Group"}, {"group_id": 2, "group_name": "Second Group"}, {"group_id": 3, "group_name": "Third Group"}, {"group_id": 4, "group_name":"Fourth Group"}]';
var buttonList = [];

class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);

        buttonList = [];

        this.state = {
            group_id: 1,
            group_name: "No Group Selected",
        };

        this.tempParsingJson();
    }

    tempParsingJson = function () {
        var compo = this;
        let obj = JSON.parse(groupsJSON);

        obj.forEach(function (element) {
            let g = {
                group_id: element.group_id,
                group_name: element.group_name,
            }

            buttonList.push(
                <button
                    onClick={compo.onClickButton()}
                    type="button"
                    className="btn btn-primary"
                    value={g.group_id}>
                    {g.group_name}
                </button>)

        });

        //this.setState({ ...this.state, });

    }


    onClickButton = () => (e) => {
        e.preventDefault();
        this.setState({
            group_id: e.target.value,
            group_name: e.target.innerText
        });
    }


    render() {

        //requires for spiderGraph
        let parameters = {
            teachers: 1,
            students: null,
            classes: 1,
            groups: this.state.group_id,
            surveys: 27,
        }

        return (

            <div className="container">
                <div className="jumbotron">
                    <div className="text-left">
                        <div className="row">
                            <div className="col-sm-3" style={styleButton}>
                                <div className="btn-group-vertical">
                                    {buttonList}
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <SpiderGraph name={this.state.group_name} parameters={parameters} color={this.state.group_name} />


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    }


}

export default HeadbandsLastResults;
