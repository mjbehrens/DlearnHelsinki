import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js';
import LinearGraph from './LinearGraph.js';
import Spinner from 'react-spinner'


import { BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}


const buttonStyle = {
    margin: '5px'
}


var compo = null;

class GraphRendererForGroups extends Component {

    constructor(props) {
        super(props);
        compo = this;

        this.state = {
            isLoading: false,
            spiderGraphs: [],
            progressionGraph: [],
        }
    }


    componentDidMount() {
        this.loadGraphs(5);
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            //this.render();
            this.loadGraphs(5);
        }
    }

    loadGraphs = function (select_value) {

        //Load progression
        let progression = <LinearGraph parameters={{
            teachers: compo.props.user.id,
            students: null,
            classes: compo.props.user.classid,
            groups: compo.props.group._id,
            progression: select_value,
        }} />

        // load spider graph
        let spiders = [];
        for (let i = 0; i < select_value; i++) {

            let s = this.props.surveys[i];
            if (s != null) {
                spiders.push(
                    <div key={s._id}>
                        <SpiderGraph name={s.title + " " + s.start_date} parameters={{
                            teachers: compo.props.user.id,
                            students: null,
                            classes: compo.props.user.classid,
                            groups: compo.props.group._id,
                            surveys: s._id,
                        }} color={compo.props.group.name} />
                    </div>);
            }
        }

        console.log(select_value);


        // update state
        this.setState({
            spiderGraphs: spiders,
            progressionGraph: progression
        });
    }

    renderSelect = function () {

        let numSurvey = this.props.surveys.length;
        let numSelectEntry = Math.round(numSurvey / 5);

        let options = [];

        for (let x = 1; x < numSelectEntry; x++) {
            options.push(<option value={x * 5}>{x * 5}</option>)
        }
        options.push(<option value={this.props.surveys.length}>{this.props.surveys.length}</option>)

        return (
            <select defaultValue={5} onChange={this.onChangeSelect}>
                {options}
            </select>
        )
    }

    onChangeSelect = function (e) {
        compo.loadGraphs(e.target.value);
    }



    render() {

        if (this.state.isLoading) {
            return (
                <div className="spinner-container">
                    <Spinner />
                </div >
            );
        } else {
            return (
                <div>
                    <h3>{this.props.group.name}</h3>
                    <br />
                    Number of surveys shown: <nbsp /><nbsp />
                    {this.renderSelect()}
                    <hr wight='1px' />
                    {this.state.progressionGraph}
                    {this.state.spiderGraphs}
                </div>
            );
        }


    }

}
export default connect(mapStateToProps)(GraphRendererForGroups);
