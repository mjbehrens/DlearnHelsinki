import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const ORIGIN = 'https://dlearn-helsinki-backend.herokuapp.com/webapi';
let GET_ANSWERS = '';
let GET_QUESTIONS_FOR_SURVEY = '';

// VERY IMPORTANT !
let params;


class LinearGraph extends Component {

    constructor(props) {
        super(props);

        if (this.props.parameters != null) {
            params = this.props.parameters;
        }

        this.state = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Theme 1',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: this.stringToColour('first'),
                        borderColor: this.stringToColour('first'),
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
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'Theme 2',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: this.stringToColour('seconde'),
                        borderColor: this.stringToColour('seconde'),
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
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [80, 63, 45, 81, 90, 55, 40]
                    }
                ]
            }
        };

    }

    componentDidMount() {
        //this.getDataForGraph();
    }

    // Called everytime a props value change
    componentWillReceiveProps(nextProps) {
        if (params != nextProps.parameters) {
            params = nextProps.parameters;
            console.log(params);
            this.getDataForGraph();
        }
    }


    // Fetch resquest for questions and answer
    getDataForGraph = function () {
        this.buildRequestRest();
    }

    // Build request from props send to the component
    // ( looks ugly but it's a propotype :) )
    buildRequestRest = function () {

        GET_ANSWERS = '';
        GET_QUESTIONS_FOR_SURVEY = '';


        let s = "";
        if (params.students != null) {
            s += '/students/' + params.students;
        }
        if (params.teachers != null) {
            s += '/teachers/' + params.teachers;
        }
        if (params.classes != null) {
            s += '/classes/' + params.classes;
        }
        if (params.groups != null) {
            s += '/groups/' + params.groups;
        }
        if (params.surveys != null) {
            s += '/surveys/' + params.surveys;
        }

        GET_ANSWERS = s + '/answers';
        GET_QUESTIONS_FOR_SURVEY = s + '/questions';

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
        return (
            <Line data={this.state.data} />
        );
    }
}

export default LinearGraph;
