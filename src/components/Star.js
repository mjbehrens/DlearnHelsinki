import React, { Component } from 'react';
import _ from 'underscore';

import star from '../res/icons/star.svg';

class Star extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            size: (this.props.actual_size/this.props.max_size)*70
        }; 
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                size: (nextProps.actual_size/nextProps.max_size)*70
            });
        }
    }

    render() {
        return (
            <img src={star} alt="star" height={_.min([this.state.size, 70])+'px'} />
        )
    }
} export default Star;
