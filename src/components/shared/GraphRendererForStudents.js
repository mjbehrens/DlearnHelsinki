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
        this.loadGraphs();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            //this.render();
            this.loadGraphs();
        }
    }

    loadGraphs = function () {

        //Load progression
        let progression = <LinearGraph parameters={{
            teachers: compo.props.user.id,
            students: compo.props.student._id,
            classes: compo.props.user.classid,
            groups: null,
            progression: 5,
        }} />

        // load spider graph
        let spiders = [];
        this.props.surveys.forEach(function (s) {
            spiders.push(
                <div key={s._id}>
                    <SpiderGraph name={s.title + " " + s.start_date} parameters={{
                        teachers: compo.props.user.id,
                        students: compo.props.student._id,
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
