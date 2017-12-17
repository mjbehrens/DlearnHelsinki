import React, { Component } from 'react';
import SpiderGraph from './SpiderGraph.js';
import LinearGraph from './LinearGraph.js';
import Spinner from 'react-spinner'


import { connect } from 'react-redux';


function mapStateToProps(store) {
    return {
        user: store.user.user,
        classes: store.classroom.classes,
    }
}


var compo = null;


class GraphRendererForStudents extends Component {
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
        this.loadGraphs(this.props);
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        //if (this.props !== nextProps) {
            //this.render();
            console.log(nextProps)
            this.loadGraphs(nextProps);
        //}
    }

    loadGraphs = function (parms) {

        //Load progression
        let progression = <LinearGraph parameters={{
            teachers: compo.props.user.id,
            students: parms.student._id,
            classes: compo.props.user.classid,
            groups: null,
            progression: 5,
        }} />

        // load spider graph
        let spiders = [];
        parms.surveys.forEach(function (s) {
            spiders.push(
                <div key={s._id}>
                    <SpiderGraph name={s.title + " " + s.start_date} parameters={{
                        teachers: compo.props.user.id,
                        students: parms.student._id,
                        classes: compo.props.user.classid,
                        groups: null,
                        surveys: s._id,
                    }} color={compo.props.student.username} />
                </div>);
        })

        // update state
        this.setState({
            spiderGraphs: spiders,
            progressionGraph: progression
        });
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
                    <h3>{this.props.student.username}</h3>
                    {this.state.progressionGraph}
                    {this.state.spiderGraphs}
                </div>
            );
        }


    }

}
export default connect(mapStateToProps)(GraphRendererForStudents);
