import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Spinner from 'react-spinner'
import { withTranslate } from 'react-redux-multilingual';

//redux setup
import { ROUTES, BACKEND_API } from '../../constants.js';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';


let GET_ANSWERS = '';
let GET_QUESTIONS_FOR_SURVEY = '';

// VERY IMPORTANT !
let params;

function mapStateToProps(store) {
    return {
        user: store.user.user,
    }
}
let compo = null;

class LinearGraph extends Component {

    constructor(props) {
        super(props);
        const {translate} = this.props;
        params = this.props.parameters;
        compo = this;

        this.state = {
            data: {
                labels: [], // for surveys names
                datasets: [] // actual data
            }
        };

        if (params.progression !== null) {
            this.getDataForGraph();
        }

    }

    componentDidMount() {
        //this.getDataForGraph();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if ((params != nextProps.parameters) && (nextProps.parameters.progression !== null)) {
            params = nextProps.parameters;
            //console.log(params);
            this.getDataForGraph();
        }
    }

    // Fetch resquest for questions and answer
    getDataForGraph = function () {
        this.buildRequestRest();
        this.getSurveyAnswersREST();
    }

    // Build request from props send to the component
    // ( looks ugly but it's a propotype :) )
    // Can now be simplify with redux and the store
    buildRequestRest = function () {

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

        if (params.progression != null) {
            s += '/progression/' + params.progression;
        }

        GET_ANSWERS = s;

    }


    getSurveyAnswersREST = function () {
        // set the spinner to true
        this.setState({ isLoading: true });

        console.log(BACKEND_API.ROOT + GET_ANSWERS);

        fetch(BACKEND_API.ROOT + GET_ANSWERS, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + this.props.user.hash,
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(data => {

                    // TODO : if data is not empty
                    if (true) {
                        compo.collectData(data);

                    } else {
                        console.log("problem while parsing json data")
                        compo.setState({
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


    collectData = function (progression) {

        let max_theme_id = 0;
        let surveys = [];

        // extract the survey
        progression.forEach(function (survey) {

            let lisThemes = [];

            survey.themes.forEach(function (theme) {

                lisThemes.push({
                    theme_id: theme.theme_id,
                    theme_title: theme.theme_title,
                    description: theme.description,
                    answer: (theme.answer).toFixed(1),
                });

                if (max_theme_id < theme.theme_id) {
                    max_theme_id = theme.theme_id;
                }

            });

            surveys.push({
                survey_id: survey.survey._id,
                survey_title : survey.survey.title,
                start_date: survey.survey.start_date,
                survey_description : survey.survey.description,
                themes: lisThemes,
            });

        });

        // will containt the data
        let newDatasets = new Array(max_theme_id);
        // will containt the name of the survey
        let newLabels = [];

        for (let i = 1; i <= max_theme_id; i++) {

            // table of answer for this theme
            let values = [];
            let title = "";
            // we create a new dataset for the theme
            newDatasets[i - 1] = {
                label: 'Theme ' + i,
                fill: false,
                lineTension: 0.1,
                backgroundColor: this.stringToColour(i),
                borderColor: this.stringToColour(i),
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: []
            };

            // we are looking for, in each survey, the theme that match i (the current survey id)
            // if it's find, we add its answer's value. otherwise we put null in order to not breaking the graph
            surveys.forEach(function (survey) {

                let theme_i = survey.themes.filter(function (t) {
                    return t.theme_id === i;
                });

                if (theme_i.length === 1) {
                    title = theme_i[0].theme_title;
                    values.push(theme_i[0].answer);
                } else if (theme_i.length < 0) {
                    values.push(null);
                }

                // newDatasets[i - 1].backgroundColor = this.stringToColour(theme_i[0].theme_title);
                // newDatasets[i - 1].borderColor = this.stringToColour(theme_i[0].theme_title);
            });
            newDatasets[i - 1].data = values;
            newDatasets[i - 1].backgroundColor = this.stringToColour(title);
            newDatasets[i - 1].borderColor = this.stringToColour(title);
            newDatasets[i - 1].label = title;
        }

        surveys.forEach(function (survey) {
            newLabels.push(survey.start_date + " - " + survey.survey_title);
        })

        console.log(newDatasets);

        compo.setState({
            ...compo.state,
            isLoading: false,
            noData: false,
            data: {
                labels: newLabels,
                datasets: newDatasets,
            }

        })
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

        // TODO : Scale for this graph
        // THIS DOES NOT WORK
        var options = {
            title: {
                display: true,
                position: 'top',
                text: 'progression',
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: {
                    ticks: {
                        beginAtZero: true,
                        max: 6,

                    }
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
                    {this.props.translate('data_no_found')};
				</div>
            );
        }
        else {
            return (
                <div className="graph-container">
                    <Line data={this.state.data} options={options} />

                </div>
            );
        }
    }
}

export default connect(mapStateToProps)(withTranslate(LinearGraph));
