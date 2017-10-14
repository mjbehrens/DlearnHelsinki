import React from "react";
import SpiderGraph from '../shared/SpiderGraph.js';
import Spinner from 'react-spinner'


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

const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';
var GET_GROUPS = '';

//Get unique groups for the teacher from the database
var groups = [];
var compo;

class HeadbandsLastResults extends React.Component {

    constructor(props) {
        super(props);

        compo = this;

        groups = [];

        this.state = {
            isLoading: true,
            buttonList: [],
            group_id: null,
            group_name: "Class",
        };

        this.buildRequestREST();
        this.getGroupsREST();
    }

    tempParsingJson = function () {
        var buttonList = [];
        groups.forEach(function (element) {
            buttonList.push(
                <button
                    onClick={compo.onClickButton()}
                    type="button"
                    className="btn btn-primary"
                    value={element._id}>
                    {element.name}
                </button>)
        });

        this.setState({
            ...this.state,
            isLoading: false,
            buttonList: buttonList
        });

    }

    buildRequestREST = function () {
        var s = '';
        // Build request here
        // teachers/{teacher_id}/classes/{class_id}/groups/

        s = s + '/teachers/1/classes/1/groups'; // Warning! Hard coded for testing purposes. 

        GET_GROUPS = s;
    }

    getGroupsREST = function () {

        compo.setState({ isLoading: true });

        fetch(ORIGIN + GET_GROUPS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa('teacher:password') // This needs to be changed in the final version...
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    groups = data;
                    compo.tempParsingJson();
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error
            console.log(err);
        });
    }

    onClickButton = () => (e) => {
        e.preventDefault();
        compo.setState({
            group_id: e.target.value,
            group_name: e.target.innerText
        });
    }

    render() {

        //requires for spiderGraph
        let parameters = {
            teachers: 1, // need to be change
            students: null,
            classes: 1, // need to be change
            groups: compo.state.group_id,
            surveys: 27, // need to be change
        }

        if (this.state.isLoading) {
            return (
                <div className="spinner-container">
                    <Spinner />
                </div >
            )

        } else {
            return (

                <div className="container">
                    <div className="jumbotron">
                        <div className="text-left">
                            <div className="row">
                                <div className="col-sm-3" style={styleButton}>
                                    <div key={1} className="btn-group-vertical">
                                        {compo.state.buttonList}
                                        <button type="button" className="btn btn-primary"> Class </button>
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


}

export default HeadbandsLastResults;
