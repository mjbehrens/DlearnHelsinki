import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';

//redux setup
import { ROUTES, BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


let GET_ANSWERS = '';


function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}

// VERY IMPORTANT !
let parameters;
let component;


class SpiderGraph2 extends Component {

    constructor(props) {
        super(props);

        const { translate } = this.props;

        parameters = this.props.parameters;
        component = this;

        this.state = {
            isLoading: true,
            noData: true,
            cpt: 0,
            data: {
                labels: [], //label of the themes
                datasets: []
            }
        };

    }

    componentDidMount() {
        this.getDataForGraph();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if ((parameters != nextProps.parameters) && (nextProps.parameters.surveys != null)) {

            // 1. add new parameters and download then
            nextProps.parameters.forEach(next_param => {
                if (!(next_param in parameters)){
                    parameters.push(next_param)
                    let request = component.buildRequestRest(next_param);
                    component.getSurveyAnswersREST(request, next_param.name);
                }
            });

            //2. remove unwanted data from dataset's state
            // (the one that are not anymore in paramters)
            parameters.forEach(parm => {
                if (!(parm in nextProps.parameters)){
                    let index = parameters.indexOf(parm);
                    parameters.splice(index, 1)
                    let request = component.buildRequestRest(parm);
                    let datasets = component.state.data.datasets;
                    datasets.forEach(data => {
                        if(data.id == request){
                            datasets.splice(datasets.indexOf(data), 1);
                            component.setState({
                                ...component.state,
                                data: {
                                    ...component.state.data,
                                    datasets: datasets,
                                }
                            });
                        }
                    });
                }
            });

            this.getDataForGraph();
        }
    }

    getDataForGraph = function () {

        parameters.forEach(params => {
            let request = component.buildRequestRest(params);
            component.getSurveyAnswersREST(request, params.name);
        });
    }


    // Build request from props send to the component
    // ( looks ugly but it's a propotype :) )
    buildRequestRest = function (params) {

        let s = "";

        if (params.teachers != null) {
            s += 'teachers/' + params.teachers;


            if (params.classes != null) {
                s += '/classes/' + params.classes;
            }
            if (params.groups != null) {
                s += '/groups/' + params.groups;
            }
            if (params.students != null) {
                s += '/students/' + params.students;
            }

        } else if (params.students != null) {
            s += 'students/' + params.students;

            if (params.classes != null) {
                s += '/classes/' + params.classes;
            }
            if (params.groups != null) {
                s += '/groups/' + params.groups;
            }
        }

        if (params.surveys != null) {
            s += '/surveys/' + params.surveys;
        }

        GET_ANSWERS = s + '/answers';

        return GET_ANSWERS;

    }

    getSurveyAnswersREST = function (request, name) {
        // set the spinner to true
        this.setState({ isLoading: true });

        let Answers = [];

        fetch(BACKEND_API.ROOT + request, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {
                    data.forEach(function (a) {
                        let answer = {
                            theme_id: a.theme_id,
                            answer: a.answer,
                            theme_title: a.theme_title,
                            description: a.description,
                            start_date: a.start_date,
                        }
                        Answers.push(a);

                    }, this);


                    if (Answers.length > 0) {

                        let labelsArray = [];
                        let answerArray = [];
                        Answers.forEach(function (e) {
                            labelsArray.push(e.theme_title);
                            answerArray.push((e.answer).toFixed(1));
                            // if description supported, added here
                        }, this);

                        let new_datasets = component.state.data.datasets;

                        new_datasets.push({
                            label: name,
                            id : request,
                            lineTension: .05,
                            backgroundColor: component.stringToColour(name),
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: answerArray,
                        })

                        console.log(new_datasets)
                        console.log(request)

                        component.setState({
                            ...component.state,
                            isLoading: false,
                            noData: false,
                            data: {
                                ...component.state.data,
                                labels: labelsArray,
                                datasets: new_datasets,
                            }
                        });
                    } else {
                        console.log("problem while parsing json data")
                        component.setState({
                            isLoading: false,
                            noData: true
                        });
                    }
                });
            } else {
                console.log('Network response was not ok.');
            }
        }).catch(function (err) {
            // Error :(
            console.log(err);
        });
    }

    //take a string and create a original color
    stringToColour = function (str) {

        // default value if props null
        if (str == null) {
            str = 'unkle - lonely soul';
        }

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }

        function cutHex(h) { return (h.charAt(0) === "#") ? h.substring(1, 7) : h }
        function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
        function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
        function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }

        let R = hexToR(colour);
        let G = hexToG(colour);
        let B = hexToB(colour);

        return 'rgba(' + R + ',' + G + ',' + B + ',0.4)';
    }


    render() {

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 5
                }
            }
        };

        if (this.state.isLoading) {
            return (
                <div className='spinner-container'>
                    <Spinner />
                </div>

            )
        } else if (this.state.noData === true) {
            return (
                <div className="jumbotron">
                    <h5>{this.props.name}</h5>
                    {this.props.translate('data_no_found')}
                </div>

            );
        }
        else {
            return (
                <div className="graph-container">
                    <Radar data={this.state.data} options={options} />
                </div>
            );
        }

    }
}

export default connect(mapStateToProps)(withTranslate(SpiderGraph2));
